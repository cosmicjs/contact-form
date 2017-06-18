import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { Form } from 'compounds'
import config from '../config'
export default class FormExample extends Component {
  render() {
    const data = this.props.data
    const cosmicform = data.cosmic.object['contact-form']
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <a target="_parent" href={`https://cosmicjs.com/${config.bucket.slug}/edit-object/contact-form`}><Icon name="pencil"/>Edit Form Fields</a>
        </div>
        <Form
          form_elements={ data.form_elements }
          submit_button_text={ cosmicform.metadata.submit_button_text }
          handleSubmit={ this.props.handleSubmit.bind(this) }
          handleChange={ this.props.handleChange.bind(this) }
          loading={ data.is_submitting }
        />
      </div>
    )
  }
}