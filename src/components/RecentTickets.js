import React, { Component } from 'react';
import Moment from 'react-moment';

const recentTickets = {
  display: 'inline-block',
  marginTop: '20px',
};

export default class RecentTickets extends Component {
  constructor(props) {
    super(props);
    this.state = { lastResponse: null, lastError: null };
  }

  render() {
    // TODO: pagination
    return (
      <div style={recentTickets}>
        {!this.state.lastResponse && !this.state.lastError ? (
          <div>Loading recent tickets...</div>
        ) : null}

        {this.state.lastError ? (
          <div>Failed to load recent tickets: {this.state.lastError}</div>
        ) : null}

        {this.state.lastResponse ? (
          <div>
            <h3>Recent Tickets:</h3>
            <table className="ui celled padded table">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Submitted</th>
                  <th>Processed</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {this.state.lastResponse.map(ticket => (
                  <tr>
                    <td>{ticket.url}</td>
                    <td>
                      <Moment date={ticket.CreatedAt} fromNow />
                    </td>
                    <td>{ticket.processed ? 'Yes' : 'No'}</td>
                    <td>
                      <a href={`/ticket/${ticket.ID}`}>Ticket #{ticket.ID}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="5">
                    <div className="ui right floated pagination menu">
                      <a className="icon item">
                        <i className="left chevron icon"></i>
                      </a>
                      <a className="item">1</a>
                      <a className="item">2</a>
                      <a className="item">3</a>
                      <a className="item">4</a>
                      <a className="icon item">
                        <i className="right chevron icon"></i>
                      </a>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    this.refresh();
  }

  async refresh() {
    try {
      console.log('Requesting listing of recent tickets from server...');

      const ticketsResponse = await fetch('/api/tickets').then(res =>
        res.json()
      );

      console.log('Received ticket listing response from server:');
      console.log(ticketsResponse);

      if (ticketsResponse.success) {
        this.setState({
          lastError: null,
          lastResponse: ticketsResponse.tickets,
        });
      } else {
        throw new Error(`Server returned error: ${ticketsResponse.message}`);
      }
    } catch (error) {
      this.setState({ lastError: error.message, lastResponse: null });

      console.log('Failed to load recent tickets:');
      console.log(error);
    }
  }
}
