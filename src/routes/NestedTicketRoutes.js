import React from 'react';
import { Header } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

// Components
import RecentTickets from '../components/RecentTickets';

// View sub-components
import Ticket from '../views/Tickets/Ticket';

const NestedTicketRoutes = ({ path, ticket }) => (
  <Switch>
    <Route exact path={path}>
      <Header as="h5">Please select a ticket.</Header>
      <RecentTickets />
    </Route>
    <Route path={`${path}/:ticketID`}>
      <Ticket ticket={ticket} />
    </Route>
  </Switch>
);

export default NestedTicketRoutes;
