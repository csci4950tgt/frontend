import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Views
import Home from '../views/home/Home';
import Tickets from '../views/tickets/Tickets';

const NoMatch = ({ location }) => (
  <div>
    <h1>
      {' '}
      We&apos;re sorry! This page is currently unavailable. Please try again
      later.{' '}
    </h1>
    <h3>
      (No matching page for <code>{location.pathname})</code>{' '}
    </h3>
    <Link to="/">Return to Homepage</Link>
  </div>
);

NoMatch.propTypes = {
  location: PropTypes.element.isRequired,
};

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route path="/tickets" render={() => <Tickets />} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
