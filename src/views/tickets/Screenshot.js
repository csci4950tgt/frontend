import React, { Component } from 'react';
import {
  Image,
  Segment,
  Divider,
  Icon,
  Button,
  Modal,
  Header,
} from 'semantic-ui-react';
import { getTicket, getArtifactURL } from '../../utils/api.js';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import CustomDotGroup from '../../components/CustomDotGroup.js';

import { userAgentOptions } from '../../views/home/devices';
const userAgents = userAgentOptions.devices;

export default class Screenshot extends Component {
  state = {
    carouselLength: 1,
    carousel: [],
  };
  async getTicket() {
    // always get full page screenshot and add it to the carousel
    let image = (
      <Slide index={0}>
        <Header as="h4" dividing>
          Default
        </Header>
        <Image
          alt="fullpage screenshot"
          src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
          bordered
          centered
          fluid
        />
      </Slide>
    );
    let carouselTemp = [];
    carouselTemp.push(image);
    this.setState({ carousel: carouselTemp });

    try {
      let ticket = await getTicket(this.props.ticketID);
      this.setState({
        carouselLength:
          this.state.carouselLength + ticket.ticket.screenshots.length,
      });
      for (let i in ticket.ticket.screenshots) {
        const filename = ticket.ticket.screenshots[i].filename;
        const userAgent = ticket.ticket.screenshots[i].userAgent;
        //get the json object index of the user agent
        const index = userAgents.findIndex(
          item => item.userAgent === userAgent
        );
        let deviceName;
        if (index > -1) {
          deviceName = userAgents[index].name;
        } else {
          deviceName = 'Custom';
        }
        let carouselImg = (
          <Slide index={i + 1} centered>
            <Header as="h4" dividing>
              {deviceName}
            </Header>
            <Image
              alt="screenshot"
              src={getArtifactURL(this.props.ticketID, filename)}
              bordered
              centered
            />
          </Slide>
        );
        carouselTemp.push(carouselImg);
        this.setState({ carousel: carouselTemp });
      }
    } catch (error) {
      // todo: tell user about error
    }
  }

  componentDidMount() {
    this.getTicket();
  }

  render() {
    //Carasoul has option to play
    //isPlaying="true"
    //interval="3500"
    return (
      <div>
        <Segment maxwidth={100}>
          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={0.5}
            totalSlides={this.state.carouselLength}
          >
            <Slider>{this.state.carousel}</Slider>
            <Divider />
            <Modal
              trigger={
                <Button floated="right" icon>
                  {' '}
                  <Icon name="expand" />{' '}
                </Button>
              }
            >
              <Modal.Content image>
                <Image
                  alt="fullpage screenshot"
                  src={getArtifactURL(
                    this.props.ticketID,
                    'screenshotFull.png'
                  )}
                  bordered
                  centered
                  fluid
                />
              </Modal.Content>
            </Modal>
            <CustomDotGroup slides={this.state.carouselLength} />
          </CarouselProvider>
        </Segment>
      </div>
    );
  }
}
