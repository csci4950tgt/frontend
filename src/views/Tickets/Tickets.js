import React from 'react';
import { Header } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';

// Routes
import NestedTicketRoutes from '../../routes/NestedTicketRoutes';

const Tickets = () => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <Header as="h3">Tickets</Header>

      <NestedTicketRoutes path={path} />
    </>
  );
};

export default Tickets;
