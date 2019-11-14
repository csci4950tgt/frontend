import React from 'react';
import { useRouteMatch } from 'react-router-dom';

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

export default Tickets;
