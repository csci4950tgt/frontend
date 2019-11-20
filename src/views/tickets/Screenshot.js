import React, { Component } from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';

export default class Screenshot extends Component {
  render() {
    return (
      <div>
        <Segment inverted>
          <Header as="h3" inverted color="blue">
            {' '}
            Screenshot for ticket #{this.props.ticketID}{' '}
          </Header>
          {this.props.processed && (
            <Image
              alt="fullpage screenshot"
              src={`http://localhost:8080/api/tickets/${this.props.ticketID}/artifacts/screenshotFull.png`}
              fluid
            />
          )}
          {!this.props.processed && (
            <Header as="h3" inverted color="blue">
              {' '}
              This ticket has not been processed. Please wait.{' '}
            </Header>
          )}
        </Segment>
      </div>
    );
  }
}
