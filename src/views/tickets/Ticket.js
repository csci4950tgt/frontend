import React, { Component } from 'react';
import { Loader, Placeholder, Segment } from 'semantic-ui-react';

import Screenshot from './Screenshot';
import JSViewer from './JSViewer';
import { getTicket } from '../../utils/api.js';
import SafeBrowsing from './SafeBrowsing';

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
      malwareMatches: {},
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
      console.log(ticket.ticket);
      console.log(ticket.ticket.malwareMatches);
      var dummy = [
        {
          threatType: 'MALWARE',
          platformType: 'WINDOWS',
          threat: {
            url: 'https://testsafebrowsing.appspot.com/s/malware.html',
          },
          cacheDuration: '300s',
          threatEntryType: 'URL',
        },
        {
          threatType: 'MALWARE',
          platformType: 'WINDOWS',
          threat: {
            url: 'https://testsafebrowsing.appspot.com/s/malware.html',
          },
          cacheDuration: '300s',
          threatEntryType: 'URL',
        },
      ];
      // console.log(dummy);
      this.setState({
        ticketInfo: { ...this.state.ticketInfo, processed },
        malwareMatches: dummy,
      });

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
        {!ticketInfo.processed && (
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
        {ticketInfo.processed && (
          <>
            <Screenshot ticketID={ticketInfo.ticketID} />
            <JSViewer
              ticketID={ticketInfo.ticketID}
              onFileSelectionChange={this.onFileSelectionChange}
              code={this.state.currentCode}
            />
            <SafeBrowsing matches={this.state.malwareMatches} />
          </>
        )}
      </>
    );
  }
}
