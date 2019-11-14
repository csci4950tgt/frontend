import React, { Component } from 'react';
import { Input, Button, Form, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { createTicket } from '../../utils/api';

const inputStyle = {
  display: 'block',
  flex: '10',
  padding: '5px',
  margin: '10px',
};

export default class UserInput extends Component {
  state = {
    name: 'Example ticket',
    url: '',
    screenshot: {
      height: '',
      width: '',
      filename: 'screenshot.png',
    },
    newTicket: null,
  };
  //for multiple on forms on a field
  onChange = e => {
    if (e.target.name === 'width' || e.target.name === 'height') {
      var screenshotProp = this.state.screenshot;
      if (e.target.name === 'width') {
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
    const body = JSON.stringify(this.state);
    const res = await createTicket(body);
    if (!res) {
      console.error('Error creating ticket!!');
      // TODO: let user know about error
    } else {
      console.log(res);
      this.setState({ newTicket: res.ticket });
    }
  };
  render() {
    const { newTicket } = this.state;
    return (
      <div>
        {newTicket ? (
          <Redirect to={`/tickets/${newTicket.ID}`} />
        ) : (
          <>
            <Header as="h3"> Enter Parameters:</Header>
            <Form
              onSubmit={this.onFormSubmit}
              style={{ display: 'inline-block' }}
            >
              <Input
                style={inputStyle}
                type="url"
                name="url"
                required
                placeholder="http://mysite.com"
                value={this.state.url}
                onChange={this.onChange}
              />

              {/*<input
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
          /> */}
              <Button content="Submit" />
            </Form>
          </>
        )}
      </div>
    );
  }
}