import React, { Component } from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';

export default class Screenshot extends Component {
  state = {
    id: '',
  };

  onResponseReceived = async e => {
    this.state.id = this.props.ticketID;
    const endpoint =
      'http://localhost:8080/api/tickets/' + this.state.id + '/artifacts';
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    this.onResponseReceived();

    return (
      <div>
        <Segment inverted>
          <Header as="h3" inverted color="blue">
            {' '}
            Screenshot for ticket #{this.state.id}{' '}
          </Header>
          <Image
            alt="fullpage screenshot"
            src={
              'http://localhost:8080/api/tickets/' +
              this.state.id +
              '/artifacts/screenshotFull.png'
            }
            fluid
          />
        </Segment>
      </div>
    );
  }
}
