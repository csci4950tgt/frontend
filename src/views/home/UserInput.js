import React, { Component } from 'react';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
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
    ticket: {
      url: '',
      screenshot: [
        {
          height: '',
          width: '',
          filename: '',
          userAgent: '',
        },
      ],
    },
    newTicket: null,
    showOptions: false,
  };

  showOptions = e => {
    //e.preventDefault();
    if (this.state.showOptions) {
      this.setState({ showOptions: false });
    } else {
      this.setState({ showOptions: true });
    }
  };
  //for multiple on forms on a field
  onChange = e => {
    if (e.target.name === 'width' || e.target.name === 'height') {
      var screenshotProp = this.state.ticket.screenshot[0];
      if (e.target.name === 'width') {
        screenshotProp.width = e.target.value;
      } else {
        screenshotProp.height = e.target.value;
      }
      this.setState({ screenshotProp });
    } else {
      var ticket = { ...this.state.ticket };
      ticket.url = e.target.value;
      this.setState({ ticket });
      //this.setState({ this.state.ticket.url: e.target.value });
    }
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const body = JSON.stringify(this.state.ticket);
    //debugger;
    const res = await createTicket(body);
    if (!res) {
      console.error('Error creating ticket!!');
      // TODO: let user know about error
    } else {
      console.log(res);
      this.setState({ newTicket: res.ticket });
      //debugger;
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
              <Form.Group inline>
                <label style={{ padding: '10px' }}>Url:</label>
                <Form.Input
                  style={inputStyle}
                  type="url"
                  name="url"
                  required
                  placeholder="http://mysite.com"
                  value={this.state.ticket.url}
                  onChange={this.onChange}
                />
                <Button content="Submit" />
                <Button
                  type="button"
                  onClick={this.showOptions}
                  color="teal"
                  icon
                >
                  <Icon name="cog" />
                  Options
                </Button>
              </Form.Group>

              {this.state.showOptions && (
                <Form.Group inline>
                  <label>Width:</label>
                  <Form.Input
                    style={inputStyle}
                    type="text"
                    name="width"
                    placeholder="Enter an image width"
                    value={this.state.ticket.screenshot[0].width}
                    onChange={this.onChange}
                  />
                </Form.Group>
              )}
              {this.state.showOptions && (
                <Form.Group inline>
                  <label>Height:</label>
                  <Form.Input
                    style={inputStyle}
                    type="text"
                    name="height"
                    placeholder=" Enter an image height"
                    value={this.state.ticket.screenshot[0].height}
                    onChange={this.onChange}
                  />
                </Form.Group>
              )}
            </Form>
          </>
        )}
      </div>
    );
  }
}
