import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import Screenshot from './Screenshot';

const ticket = {
  display: 'inline-block',
};

export default class Ticket extends Component {
  render() {
    return (
      <div style={ticket}>
        <Header as="h3"> Ticket</Header>
        <p> {this.props.response} </p>
        <Screenshot response={this.props.response} />
      </div>
    );
  }
}
