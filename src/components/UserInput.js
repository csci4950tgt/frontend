import React, {Component} from 'react';


class UserInput extends Component {
  state = {
    url: '',
    height: '',
    width: '',
    name: 'Example ticket'
  }
  //for multiple on forms on a field
  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/honeyclient/create", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(this.state) // body data type must match "Content-Type" header'
    })
    const response = await res.json();
    //console.log(res);
    //console.log(JSON.stringify(response));
    this.props.response(JSON.stringify(response));
    }
    catch(error){
      console.log(error);
    }

    // const response = await fetch('/api/honeyclient/3', {
    //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //
    // });

  }
  render(){
    return (
      <div>
        <h3> Enter Parameters:</h3>
        <form
        onSubmit={this.onFormSubmit}
        style={{display: 'inline-block'}}>
        <input
          style={inputStyle}
          type="text"
          name="url"
          placeholder="Enter an url"
          value={this.state.url}
          onChange={this.onChange} />
        <input
          style={inputStyle}
          type="text"
          name="width"
          placeholder="Enter an image width"
          value={this.state.width}
          onChange={this.onChange} />
        <input
          style={inputStyle}
          type="text"
          name="height"
          placeholder=" Enter an image height"
          value={this.state.height}
          onChange={this.onChange} />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{flex: '1'}}/>
      </form>
      </div>
    );
  }
}

const inputStyle = {
  display: 'block',
  flex: '10',
  padding: '5px',
  margin: '10px'
}

export default UserInput;
