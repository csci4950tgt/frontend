import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import UserInput from './components/UserInput';
import rest from './apis/rest';


class App extends Component {

  // state = {
  //   userInput={}
  // }

  render(){
    return (
      <div className="App">
        <h1> Vigilante Web Heist</h1>
        <UserInput />
      </div>
    );
  }
}

export default App;
