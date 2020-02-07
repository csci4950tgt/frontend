import React, { Component } from 'react';
import { getTicket, getArtifactURL } from '../../utils/api.js';
import { Icon, Header, Segment } from 'semantic-ui-react';

export default class SafeBrowsing extends Component {
  constructor(props) {
    super(props);
    var res;
    var matches;
    var segColor = 'white';
    this.getMatches();
  }

  getMatches() {
    // this.matches = "[\r\n    {\r\n      \"threatType\": \"MALWARE\",\r\n      \"platformType\": \"WINDOWS\",\r\n      \"threat\": {\r\n        \"url\": \"https:\/\/testsafebrowsing.appspot.com\/s\/malware.html\"\r\n      },\r\n      \"cacheDuration\": \"300s\",\r\n      \"threatEntryType\": \"URL\"\r\n    }\r\n  ]";
    if (this.matches === undefined) {
      this.segColor = 'green';
    } else {
      this.segColor = 'red';
      this.res = JSON.parse(this.matches);
      this.res = this.res[0];
      console.log(this.res);

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
          {this.matches === undefined && <h3>No threats Detected</h3>}
          {this.matches !== undefined && (
            <>
              <p>Threat type: {this.res.threatType}</p>
              <p>Platforms at risk: {this.res.platformType}</p>
            </>
          )}
        </Segment>
      </>
    );
  }
}
