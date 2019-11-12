import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Views
import Home from '../views/Home/Home';
import Tickets from '../views/Tickets/Tickets';

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route path="/tickets" render={() => <Tickets />} />
  </Switch>
);

export default Routes;
