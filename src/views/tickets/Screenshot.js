import React, { Component } from 'react';
import { Image, Segment, Grid } from 'semantic-ui-react';
import {
  getTicket,
  getArtifactListing,
  getArtifactURL,
} from '../../utils/api.js';

export default class Screenshot extends Component {
  state = {
    height: 0,
    width: 0,
  };
  async getTicket() {
    try {
      let value = await getTicket(this.props.ticketID);
      debugger;

      this.setState({ height: value.ticket.screenshots[0].height });
      this.setState({ width: value.ticket.screenshots[0].width });
    } catch (error) {
      // todo: tell user about error
    }
  }

  componentDidMount() {
    this.getTicket();
  }

  render() {
    let image = (
      <Image
        alt="fullpage screenshot"
        src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
        fluid
        bordered
      />
    );
    //if there is a heigth/width apply it else the image is fluid
    if (this.state.height != 0 && this.state.width != 0) {
      image = (
        <Image
          alt="fullpage screenshot"
          src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
          heigth={this.state.height}
          width={this.state.width}
          centered
          bordered
        />
      );
    }
    return (
      <Grid columns={1} centered padded>
        <Segment compact> {image}</Segment>
      </Grid>
    );
  }
}
