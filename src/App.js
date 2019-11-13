import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import Routes from './routes/Routes';

// Components

import Layout from './components/Layout';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    );
  }
}

export default App;
