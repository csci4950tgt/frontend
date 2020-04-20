import React from 'react';
import { Header } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import RecentTickets from '../components/RecentTickets';

// View sub-components
import Ticket from '../views/tickets/Ticket';

const NestedTicketRoutes = ({ path }) => (
  <Switch>
    <Route exact path={path}>
      <Header as="h5">Please select a ticket.</Header>
      <RecentTickets />
    </Route>
    <Route path={`${path}/:ticketID`} component={Ticket} />
  </Switch>
);

NestedTicketRoutes.propTypes = {
  path: PropTypes.string,
};

export default NestedTicketRoutes;
