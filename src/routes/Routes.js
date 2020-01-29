import React from 'react';
import { Switch, Route} from 'react-router-dom';

// Views
import Home from '../views/home/Home';
import Tickets from '../views/tickets/Tickets';

const NoMatch = ({ location }) => (
  <div>
    <h1> We're sorry! this page is currently unavailable. please try again later. </h1>
    <h3>(No matching page for <code>{location.pathname})</code> </h3>
  </div>
)

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route path="/tickets" render={() => <Tickets />} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
