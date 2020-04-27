import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TicketNotFound = ({ ticketID, errMessage }) => {
  return (
    <div>
      <h1>
        {' '}
        We&apos;re sorry! There is something wrong with ticket{' '}
        <code>{ticketID}</code> (Error: <code>{errMessage}</code>), please check
        the ticket exists or not.{' '}
      </h1>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
};

TicketNotFound.propTypes = {
  ticketID: PropTypes.number,
  errMessage: PropTypes.string,
};

export default TicketNotFound;
