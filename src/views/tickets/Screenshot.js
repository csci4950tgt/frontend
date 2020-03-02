import React, { Component } from 'react';
import {
  Image,
  Segment,
  Divider,
  Icon,
  Button,
  Modal,
} from 'semantic-ui-react';
import { getTicket, getArtifactURL } from '../../utils/api.js';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import CustomDotGroup from '../../components/CustomDotGroup.js';

export default class Screenshot extends Component {
  state = {
    carouselLength: 1,
  };
  carousel = [];

  async getTicket() {
    // always get full page screenshot and add it to the carousel
    let image = (
      <Slide index={0} width="100%">
        <Image
          alt="fullpage screenshot"
          src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
          bordered
          centered
        />
      </Slide>
    );
    this.carousel.push(image);

    try {
      let ticket = await getTicket(this.props.ticketID);
      this.setState({
        carouselLength:
          this.state.carouselLength + ticket.ticket.screenshots.length,
      });

      for (let i in ticket.ticket.screenshots) {
        const filename = ticket.ticket.screenshots[i].filename;
        let carouselImg = (
          <Slide index={i + 1} centered>
            <Image
              alt="fullpage screenshot"
              src={getArtifactURL(this.props.ticketID, filename)}
              bordered
              centered
            />
          </Slide>
        );

        this.carousel.push(carouselImg);
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
        {this.state.carouselLength === 1 ? (
          <Image
            alt="fullpage screenshot"
            src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
            bordered
            centered
            fluid
          />
        ) : (
          <Segment maxwidth={100}>
            <CarouselProvider
              naturalSlideWidth={1}
              naturalSlideHeight={0.5}
              totalSlides={this.state.carouselLength}
            >
              <Slider>{this.carousel}</Slider>
              <Divider />
              <Modal
                trigger={
                  <Button floated="right" icon>
                    <Icon name="expand" />
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
              <Modal
                trigger={
                  <Button floated="right" icon>
                    <Icon name="font" />
                  </Button>
                }
              >
                <Modal.Content text>
                  test OCR Text <br />
                  Mutiple lines
                </Modal.Content>
              </Modal>

              <CustomDotGroup slides={this.state.carouselLength} />
            </CarouselProvider>
          </Segment>
        )}
      </div>
    );
  }
}
