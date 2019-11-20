import React from 'react';
import { withRouter } from 'react-router';

import Screenshot from './Screenshot';
import JSViewer from './JSViewer';

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: '',
      processed: false,
      ticketID: '',
    };
  }

  componentDidMount() {
    this.setState({ ticketID: this.props.match.params.ticketID });
  }

  onFileSelectionChange = (e, data) => {
    this.setState({ currentCode: data.value });
  };

  render() {
    return (
      <>
        <Screenshot ticketID={18} />
        <JSViewer
          ticketID={18}
          onFileSelectionChange={this.onFileSelectionChange}
          code={this.state.currentCode}
        />
      </>
    );
  }
}

export default withRouter(Ticket);
