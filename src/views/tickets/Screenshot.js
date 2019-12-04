import React, { Component } from 'react';
import { Image, Segment } from 'semantic-ui-react';
import { getArtifactURL } from '../../utils/api.js';

export default class Screenshot extends Component {
  render() {
    return (
      <Segment inverted>
        <Image
          alt="fullpage screenshot"
          src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
          fluid
        />
      </Segment>
    );
  }
}
