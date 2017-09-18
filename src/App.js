import React, { Component } from 'react';
import { Icon, Menu, Message, Modal, Header, Button } from 'semantic-ui-react'
import _ from 'lodash'
import Cosmic from 'cosmicjs'
import Submissions from './Partials/Submissions'
import Form from './Partials/Form'
import { Form as CosmicForm } from 'compounds'
import Installation from './Partials/Installation'
import config from './config'
import S from 'shorti'
import helpers from './helpers'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.getObjects()
  }
  getObjects() {
    Cosmic.getObjects(config, (err, cosmic) => {
      const data = this.state.data
      if (cosmic.error) {
        data.error = true
        this.setState({
          data
        })
        return 
      }
      data.cosmic = cosmic
      data.data_loaded = true
      data.current_tab = 'Form Submissions'
      const objects = cosmic.objects
      data.form_submissions = objects.type['form-submissions']
      if (!data.form_submissions)
        data.current_tab = 'Form Builder'
      if (cosmic.object['contact-form'])
        data.form_elements = cosmic.object['contact-form'].metafield.form_elements.children
      this.setState({
        data
      })
    })
  }
  getLoading() {
    return <div style={{ width: '100%', textAlign: 'center', paddingTop: 100 }}><Icon size='huge' color='blue' name='circle notched' loading /></div>
  }
  getError() {
    return <div style={{ width: '100%', textAlign: 'center', padding: 100 }}><Message error>There was an error with this request.  Make sure the Bucket exists and your access connections are correct.</Message></div>
  }
  handleItemClick(e, { name }) {
    const data = this.state.data
    data.current_tab = name
    this.setState({
      data
    })
  }
  handleChange(el, e, { value }) {
    const data = this.state.data
    // Add values
    const index = _.findIndex(data.form_elements, { key: el.key })
    let form_elements = data.form_elements
    if (el.type !== 'check-boxes') {
      if (index !== -1)
        form_elements[index].value = value
    } else {
      // Add check boxes array
      if (!form_elements[index].value)
        form_elements[index].value = []
      const occurance = form_elements[index].value.indexOf(value)
      if (occurance !== -1)
        form_elements[index].value.splice(occurance, 1)
      else
        form_elements[index].value.push(value)
    }
    this.setState({
      data
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const data = this.state.data
    const name = _.find(data.form_elements, { key: 'name'}).value
    if (!name.trim())
      return alert('You need to add at least a first name')
    const object = {
      title: `${name}`,
      type_slug: 'form-submissions',
      metafields: data.form_elements
    }
    data.is_submitting = true
    this.setState({ data })
    object.write_key = config.bucket.write_key
    Cosmic.addObject(config, object, (err, res) => {
      delete data.is_submitting
      if (res.error) {
        data.error = true
        this.setState({
          data
        })
        return 
      }
      data.form_elements.forEach(form_element => {
        form_element.value = ''
      })
      data.show_success_modal = true
      this.setState({ data })
    })
  }
  getContent() {
    const data = this.state.data
    if (!data.form_elements)
      return <Installation data={ data }/>
    if (data.current_tab === 'Form Submissions')
      return <Submissions showSubmissionModal={ this.showSubmissionModal.bind(this) } data={ this.state.data }/>
    if (data.current_tab === 'Form Builder')
      return <Form data={ this.state.data } handleChange={ this.handleChange.bind(this) } handleSubmit={ this.handleSubmit.bind(this) }/>
  }
  handleModalClose() {
    const data = this.state.data
    delete data.show_success_modal
    delete data.show_submission_modal
    this.setState({ data })
  }
  showSubmissionModal(object) {
    const data = this.state.data
    data.current_submission = object
    data.show_submission_modal = true
    this.setState({ data })
  }
  render() {
    const data = this.state.data
    if (data.error)
      return this.getError()
    if (!data.data_loaded)
      return this.getLoading()
    // If form is true
    if (helpers.getParameterByName('form') === 'true' && !data.show_success_modal) {
      const cosmicform = data.cosmic.object['contact-form']
      return (
        <div style={ S('p-20') }>
          <CosmicForm
            form_elements={ data.form_elements }
            submit_button_text={ cosmicform.metadata.submit_button_text }
            handleSubmit={ this.handleSubmit.bind(this) }
            handleChange={ this.handleChange.bind(this) }
            loading={ data.is_submitting }
          />
          <div style={ S('mt-30 pull-right') }>
            <a href={`https://cosmicjs.com/?ref=contact-form-extension&bucket_slug=${config.bucket.slug}`} target="_parent">
              <img src="https://cosmicjs.com/images/logo.svg" width="30" height="30" style={ S('mb-10n mr-10') }/>Proudly Powered by Cosmic JS
            </a>
          </div>
        </div>
      )
    }
    return (
      <div style={{ padding: 15 }}>
        <h1>Contact Form</h1>
        {
          data.cosmic.object['contact-form'] &&<Menu tabular>
          <Menu.Item name='Form Submissions' active={data.current_tab === 'Form Submissions'} onClick={this.handleItemClick.bind(this)} />
            <Menu.Item name='Form Builder' active={data.current_tab === 'Form Builder'} onClick={this.handleItemClick.bind(this)} />
          </Menu>
        }
        { this.getContent() }
        {
          data.cosmic.object['contact-form'] &&
          <Modal open={ data.show_success_modal } dimmer='blurring' basic size='small' onClose={ this.handleModalClose.bind(this) }>
            <Header icon={ data.cosmic.object['contact-form'].metadata.success_message_icon } content={ data.cosmic.object['contact-form'].metadata.success_message_title } />
            <Modal.Content>
              <p>{ data.cosmic.object['contact-form'].metadata.success_message_body }</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted onClick={ this.handleModalClose.bind(this) }>
                <Icon name='checkmark' /> Ok
              </Button>
            </Modal.Actions>
          </Modal>
        }
        {
          data.current_submission &&
          <Modal open={ data.show_submission_modal } size='small' onClose={ this.handleModalClose.bind(this) }>
            <Header content={ data.current_submission.title } />
            <Modal.Content>
              { 
                data.current_submission.metafields.map(metafield => {
                  return <p key={ metafield.key }>{ metafield.title }: { metafield.value }</p>
                })
              }
            </Modal.Content>
            <Modal.Actions>
              <Button primary onClick={ this.handleModalClose.bind(this) }>
                <Icon name='checkmark' /> Ok
              </Button>
            </Modal.Actions>
          </Modal>
        }
      </div>
    )
  }
}

export default App;