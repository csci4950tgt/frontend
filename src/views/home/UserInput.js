import React, { Component } from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Grid,
  Dropdown,
  Input,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { createTicket } from '../../utils/api';
import { userAgentOptions } from '../../views/home/devices';

const userAgentPhones = userAgentOptions.phones;
const userAgentTablets = userAgentOptions.phones;

// re write devices to have key, text and value
// implement catagories on dropdown
// ability to add multiple devices
// OR add custome User agent input and height and width

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
    userAgentSelection: '',
  };

  showOptions = e => {
    if (this.state.showOptions) {
      this.setState({ showOptions: false });
    } else {
      this.setState({ showOptions: true });
    }
  };
  //for multiple on forms on a field
  onChangeURL = e => {
    let ticket = { ...this.state.ticket };
    ticket.url = e.target.value;
    this.setState({ ticket });
    // }
  };

  onChangeScreenshot = (e, i, item) => {
    //item is the chosen device form the dropdown menu
    let screenshotProp = this.state.ticket.screenshots[i];
    if (item != null) {
      this.setState({ userAgentSelection: item.text });
      screenshotProp.userAgent = item.userAgent || '';
      screenshotProp.width = parseInt(item.width) || '';
      screenshotProp.height = parseInt(item.height) || '';
    }

    if (!isNaN(e.target.value)) {
      if (e.target.name === 'width') {
        screenshotProp.width = parseInt(e.target.value) || '';
      } else if (e.target.name === 'height') {
        screenshotProp.height = parseInt(e.target.value) || '';
      } else if (e.target.name === 'userAgent') {
        screenshotProp.userAgent = parseInt(e.target.value) || '';
      }
    }
    this.setState({ screenshotProp });
  };

  addScreenshot = e => {
    e.preventDefault();
    this.setState(prevState => {
      let ticket = { ...prevState.ticket };
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
      let ticket = { ...prevState.ticket };
      ticket.screenshots = ticket.screenshots.filter((s, index) => i !== index);
      return { ticket };
    });
  };

  cleanScreenshots = ticket => {
    const isValidScreenshot = s => {
      return typeof s.height === 'number' && typeof s.width === 'number';
    };

    let newTicket = { ...ticket };
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
      console.log(body);
      console.log(res.ticket);
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

const CustomScreenshotInput = ({ s, onChange, onClick, i, state }) => {
  return (
    <>
      <Grid.Row columns={1} style={{ justifyContent: 'center' }}>
        <Grid.Column width={8}>
          <Input
            label="User Agent:"
            fluid
            input={
              <Dropdown
                text={state.userAgentSelection}
                fluid
                selection
                style={{
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <Dropdown.Menu>
                  <Dropdown.Header>Phones</Dropdown.Header>
                  {userAgentPhones.map((item, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        text={item.name}
                        value={item.name}
                        onClick={e => onChange(e, i, item)}
                      />
                    );
                  })}
                  <Dropdown.Header>Tablets</Dropdown.Header>
                  {userAgentTablets.map((item, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        text={item.name}
                        value={item.name}
                        onClick={e => onChange(e, i, item)}
                      />
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            }
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ justifyContent: 'center', padding: 0 }}>
        <Grid.Column width={4}>
          <Form.Group inline>
            <label>Width:</label>
            <Form.Input
              type="text"
              name="width"
              placeholder="Enter an image width"
              onChange={e => onChange(e, i)}
              value={s.width}
            />
          </Form.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Form.Group inline>
            <label>Height:</label>
            <Form.Input
              type="text"
              name="height"
              placeholder=" Enter an image height"
              onChange={e => onChange(e, i)}
              value={s.height}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Form.Group inline>
            <label>User Agent:</label>
            <Form.Input
              type="text"
              name="userAgent"
              placeholder="Enter an custom user agent"
              onChange={e => onChange(e, i)}
              value={s.userAgent}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column width={1}>
          {i > 0 && (
            <Button icon onClick={e => onClick(e, i)} color="red">
              <Icon name="minus circle" />
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
};
