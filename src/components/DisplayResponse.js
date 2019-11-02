import React, { Component } from 'react';

class DisplayResponse extends Component {
  render() {
    return (
      <div className="displayResponse">
        <h3> The current response is ... </h3>
        <p> {this.props.response} </p>
      </div>
    );
  }
}

const displayResponse = {
  display: 'inline-block',
};

export default DisplayResponse;
