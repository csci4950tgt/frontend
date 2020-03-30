import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';
import { getArtifactListing, getArtifact } from '../../utils/api.js';

const REFRESH_EVERY_MS = 1000;

export default class Yara extends Component {
  constructor(props) {
    super(props);
    console.log(props);

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

    let i = 0;
    for (i; i < artifacts.length; i++) {
      let artifact = await getArtifact(
        this.props.ticketID,
        artifacts[i].filename
      );
      yara.push(artifact);
    }
    return yara;
  }

  refreshYaraState = async e => {
    var yara = this;

    try {
      this.artifact = this.fetchArtifacts();
      let matchedRules = [];

      await this.artifact.then(function(result) {
        let i = 0;
        for (i; i < result.length; i++) {
          let item = JSON.parse(result[i]);
          const rule = JSON.parse(item.matchedRule.substr(7));
          console.log('This is the information that will need to be printed');
          console.log(rule.rules[0]);
          matchedRules.push([i, rule.rules[0]]);
        }
        yara.setState({
          processed: true,
          error: result.error,
          matchedRules: matchedRules,
        });
      });

      if (this.state.processed) {
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
          <h3>
            Key = {item[0]}, ID = {item[1].id}
          </h3>
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
            <Segment attached="bottom">
              <h3>Waiting TODO: Change to loading icon</h3>
            </Segment>
          </>
        )}
        {this.state.processed && (
          <>
            <Segment size="huge" attached="top" inverted>
              Yara Results
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
