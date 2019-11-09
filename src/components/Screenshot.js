import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class Screenshot extends Component {
  state = {
    id: '',
  };

  onResponseReceived = async e => {
    const response = JSON.parse(this.props.response);
    this.state.id = response.ticket.ID;
    const id = response.ticket.ID;
    debugger;
    const endpoint = '/api/tickets/' + this.state.id + '/artifacts/screenshots';
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
      });
      const response = await res.json();
      console.log(res);
      // console.log(JSON.stringify(response));
      // this.props.response(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    this.onResponseReceived();
    return (
      <div>
        <Header as="h3"> Screenshot</Header>
      </div>
    );
  }
}
