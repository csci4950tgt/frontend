import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Container } from 'semantic-ui-react';

// Components
import UserInput from './components/UserInput';
import DisplayResponse from './components/DisplayResponse';

class App extends Component {
  state = {
    responseData: null,
    ticket: {},
  };

  myCallback = dataFromResponse => {
    this.setState({ responseData: dataFromResponse });
  };

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: '3rem' }}>
        <h1> Vigilante Web Heist</h1>

        <UserInput response={this.myCallback} />

        {this.state && this.state.responseData && (
          <DisplayResponse response={this.state.responseData} />
        )}
      </Container>
    );
  }
}

export default App;
