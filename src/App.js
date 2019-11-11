import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import Routes from './routes/Routes';

const Layout = ({ children }) => (
  <Container textAlign="center" style={{ marginTop: '3rem' }}>
    <Header as="h1">Vigilante Web Heist</Header>
    {children}
  </Container>
);

class App extends Component {
  state = {
    curTicket: {},
  };

  setCurTicket = ticket => {
    this.setState({ curTicket: ticket });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Routes appState={this.state} setCurTicket={this.setCurTicket} />
        </Layout>
      </Router>
    );
  }
}

export default App;
