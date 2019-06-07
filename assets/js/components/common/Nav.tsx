import * as React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
// MUI Core
import { AppBar, Avatar, Button, Grid, Toolbar, Theme } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Components
import UserMenu from './UserMenu';
// Contexts
import AuthDialogContext from '../../contexts/AuthDialogContext';
// GraphQL
import MeQuery, { IMeQueryData } from '../../graphql/queries/MeQuery.graphql';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    color: theme.palette.text.primary,
  },
  logoContainer: {
    display: 'flex',
  },
  menuContainer: {
    flex: 1,
  },
}));

function Nav() {
  const classes = useStyles();

  const { showAuthDialog } = React.useContext(AuthDialogContext);

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Link className={classes.logoContainer} to="/">
              <img alt="Fresh Equities" height="24" src="/images/logo.svg" />
            </Link>
          </Grid>
          <Grid item className={classes.menuContainer}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Query<IMeQueryData, {}>
                  fetchPolicy="cache-and-network"
                  query={MeQuery}
                >
                  {({ data }) => {
                    if (data && data.me) {
                      return (
                        <UserMenu me={data.me} />
                      );
                    }

                    return (
                      <Button
                        color="secondary"
                        onClick={showAuthDialog}
                        variant="contained"
                      >
                        Sign In
                      </Button>
                    );
                  }}
                </Query>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
