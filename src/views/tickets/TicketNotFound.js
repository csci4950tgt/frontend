import React from 'react';
import { Link } from 'react-router-dom';

// TODO: Should we add the error code?
const TicketNotFound = ({ ticketID, errCode }) => {
  return (
    <div>
      <h1>
        {' '}
        We're sorry! There is something wrong with ticket{' '}
        <code>{ticketID}</code> (Error Code: <code>{errCode}</code>), please the
        ticket exists or not.{' '}
      </h1>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
};

export default TicketNotFound;
