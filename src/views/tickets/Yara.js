import React, { Component } from 'react';
import { Segment, List, Label } from 'semantic-ui-react';
import { getArtifactListing, getArtifact, getTicket } from '../../utils/api.js';

const REFRESH_EVERY_MS = 1000;

export default class Yara extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processed: false,
      error: false,
      isMalicous: false,
      matchedRules: [],
    };
    this.processed = false;

    this.refreshInterval = setInterval(
      this.refreshTicketState,
      REFRESH_EVERY_MS
    );

    this.refreshYaraState();
  }

  stopAutomaticRefreshing() {
    clearInterval(this.refreshInterval);
  }

  async fetchArtifacts() {
    const ticketId = this.props.ticketID;

    const res = await getArtifactListing(ticketId);
    const artifacts = res.fileArtifacts.filter(artifact =>
      artifact.filename.endsWith('.yara')
    );

    let yara = [];

    for (const item of artifacts) {
      let artifact = await getArtifact(this.props.ticketID, item.filename);
      yara.push(artifact);
    }
    return yara;
  }

  getRuleName = rule => {
    console.log(rule);
    if (rule.metas) {
      for (const item of rule.metas) {
        console.log(item);
        if (item.id === 'desc') {
          return item.value;
        } else if (item.id === 'description') {
          return item.value;
        }
      }
    } else {
      return rule.id;
    }
  };

  refreshYaraState = async e => {
    try {
      const ticketId = this.props.ticketID;
      const ticket = await getTicket(ticketId);
      const { processed } = ticket.ticket;

      let artifacts = await this.fetchArtifacts();
      let matchedRules = [];

      let i = 0;
      for (i; i < artifacts.length; i++) {
        let item = JSON.parse(artifacts[i]);
        const rule = JSON.parse(item.matchedRule.substr(7));
        console.log('This is the information that will need to be printed');
        console.log(rule.rules[0]);
        matchedRules.push([i, rule.rules[0], item.error]);
      }

      this.setState({
        processed,
        matchedRules,
      });

      if (processed) {
        this.stopAutomaticRefreshing();
      }
    } catch (error) {
      this.setState({ hasError: error.message });
    }
  };

  render() {
    const YaraListItem = item => (
      <List.Item>
        <List.Content>
          <Segment>
            <Label attached="top">Rule Matched</Label>
            <p>{this.getRuleName(item[1])}</p>
          </Segment>
        </List.Content>
      </List.Item>
    );
    return (
      <>
        {!this.state.processed && (
          <>
            <Segment size="huge" attached="top" inverted>
              Yara Results
            </Segment>
            <Segment loading attached="bottom" padded="very" />
          </>
        )}
        {this.state.processed && (
          <>
            <Segment size="huge" attached="top" inverted>
              Yara Results: {this.state.matchedRules.length} rules matched
            </Segment>
            <Segment attached="bottom">
              {this.state.matchedRules.length ? (
                <List divided>
                  {this.state.matchedRules.map(item => YaraListItem(item))}
                </List>
              ) : (
                <h3>No Yara Matches found</h3>
              )}
            </Segment>
          </>
        )}
      </>
    );
  }
}
