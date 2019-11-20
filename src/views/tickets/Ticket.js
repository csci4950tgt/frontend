import React from 'react';
import { Header } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import Screenshot from './Screenshot';
import JSViewer from './JSViewer';

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: '',
      processed: false,
      ticketID: this.props.match.params.ticketID,
    };
  }

  async checkProcessed() {
    console.log('checking');
    try {
      const res = await fetch(
        'http://localhost:8080/api/tickets/' + this.state.ticketID,
        {
          method: 'GET',
        }
      );

      const response = await res.json();
      const processed = response.ticket.processed;
      this.setState({ processed: processed });
      if (processed) {
        clearInterval(this.interval);
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.checkProcessed.bind(this), 5000);
    this.checkProcessed();
  }

  onFileSelectionChange = (e, data) => {
    this.setState({ currentCode: data.value });
  };

  render() {
    return (
      <div>
        {!this.state.processed && (
          <Header as="h3" inverted color="blue">
            {' '}
            This ticket has not been processed. Please wait.{' '}
          </Header>
        )}
        {this.state.processed && (
          <div>
            <Header as="h3" inverted color="blue">
              {' '}
              Screenshot for ticket #{this.state.id}{' '}
            </Header>
            <Screenshot ticketID={this.state.ticketID} />
            <JSViewer
              ticketID={this.state.ticketID}
              onFileSelectionChange={this.onFileSelectionChange}
              code={this.state.currentCode}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Ticket);
