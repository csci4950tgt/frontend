import React, { Component } from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';

export default class Screenshot extends Component {
  state = {
    id: '',
    processed: '',
  };

  onResponseReceived = async e => {
    this.state.id = this.props.ticketID;
    //there is not reason why this should be called twice but
    //I can't figure out how to pass the processed flag through the routes
    try {
      const res = await fetch(
        'http://localhost:8080/api/tickets/' + this.state.id,
        {
          method: 'GET',
        }
      );

      const response = await res.json();
      var processed = response.ticket.processed;
    } catch (error) {
      console.log(error);
    }

    if (processed) {
      this.setState({ processed: true });
    } else {
      this.setState({ processed: false });
    }
  };

  render() {
    if (!this.state.processed) {
      this.onResponseReceived();
    }

    return (
      <div>
        <Segment inverted>
          <Header as="h3" inverted color="blue">
            {' '}
            Screenshot for ticket #{this.state.id}{' '}
          </Header>
          {this.state.processed && (
            <Image
              alt="fullpage screenshot"
              src={
                'http://localhost:8080/api/tickets/' +
                this.state.id +
                '/artifacts/screenshotFull.png'
              }
              fluid
            />
          )}
          {!this.state.processed && (
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
