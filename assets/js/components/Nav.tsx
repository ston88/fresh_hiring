import * as React from 'react';
// MUI Core
import { AppBar, Button, Grid, Toolbar, Theme } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';

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

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center" spacing={3}>
          <Grid item className={classes.logoContainer}>
            <img alt="Fresh Equities" height="24" src="images/logo.svg" />
          </Grid>
          <Grid item className={classes.menuContainer}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button color="primary" variant="contained">
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Button color="secondary" variant="contained">
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
