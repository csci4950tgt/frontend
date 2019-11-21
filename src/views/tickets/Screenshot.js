import React, { Component } from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';

export default class Screenshot extends Component {
  render() {
    const { ticketID, processed } = this.props.ticketInfo;
    return (
      <div>
        <Segment inverted>
          <Header as="h3" inverted color="blue">
            {' '}
            Screenshot for ticket #{ticketID}{' '}
          </Header>
          {processed && (
            <Image
              alt="fullpage screenshot"
              src={`http://localhost:8080/api/tickets/${ticketID}/artifacts/screenshotFull.png`}
              fluid
            />
          )}
          {!processed && (
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
