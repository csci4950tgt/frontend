import React, { Component } from 'react';
import { Loader, Placeholder, Segment } from 'semantic-ui-react';

import Screenshot from './Screenshot';
import JSViewer from './JSViewer';
import { getTicket } from '../../utils/api.js';

const REFRESH_EVERY_MS = 1000;

export default class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketInfo: {
        ticketID: props.match.params.ticketID,
        processed: false,
      },
      currentCode: '',
    };

    this.refreshInterval = setInterval(
      this.refreshTicketState,
      REFRESH_EVERY_MS
    );

    this.refreshTicketState();
  }

  stopAutomaticRefreshing() {
    clearInterval(this.refreshInterval);
  }

  componentWillUnmount() {
    // clean up in case we're navigating away:
    this.stopAutomaticRefreshing();
  }

  refreshTicketState = async e => {
    const ticketId = this.state.ticketInfo.ticketID;

    try {
      const ticket = await getTicket(ticketId);
      const { processed } = ticket.ticket;

      this.setState({ ticketInfo: { ...this.state.ticketInfo, processed } });

      if (processed) {
        this.stopAutomaticRefreshing();
      }
    } catch (error) {
      // todo: display the error on the page
    }
  };

  onFileSelectionChange = (e, data) => {
    this.setState({ currentCode: data.value });
  };

  render() {
    const { ticketInfo } = this.state;
    return (
      <>
        {!this.state.ticketInfo.processed && (
          <div>
            <Loader
              active
              inline
              content="The ticket is being processed. Please wait."
              style={{ marginBottom: '50px' }}
            />
            <Segment inverted>
              <Placeholder fluid inverted>
                <Placeholder.Image />
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </div>
        )}
        {this.state.ticketInfo.processed && (
          <>
            <Screenshot ticketID={ticketInfo.ticketID} />
            <JSViewer
              ticketID={ticketInfo.ticketID}
              onFileSelectionChange={this.onFileSelectionChange}
              code={this.state.currentCode}
            />
          </>
        )}
      </>
    );
  }
}
