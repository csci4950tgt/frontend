import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

// Routes
import NestedTicketRoutes from '../../routes/NestedTicketRoutes';

const Tickets = ({ ticket }) => {
  const { path } = useRouteMatch();
  return (
    <>
      <NestedTicketRoutes path={path} ticket={ticket} />
    </>
  );
};

Tickets.propTypes = {
  ticket: PropTypes.element.isRequired,
};

export default Tickets;
