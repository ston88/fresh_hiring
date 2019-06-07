import * as React from 'react';
// MUI Core
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Theme,
} from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Components
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
// Contexts
import AuthDialogContext from '../contexts/AuthDialogContext';

const useStyles = makeStyles((theme: Theme) => ({
  dialogContentRoot: {
    padding: theme.spacing(3),
  },
  logoContainer: {
    display: 'flex',
  },
}));

function AuthDialog() {
  const classes = useStyles();

  const { hideAuthDialog, visible } = React.useContext(AuthDialogContext);

  const [mode, setMode] = React.useState<'sign-in' | 'sign-up'>('sign-in');

  return (
    <Dialog keepMounted maxWidth="xs" onClose={hideAuthDialog} open={visible}>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Grid container justify="center" spacing={3}>
          <Grid item className={classes.logoContainer}>
            <Box my={3}>
              <img alt="Fresh Equities" height="32" src="/images/logo.svg" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            {mode === 'sign-in' && <LogInForm handleSignUp={() => setMode('sign-up')} />}
            {mode === 'sign-up' && <SignUpForm handleCancel={() => setMode('sign-in')} />}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
