import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import Routes from './routes/Routes';

// Components

import Layout from './components/Layout';

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
