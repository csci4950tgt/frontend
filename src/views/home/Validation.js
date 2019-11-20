import React, { Component } from 'react';
import { Input, Button, Form, Header } from 'semantic-ui-react';

export default class Validation extends Component {
  constructor(props) {
    super(props);
  }

render() {
  let result;
    if(this.props.required && this.props.data === '' && !(this.props.inputValid)) {
      console.log(this.props.inputValid);
      result = (
    <div>
        <div class="ui warning message">
          <div class="content">
            <ul class="list">
              <li class="content">
              this field is required
              </li>
            </ul>
          </div>
        </div>
      <br />
    </div>
    );
  }
  return (
    <div>
      {result}
    </div>
  );
 }
}