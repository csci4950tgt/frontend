import React, { Component } from 'react';
import Screenshot from './Screenshot';

const REFRESH_EVERY_MS = 1000;

export default class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketInfo: {
        ticketID: props.match.params.ticketID,
        processed: false,
      },
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
    const ticketURL = `http://localhost:8080/api/tickets/${this.state.ticketInfo.ticketID}`;

    try {
      fetch(ticketURL, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const { processed } = res.ticket;

          this.setState(prevState => {
            const { ticketInfo } = prevState;
            ticketInfo.processed = processed;
            return ticketInfo;
          });

          if (processed) {
            this.stopAutomaticRefreshing();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { ticketInfo } = this.state;
    return (
      <>
        <Screenshot ticketInfo={ticketInfo} />
      </>
    );
  }
}
