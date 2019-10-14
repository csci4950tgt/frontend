import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import UserInput from './components/UserInput';
import rest from './apis/rest';


class App extends Component {
  state = {
    userInput: [],
    somethingout:[]
  }

  userInput = (url, height, width, key) =>{
    const newUserInput = {
      key: key,
      url: url,
      height: height,
      width: width
    }
    axios.post(rest.get('/api/honeyclient/create'), {
        "url": url, 
        "screenshot": {
              "width": width,
              "height": height,
              "filename": "screenshot.png"
        }
      }).then(res => console.log("get it")); // set state to something 
  }
  
  onSearchSubmit = async () => {
    const response = await rest.get('/api/honeyclient/create', {
    });
    console.log("get data working");
   // this.setState({ //something state  });
  }; 


  //  this.setState({userInput: [...this.state.userInput, newUserInput]});

  render(){
    return (
      <div className="App">
        <h1> Vigilante Web Heist</h1>
        <UserInput userInput={this.userInput} onSubmit={this.onSearchSubmit}/>
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
