import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './App.css';
import UserInput from './components/UserInput';
import DisplayResponse from './components/DisplayResponse';


class App extends Component {

  state = {
    responseData: null,
    ticket: {}
  }

  myCallback = (dataFromResponse) =>{
    this.setState({responseData : dataFromResponse})
    //a test
  }




  render(){
    return (
      <div className="App" >
        <h1> Vigilante Web Heist</h1>

        <UserInput response={this.myCallback}/>

        {this.state && this.state.responseData &&
          <DisplayResponse response={this.state.responseData}/>
        }

      </div>
    );
  }
}

export default App;
