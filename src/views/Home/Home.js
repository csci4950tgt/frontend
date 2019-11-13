import React, { Component } from 'react';

// Components
import UserInput from '../../components/UserInput';
import RecentTickets from '../../components/RecentTickets';

class Home extends Component {
  render() {
    const { setCurTicket } = this.props;
    return (
      <>
        <UserInput response={setCurTicket} />

        <RecentTickets />
      </>
    );
  }
}

export default Home;
