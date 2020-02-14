import React, { Component } from 'react';
import { Image, Segment, Grid, Divider, Container } from 'semantic-ui-react';
import { getTicket, getArtifactURL } from '../../utils/api.js';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import CustomDotGroup from '../../components/CustomDotGroup.js';

export default class Screenshot extends Component {
  state = {
    carouselLength: 1,
    singleScreenshot: true,
  };
  carousel = [];
  async getTicket() {
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
    debugger;
    try {
      let ticket = await getTicket(this.props.ticketID);
      const length =
        this.state.carouselLength + ticket.ticket.screenshots.length;
      if (length > 1) {
        this.setState({ singleScreenshot: false });
      }
      this.setState({ carouselLength: length });
      for (let i in ticket.ticket.screenshots) {
        const filename = ticket.ticket.screenshots[i].filename;
        //const screenshot = ticket.screenshots[i];
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
    debugger;
  }

  componentDidMount() {
    this.getTicket();
  }

  render() {
    return (
      <div>
        {this.state.singleScreenshot ? (
          <Image
            alt="fullpage screenshot"
            src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
            bordered
            centered
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
              <CustomDotGroup slides={this.state.carouselLength} />
            </CarouselProvider>
          </Segment>
        )}
      </div>
    );
  }
}
