import React, { Component } from 'react';

class UserInput extends Component {
  state = {
    name: 'Example ticket',
    url: '',
    screenshot: {
      height: '',
      width: '',
      filename: 'screenshot.png',
    },
  };
  //for multiple on forms on a field
  onChange = e => {
    if (e.target.name == 'width' || e.target.name == 'height') {
      var screenshotProp = this.state.screenshot;
      if (e.target.name == 'width') {
        screenshotProp.width = e.target.value;
      } else {
        screenshotProp.height = e.target.value;
      }
      this.setState({ screenshotProp });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onFormSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/honeyclient/create', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(this.state), // body data type must match "Content-Type" header'
      });
      const response = await res.json();
      console.log(res);
      console.log(JSON.stringify(response));
      this.props.response(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <h3> Enter Parameters:</h3>
        <form onSubmit={this.onFormSubmit} style={{ display: 'inline-block' }}>
          <input
            style={inputStyle}
            type="text"
            name="url"
            placeholder="Enter an url"
            value={this.state.url}
            onChange={this.onChange}
          />
          <input
            style={inputStyle}
            type="text"
            name="width"
            placeholder="Enter an image width"
            value={this.state.screenshot.width}
            onChange={this.onChange}
          />
          <input
            style={inputStyle}
            type="text"
            name="height"
            placeholder=" Enter an image height"
            value={this.state.screenshot.height}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: '1' }}
          />
        </form>
      </div>
    );
  }
}

const inputStyle = {
  display: 'block',
  flex: '10',
  padding: '5px',
  margin: '10px',
};

export default UserInput;
