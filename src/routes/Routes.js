import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Views
import Home from '../views/Home/Home';
import Tickets from '../views/Tickets/Tickets';

const Routes = ({ appState, setCurTicket }) => (
  <Switch>
    <Route exact path="/" render={() => <Home setCurTicket={setCurTicket} />} />
    <Route
      path="/tickets"
      render={() => <Tickets ticket={appState.curTicket} />}
    />
  </Switch>
);

export default Routes;
