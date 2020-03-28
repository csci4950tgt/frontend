import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';
import { getArtifactListing } from '../../utils/api.js';

export default class Yara extends Component {
  constructor(props) {
    super(props);
  }

  async fetchArtifacts() {
    const ticketId = this.props.ticketID;

    const res = await getArtifactListing(ticketId);
    console.log(res);
    const artifacts = res.fileArtifacts.filter(artifact =>
      artifact.filename.endsWith('.yara')
    );
    console.log(artifacts);
    return artifacts;
  }

  componentDidMount() {
    this.fetchArtifacts();
  }

  render() {
    return (
      <>
        <Segment size="huge" attached="top" inverted>
          Yara Results
        </Segment>
        <Segment attached="bottom">
          {this.isMalicious ? (
            <h3>Matched with yara rule : ______</h3>
          ) : (
            <h3>No Yara Matches found</h3>
          )}
        </Segment>
      </>
    );
  }
}
