import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  Header,
  Icon,
  Grid,
  Dropdown,
  Input,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Utils
import { createTicket } from '../../utils/api.js';
import { userAgentOptions } from '../../views/home/devices.js';

const userAgents = userAgentOptions.devices;

const urlInputStyle = {
  display: 'block',
  flex: '10',
  padding: '5px',
  margin: '10px',
};

export default class UserInput extends Component {
  state = {
    ticket: {
      url: '',
      screenshots: [
        {
          height: '',
          width: '',
          filename: 'screenshot0.png',
          userAgent: '',
        },
      ],
    },
    newTicket: null,
    showOptions: false,
    userAgentSelection: [''],
  };

  showOptions = e => {
    if (this.state.showOptions) {
      this.setState({ showOptions: false });
    } else {
      this.setState({ showOptions: true });
    }
  };

  // for multiple on forms on a field
  onChangeURL = e => {
    const ticket = { ...this.state.ticket };
    ticket.url = e.target.value;
    this.setState({ ticket });
  };

  onChangeScreenshot = (e, i, selection) => {
    const screenshotProp = this.state.ticket.screenshots[i];
    if (selection != null) {
      // get the json object index of the select user agent
      const index = userAgents.findIndex(item => item.name === selection.value);
      const device = userAgents[index];
      screenshotProp.userAgent = device.useragent || '';
      screenshotProp.width = parseInt(device.width) || '';
      screenshotProp.height = parseInt(device.height) || '';
    }

    if (!isNaN(e.target.value)) {
      if (e.target.name === 'width') {
        screenshotProp.width = parseInt(e.target.value) || '';
      } else if (e.target.name === 'height') {
        screenshotProp.height = parseInt(e.target.value) || '';
      }
    }
    // for custom user agents
    if (e.target.value != null && e.target.name === 'userAgent') {
      screenshotProp.userAgent = e.target.value || '';
    }
    this.setState({ screenshotProp });
  };

  addScreenshot = e => {
    e.preventDefault();
    this.setState(prevState => {
      const ticket = { ...prevState.ticket };
      const len = ticket.screenshots.length;
      ticket.screenshots = [
        ...ticket.screenshots,
        {
          height: '',
          width: '',
          filename: `screenshot${len}.png`,
          userAgent: '',
        },
      ];
      return { ticket };
    });
  };

  removeScreenshot = (e, i) => {
    e.preventDefault();
    this.setState(prevState => {
      const ticket = { ...prevState.ticket };
      ticket.screenshots = ticket.screenshots.filter((s, index) => i !== index);
      return { ticket };
    });
  };

  cleanScreenshots = ticket => {
    const isValidScreenshot = s => {
      return typeof s.height === 'number' && typeof s.width === 'number';
    };

    const newTicket = { ...ticket };
    // filter out screenshots with no width or height
    newTicket.screenshots = newTicket.screenshots.filter(isValidScreenshot);

    return newTicket;
  };

  cleanTicket = () => {
    let ticket = { ...this.state.ticket };
    // clean screenshots
    ticket = this.cleanScreenshots(ticket);
    return ticket;
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const cleanTicket = this.cleanTicket();
    const body = JSON.stringify(cleanTicket);
    const res = await createTicket(body);
    if (!res) {
      console.error('Error creating ticket!!');
      // TODO: let user know about error
    } else {
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
              style={{
                display: 'inline-block',
                textAlign: 'center',
                width: '1000px',
              }}
            >
              <Form.Group
                inline
                style={{ justifyContent: 'center', paddingBottom: '10px' }}
              >
                <label style={{ padding: '10px' }}>Url:</label>
                <Form.Input
                  style={urlInputStyle}
                  type="url"
                  name="url"
                  required
                  placeholder="http://mysite.com"
                  value={this.state.ticket.url}
                  onChange={this.onChangeURL}
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
                <Grid>
                  {this.state.ticket.screenshots.map((screenshot, i) => {
                    return (
                      <CustomScreenshotInput
                        s={screenshot}
                        onChange={this.onChangeScreenshot}
                        onClick={this.removeScreenshot}
                        key={i}
                        i={i}
                        state={this.state}
                      />
                    );
                  })}
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <></>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Button icon onClick={this.addScreenshot} primary>
                        <Icon name="plus circle" />
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </Form>
          </>
        )}
      </div>
    );
  }
}

const CustomScreenshotInput = ({ s, onChange, onClick, i }) => {
  return (
    <>
      <Grid.Row columns={1} style={{ justifyContent: 'center' }}>
        <Grid.Column width={8}>
          <Input
            label="Device:"
            fluid
            input={
              <Dropdown
                selection
                fluid
                placeholder="None"
                options={userAgents}
                onChange={(e, selection) => onChange(e, i, selection)}
                style={{
                  borderRadius: '0 4px 4px 0',
                }}
              />
            }
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={3} style={{ justifyContent: 'center', padding: 0 }}>
        <Grid.Column width={3}>
          <Form.Group inline>
            <label>Width:</label>
            <Form.Input
              type="text"
              name="width"
              style={{ width: '110px' }}
              placeholder="Custom width"
              onChange={e => onChange(e, i)}
              value={s.width}
            />
          </Form.Group>
        </Grid.Column>

        <Grid.Column width={3}>
          <Form.Group inline>
            <label>Height:</label>
            <Form.Input
              type="text"
              name="height"
              style={{ width: '110px' }}
              placeholder="Custom height"
              onChange={e => onChange(e, i)}
              value={s.height}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form.Group inline>
            <label>User Agent:</label>
            <Form.Input
              type="text"
              name="userAgent"
              style={{ width: '300px' }}
              placeholder="Custom user agent"
              onChange={e => onChange(e, i)}
              value={s.userAgent}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column width={1}>
          <Button icon onClick={e => onClick(e, i)} color="red">
            <Icon name="minus circle" />
          </Button>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

CustomScreenshotInput.propTypes = {
  s: PropTypes.element.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  i: PropTypes.number,
};
