import React, { Component } from 'react'
import { Icon, Input, Button } from 'semantic-ui-react'
import { Form } from 'compounds'
import S from 'shorti'
import config from '../config'
import CopyToClipboard from 'react-copy-to-clipboard'
export default class FormExample extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleFocus(event) {
    event.target.select();
  }
  render() {
    const data = this.props.data
    const cosmicform = data.cosmic.object['contact-form']
    const iframe = `<iframe width="100%" height="700" frameborder="0" src="https://${window.location.hostname}/?bucket_slug=${config.bucket.slug}&form=true"></iframe>`
    return (
      <div>
        <div style={ S('maxw-400 w-100p pull-left mr-30') }>
          <h3>
            How it will look
            <div style={ S('pull-right font-12') }>
              <a target="_parent" href={`https://cosmicjs.com/${config.bucket.slug}/edit-object/${cosmicform._id}`}><Icon name="pencil"/>Edit Form Fields</a>
            </div>
          </h3>
          <Form
            form_elements={ data.form_elements }
            submit_button_text={ cosmicform.metadata.submit_button_text }
            handleSubmit={ this.props.handleSubmit.bind(this) }
            handleChange={ this.props.handleChange.bind(this) }
            loading={ data.is_submitting }
          />
        </div>
        <div style={ S('maxw-400 w-100p pull-left') }>
          <h3>Implementation</h3>
          <p>Copy the code below and add to any website to begin capturing contact form submissions to your Cosmic JS Bucket.</p>
          <p>*You may need to adjust width or height of the iframe code depending on where you add this code.</p>
          <Input onFocus={this.handleFocus} style={ S('w-100p mb-10') } value={ iframe } />
          <CopyToClipboard text={ iframe }
            onCopy={() => this.setState({copied: true})}>
            <Button><Icon color={ this.state.copied ? 'green' : 'grey' } name={ this.state.copied ? 'checkmark' : 'clipboard' }/>&nbsp;&nbsp;{ this.state.copied ? 'Copied' : 'Copy' }</Button>
          </CopyToClipboard>
        </div>
      </div>
    )
  }
}