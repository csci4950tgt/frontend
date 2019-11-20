import React, { Component } from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';

export default class Screenshot extends Component {
  render() {
    return (
      <Segment inverted>
        <Image
          alt="fullpage screenshot"
          src={
            'http://localhost:8080/api/tickets/' +
            this.props.ticketID +
            '/artifacts/screenshotFull.png'
          }
          fluid
        />
      </Segment>
    );
  }
}
