import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import AuthDialog from '../components/AuthDialog';
import Nav from '../components/Nav';
// Containers
import Home from './Home';
import Organisation from './Organisation';
import Welcome from './Welcome';
// Contexts
import ContextProvider from '../contexts/ContextProvider';

function Root() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AuthDialog />
        <Nav />

        <Switch>
          {/* Route for home page. */}
          <Route exact path="/" component={Home} />

          {/* Route for welcome page. */}
          <Route exact path="/welcome/:token" component={Welcome} />

          {/* Route for organisation page. */}
          <Route exact path="/:marketKey/:listingKey" component={Organisation} />

          {/* Route for 404. */}
          <Route />
        </Switch>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default Root;
