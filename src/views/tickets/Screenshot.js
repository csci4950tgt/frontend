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
import { getTicket, getArtifactURL, getArtifact } from '../../utils/api.js';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import CustomDotGroup from '../../components/CustomDotGroup.js';
import TextComponent from '../../utils/TextComponent.js';
import ImageComponent from '../../utils/ImageComponent.js';

export default class Screenshot extends Component {
  state = {
    carouselLength: 0,
  };
  carousel = [];
  ocrText = [];
  imageURLs = [];

  async getTicket() {
    // always get full page screenshot and add it to the carousel
    let fullscreenImageURL = getArtifactURL(
      this.props.ticketID,
      'screenshotFull.png'
    );
    let image = (
      <Slide index={0} key={0}>
        <Header as="h4" dividing>
          Default
        </Header>
        <Image
          alt="fullpage screenshot"
          src={fullscreenImageURL}
          bordered
          centered
          fluid
        />
      </Slide>
    );
    this.carousel.push(image);
    this.imageURLs.push(fullscreenImageURL);
    getArtifact(this.props.ticketID, 'recognize-screenshotFull.ocr').then(
      res => {
        this.ocrText.push(res);
      }
    );
    this.setState({ carouselLength: 1 });

    try {
      let ticket = await getTicket(this.props.ticketID);
      this.setState({
        carouselLength:
          this.state.carouselLength + ticket.ticket.screenshots.length,
      });
      for (let i in ticket.ticket.screenshots) {
        const filename = ticket.ticket.screenshots[i].filename;
        const imageURL = getArtifactURL(this.props.ticketID, filename);
        this.imageURLs.push(imageURL);
        let carouselImg = (
          <Slide index={i + 1} centered="true" key={i + 1}>
            <Header as="h4" dividing></Header>
            <Image
              alt="screenshot"
              src={getArtifactURL(this.props.ticketID, filename)}
              bordered
              centered
            />
          </Slide>
        );

        this.carousel.push(carouselImg);
        getArtifact(
          this.props.ticketID,
          'recognize-' + filename.slice(0, -4) + '.ocr'
        ).then(res => {
          this.ocrText.push(res);
        });
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
            <Slider>{this.carousel}</Slider>
            <Divider />
            <Modal
              trigger={
                <Button floated="right" icon>
                  <Icon name="expand" />
                </Button>
              }
            >
              <ImageComponent images={this.imageURLs} />
            </Modal>
            <Modal
              trigger={
                <Button floated="right" icon>
                  <Icon name="font" />
                </Button>
              }
            >
              <TextComponent ocrText={this.ocrText} />
            </Modal>
            <CustomDotGroup slides={this.state.carouselLength} />
          </CarouselProvider>
        </Segment>
      </div>
    );
  }
}
