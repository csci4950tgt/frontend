import React, { Component } from 'react';
import { Image, Segment, Grid } from 'semantic-ui-react';
import { getArtifactURL, getArtifactListing } from '../../utils/api.js';

export default class Screenshot extends Component {
  debugger;
  x = getArtifactListing(this.props.ticketID);
  debugger;
  render() {
    let image = null;
    //let image = (
    // <Image
    //   alt="fullpage screenshot"
    //   src={getArtifactListing(this.props.ticketID, 'screenshotFull.png')}
    //   fluid
    //   bordered
    // />
    //);
    //if there is a heigth/width apply it else the image is fluid
    // if (this.props.height != null && this.props.width != null) {
    //   image = (
    //     <Image
    //       alt="fullpage screenshot"
    //       src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
    //       heigth={this.props.height}
    //       width={this.props.width}
    //       centered
    //       bordered
    //     />
    //   );
    //}
    return (
      <Grid columns={1} centered padded>
        <Segment compact> {image}</Segment>
      </Grid>
    );
  }
}
