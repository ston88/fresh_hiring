import * as React from 'react';
// MUI Core
import { AppBar, Button, Grid, Toolbar, Theme } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Contexts
import AuthDialogContext from '../contexts/AuthDialogContext';

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
          <Grid item className={classes.logoContainer}>
            <img alt="Fresh Equities" height="24" src="/images/logo.svg" />
          </Grid>
          <Grid item className={classes.menuContainer}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  color="primary"
                  onClick={showAuthDialog}
                  variant="contained"
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  onClick={showAuthDialog}
                  variant="contained"
                >
                  Create a Free Account
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
