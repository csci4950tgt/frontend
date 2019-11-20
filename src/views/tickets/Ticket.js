import React, { Component } from 'react';
import Screenshot from './Screenshot';

const REFRESH_EVERY_MS = 1000;

export default class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processed: false,
      ticketID: props.match.params.ticketID,
      url: props.match.url,
      refreshInterval: setInterval(this.refreshTicketState, REFRESH_EVERY_MS),
    };

    this.refreshTicketState();
  }

  stopAutomaticRefreshing() {
    clearInterval(this.state.refreshInterval);
  }

  componentWillUnmount() {
    // clean up in case we're navigating away:
    this.stopAutomaticRefreshing();
  }

  refreshTicketState = async e => {
    const ticketURL = `http://localhost:8080/api/tickets/${this.state.ticketID}`;

    try {
      fetch(ticketURL, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const processed = res.ticket.processed;

          this.setState({ processed });

          if (processed) {
            this.stopAutomaticRefreshing();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Screenshot
          ticketID={this.state.ticketID}
          url={this.state.url}
          processed={this.state.processed}
        />
      </>
    );
  }
}
