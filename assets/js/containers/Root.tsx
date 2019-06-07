import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import AuthDialog from '../components/auth/AuthDialog';
import CustomSnackbar from '../components/common/CustomSnackbar';
import Nav from '../components/common/Nav';
// Containers
import Home from './Home';
import Organisation from './Organisation';
import Welcome from './Welcome';
// Contexts
import ContextProvider from '../contexts/ContextProvider';
// Utils
import client from '../utils/client';

function Root() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ContextProvider>
          <AuthDialog />
          <CustomSnackbar />
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
    </ApolloProvider>
  );
}

export default Root;
