import React, { Component } from 'react';
import { Icon, Segment, List, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SafeBrowsing extends Component {
  constructor(props) {
    super(props);
    this.matches = JSON.parse(this.props.matches);
    this.setColor();
  }

  setColor() {
    if (!this.matches.length) {
      this.segColor = 'green';
    } else {
      this.segColor = 'red';
    }
  }

  getPlatform = platform => {
    var symbol;
    switch (platform) {
      case 'WINDOWS':
        symbol = 'windows';
        break;
      case 'LINUX':
        symbol = 'linux';
        break;
      case 'ANDROID':
        symbol = 'android';
        break;
      case 'OSX':
        symbol = 'apple';
        break;
      case 'IOS':
        symbol = 'apple';
        break;
      case 'ANY_PLATFORM':
        symbol = 'computer';
        break;
      case 'CHROME':
        symbol = 'chrome';
        break;
      case 'PLATFORM_TYPE_UNSPECIFIED':
      default:
        symbol = 'question circle';
    }
    return symbol;
  };

  getThreat = threat => {
    var icon;
    switch (threat) {
      case 'MALWARE':
        icon = 'bug';
        break;
      case 'SOCIAL_ENGINEERING':
        icon = 'lock';
        break;
      case 'UNWANTED_SOFTWARE':
        icon = 'download';
        break;
      case 'POTENTIALLY_HARMFUL_APPLICATION':
        icon = 'shield alternate';
        break;
      default:
        icon = 'question circle';
    }
    return icon;
  };

  formatText = text => {
    var format = text.replace('_', ' ');
    if (text === 'IOS') {
      format = 'iOS';
    } else if (text === 'OSX') {
      format = 'OS X';
    } else {
      format = format.toLowerCase();
      format = format.charAt(0).toUpperCase() + format.slice(1);
    }
    return format;
  };

  render() {
    const ThreatListItem = item => (
      <List.Item>
        <List.Content>
          <Segment.Group horizontal>
            <Segment size="big">
              <Label attached="top left">Threat Type</Label>
              <Icon name={this.getThreat(item.threatType)} />
              {this.formatText(item.threatType)}
            </Segment>
            <Segment size="big">
              <Label attached="top left">Platforms at Risk</Label>
              <Icon name={this.getPlatform(item.platformType)} />
              {this.formatText(item.platformType)}
            </Segment>
            <Segment size="big">
              <Label attached="top left">Threat URL</Label>
              <Icon name="world" />
              {item.threat.url}
            </Segment>
          </Segment.Group>
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
          {this.matches.length ? (
            <List divided>
              {this.matches.map(item => ThreatListItem(item))}
            </List>
          ) : (
            <h3>No threats Detected</h3>
          )}
        </Segment>
      </>
    );
  }
}

SafeBrowsing.propTypes = {
  matches: PropTypes.array,
};
