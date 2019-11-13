import React from 'react';
import { Header } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';

// Routes
import NestedTicketRoutes from '../../routes/NestedTicketRoutes';

const Tickets = ({ ticket }) => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <NestedTicketRoutes path={path} ticket={ticket} />
    </>
  );
};

export default Tickets;
