// assets/js/components/Header.tsx

import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  actionButtonRoot: {
    height: 36,
    padding: 0,
    width: 36,
  },
  appBarRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
  },
  logo: {
    height: 24,
    width: 'auto',
  },
  shim: {
    ...theme.mixins.toolbar,
  },
  signUpButton: {
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      border: `1px solid ${theme.palette.secondary.dark}`,
    },
  },
});
class Header extends React.Component {
  state = {
    open: false,
    login: false,
  }

  handleClickOpen = (login: Boolean) => {
    this.setState({ open: true, login: login});
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar classes={{ root: classes.appBarRoot }} position='static'>
        <Toolbar>
          <Grid container alignItems="center" spacing={16}>
            <Grid item>
              <img
                className={classes.logo}
                src="images/logo.svg" 
                alt="Fresh Equities" 
              />
            </Grid>
            <Grid item style={{ flex: 1 }}>
              <Grid container alignItems="center" justify="flex-end" spacing={16}>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen(true)}>Login</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={() => this.handleClickOpen(false)}>Sign Up</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header)
