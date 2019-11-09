import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

// Components
import UserInput from './components/UserInput';
import Ticket from './components/Ticket';
import RecentTickets from './components/RecentTickets';

class App extends Component {
  state = {
    responseData: null,
    ticket: {},
  };

  setResponseData = dataFromResponse => {
    this.setState({ responseData: dataFromResponse });
  };

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: '3rem' }}>
        <Header as="h1">Vigilante Web Heist</Header>

        <UserInput response={this.setResponseData} />

        <RecentTickets />

        {this.state && this.state.responseData && (
          <Ticket response={this.state.responseData} />
        )}
      </Container>
    );
  }
}

export default App;
