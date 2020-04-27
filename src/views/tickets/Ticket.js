import React, { Component } from 'react';
import { Loader, Placeholder, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getTicket } from '../../utils/api.js';
import TicketNotFound from './TicketNotFound';
import UrlAnalysis from './UrlAnalysis';

const REFRESH_EVERY_MS = 1000;

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketInfo: {
        ticketID: props.match.params.ticketID,
        processed: false,
        height: props.match.params.height,
        width: props.match.params.width,
      },
      malwareMatches: '[]',
      hasError: '',
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
      const { processed, url } = ticket.ticket;

      this.setState({
        ticketInfo: { ...this.state.ticketInfo, processed, url },
        malwareMatches: ticket.ticket.malwareMatches,
      });

      if (processed) {
        this.stopAutomaticRefreshing();
      }
    } catch (error) {
      this.setState({ hasError: error.message });
    }
  };

  static getDerivedStateFromError = error => {
    this.setState({ hasError: error.message });
  };

  render() {
    const { ticketInfo } = this.state;
    if (this.state.hasError !== '') {
      return (
        <TicketNotFound
          ticketID={ticketInfo.ticketID}
          errMessage={this.state.hasError}
        />
      );
    } else {
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
            <UrlAnalysis
              ticket={this.state}
              onFileSelectionChange={this.onFileSelectionChange}
            />
          )}
        </>
      );
    }
  }
}

Ticket.propTypes = {
  match: PropTypes.element.isRequired,
};
