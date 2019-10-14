import React, {Component} from 'react';
import './App.css';

import UserInput from './components/UserInput';


class App extends Component {
  state = {
    userInput: []
  }

  userInput = (url, height, width) =>{
    const newUserInput = {
      url: url,
      height: height,
      width: width
    }

    this.setState({userInput: [...this.state.userInput, newUserInput]});
  }

  render(){
    return (
      <div className="App">
        <h1> Vigilante Web Heist</h1>
        <UserInput userInput={this.userInput} />
        <h3 style={pStyle}> User Input </h3>
        <p style={pStyle}> The current user input list is: </p>
        <p> {this.state.userInput.map(input => <li> url: {input.url} h: {input.height} w: {input.width}  </li> )} </p>
      </div>
    );
  }
}

const pStyle ={
  textAlign: 'left',
  marginLeft: '10%'
}

export default App;
