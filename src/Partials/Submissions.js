import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import helpers from '../helpers'
export default class Submissions extends Component {
  getTime(created) {
    const friendly_date = helpers.friendlyDate(new Date(created))
    var friendly_date_display = friendly_date.day + 
    ', ' + friendly_date.month + 
    ' ' + friendly_date.date + 
    ', ' + friendly_date.year + 
    ' at ' + friendly_date.time_friendly;
    return friendly_date_display
  }
  render() {
    const data = this.props.data
    return (
      <Table celled striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ width: '30%' }}>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '20%' }}>Email</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '20%' }}>Submitted On</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            data.form_submissions &&
            data.form_submissions.map(object => {
              return (
                <Table.Row key={ object.slug }>
                  <Table.Cell style={{ cursor: 'pointer' }} onClick={ this.props.showSubmissionModal.bind(this, object) }>{ object.metadata.first_name } { object.metadata.last_name }</Table.Cell>
                  <Table.Cell style={{ cursor: 'pointer' }} onClick={ this.props.showSubmissionModal.bind(this, object) }>{ object.metadata.email }</Table.Cell>
                  <Table.Cell style={{ cursor: 'pointer' }} onClick={ this.props.showSubmissionModal.bind(this, object) }>{ this.getTime(object.created) }</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    )
  }
}