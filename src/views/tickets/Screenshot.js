import React, { Component } from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Image,
  Segment,
  Divider,
  Icon,
  Button,
  Modal,
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Utils
import {
  getTicket,
  getArtifactURL,
  getArtifact,
  getArtifactListing,
} from '../../utils/api.js';

// Components
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import CustomDotGroup from '../../components/CustomDotGroup.js';
import TextComponent from '../../utils/TextComponent.js';
import ImageComponent from '../../utils/ImageComponent.js';

export default class Screenshot extends Component {
  state = {
    carouselLength: 0,
  };

  // TODO: Refactor this!! Never should keep track of things in React
  // Component outside of the state!!
  carousel = [];
  ocrText = [];
  imageURLs = [];

  async getTicket() {
    // always get full page screenshot and add it to the carousel
    const fullscreenImageURL = getArtifactURL(
      this.props.ticketID,
      'screenshotFull.png'
    );
    const image = (
      <Slide index={0} key={0}>
        <Header as="h4">Full Screen Image</Header>
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
    this.ocrText.push('OCR not run on this file.');
    this.setState({ carouselLength: 1 });

    try {
      const ticket = await getTicket(this.props.ticketID);

      for (const i in ticket.ticket.screenshots) {
        const filename = ticket.ticket.screenshots[i].filename;
        const imageURL = getArtifactURL(this.props.ticketID, filename);
        this.imageURLs.push(imageURL);
        const carouselImg = (
          <Slide index={i + 1} centered="true" key={i + 1}>
            <Header as="h4">{filename}</Header>
            <Image
              alt="screenshot"
              src={getArtifactURL(this.props.ticketID, filename)}
              bordered
              centered
            />
          </Slide>
        );

        this.carousel.push(carouselImg);
        this.ocrText.push('OCR not run on this file.');
      }

      let artifactListing = await getArtifactListing(this.props.ticketID);

      // find images that have associated OCR logs
      artifactListing = artifactListing.fileArtifacts;

      artifactListing = artifactListing.filter(a1 =>
        artifactListing.some(
          a2 =>
            a2.filename ===
            `recognize-${this.getFilenameWithoutExtension(a1.filename)}.ocr`
        )
      );

      // create objects for them in the carousel
      for (const i in artifactListing) {
        const image = artifactListing[i];
        const artifactUrl = getArtifactURL(this.props.ticketID, image.filename);
        this.imageURLs.push(artifactUrl);

        const carouselImg = (
          <Slide
            index={this.carousel.length + 2}
            centered="true"
            key={this.carousel.length + 2}
          >
            <Header as="h4">{image.filename}</Header>
            <Image alt="captured image" src={artifactUrl} bordered centered />
          </Slide>
        );

        this.carousel.push(carouselImg);

        // fetch OCR text
        const fileArtifact = await getArtifact(
          this.props.ticketID,
          `recognize-${this.getFilenameWithoutExtension(image.filename)}.ocr`
        );
        this.ocrText.push(fileArtifact);
      }

      this.setState({
        carouselLength: this.carousel.length,
      });
    } catch (error) {
      console.error(error);
      // todo: tell user about error
    }
  }

  getFilenameWithoutExtension = filename => {
    const path = filename.split('/');

    return path[path.length - 1].split('.')[0];
  };

  componentDidMount() {
    this.getTicket();
  }

  render() {
    // Carasoul has option to play
    // isPlaying="true"
    // interval="3500"
    return (
      <div>
        <Segment>
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
            {
              <Modal
                trigger={
                  <Button floated="right" icon>
                    <Icon name="font" />
                  </Button>
                }
              >
                <TextComponent ocrText={this.ocrText} />
              </Modal>
            }
            <CustomDotGroup slides={this.state.carouselLength} />
          </CarouselProvider>
        </Segment>
      </div>
    );
  }
}

Screenshot.propTypes = {
  ticketID: PropTypes.number,
};
