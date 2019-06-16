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
import BidSummary from './BidSummary';
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

            {/* Route for organisation page. */}
            <Route exact path="/capital-raise/:capitalRaiseId" component={Organisation} />

            {/* Route for welcome page. */}
            <Route exact path="/welcome/:token" component={Welcome} />

            {/* Route for bidding summary page. */}
            <Route exact path="/bidsummary/:bidId" component={BidSummary} />

            {/* Route for 404. */}
            <Route />
          </Switch>
        </ContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
