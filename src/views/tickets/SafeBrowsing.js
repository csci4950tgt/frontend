import React, { Component } from 'react';
import { Icon, Segment, List } from 'semantic-ui-react';

export default class SafeBrowsing extends Component {
  constructor(props) {
    super(props);
    var segColor;
    this.getMatches();
  }

  getMatches() {
    if (!this.props.matches.length) {
      this.segColor = 'green';
    } else {
      this.segColor = 'red';
    }
  }

  render() {
    const ThreatListItem = item => (
      <List.Item>
        <List.Content>
          <p>Threat type: {item.threatType}</p>
          <p>Platforms at risk: {item.platformType}</p>
          <p>Threat URL: {item.threat.url}</p>
        </List.Content>
      </List.Item>
    );
    return (
      <>
        <Segment size="huge" attached="top" inverted color={this.segColor}>
          <Icon name="google" />
          Google Safe Browsing
        </Segment>
        <Segment attached="bottom">
          {this.props.matches.length ? (
            <List divided>
              {this.props.matches.map(item => ThreatListItem(item))}
            </List>
          ) : (
            <h3>No threats Detected</h3>
          )}
        </Segment>
      </>
    );
  }
}
