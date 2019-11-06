import React, { Component } from 'react';

const displayResponse = {
  display: 'inline-block',
};

export default class DisplayResponse extends Component {
  render() {
    return (
      <div style={displayResponse}>
        <h3> The current response is ... </h3>
        <p> {this.props.response} </p>
      </div>
    );
  }
}
