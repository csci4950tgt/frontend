import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { getTicketListing } from '../utils/api.js';

const recentTickets = {
  display: 'inline-block',
  marginTop: '20px',
};

export default class RecentTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastResponse: null,
      lastError: null,
    };
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
            {this.state.lastResponse.length > 0 ? (
              <div>
                <h3>Recent Tickets:</h3>
                <table className="ui unstackable celled padded table">
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
                      <tr key={ticket.ID}>
                        <td>
                          {ticket.url.length > 30
                            ? ticket.url.substring(0, 30) + '...'
                            : ticket.url}
                        </td>
                        <td>
                          <Moment date={ticket.CreatedAt} fromNow />
                        </td>
                        <td>{ticket.processed ? 'Yes' : 'No'}</td>
                        <td>
                          <Link to={`/tickets/${ticket.ID}`}>
                            Ticket #{ticket.ID}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="5">
                        <div className="ui right floated pagination menu">
                          <a className="icon item" href={'/#'}>
                            <i className="left chevron icon"></i>
                          </a>
                          <a className="item" href={'/#page1'}>
                            1
                          </a>
                          <a className="item" href={'/#page2'}>
                            2
                          </a>
                          <a className="item" href={'/#page3'}>
                            3
                          </a>
                          <a className="item" href={'/#page4'}>
                            4
                          </a>
                          <a className="icon item" href={'/#page2'}>
                            <i className="right chevron icon"></i>
                          </a>
                        </div>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div>
                <i>(No Recent Tickets)</i>
              </div>
            )}
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
      const tickets = await getTicketListing();

      this.setState({
        lastError: null,
        lastResponse: tickets.tickets,
      });
    } catch (error) {
      this.setState({ lastError: error.message, lastResponse: null });

      console.log(error);
    }
  }
}
