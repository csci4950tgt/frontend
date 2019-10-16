import React, {Component} from 'react';
import './App.css';
import UserInput from './components/UserInput';


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
