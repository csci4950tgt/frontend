import React, { Component } from 'react';
import { getTicket, getArtifactURL } from '../../utils/api.js';
import { Icon, Header, Segment } from 'semantic-ui-react';

export default class SafeBrowsing extends Component {
  constructor(props) {
    super(props);
    var res,
      segColor = 'white';
    this.getMatches();
  }

  getMatches() {
    console.log(this.props.matches);
    if (!this.props.matches.length) {
      this.segColor = 'green';
    } else {
      this.segColor = 'red';

      //TODO Dynamically create a list of detected threats depending on json string given to us
    }
  }

  render() {
    return (
      <>
        <Segment size="huge" attached="top" inverted color={this.segColor}>
          <Icon name="google" />
          Google Safe Browsing
        </Segment>
        <Segment attached="bottom">
          {!this.props.matches.length && <h3>No threats Detected</h3>}
          {this.props.matches.length && (
            <>
              <p>Threat type: {this.props.matches[0].threatType}</p>
              <p>Platforms at risk: {this.props.matches[0].platformType}</p>
            </>
          )}
        </Segment>
      </>
    );
  }
}
