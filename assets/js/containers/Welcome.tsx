import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// MUI Core
import { Box, Container, Grid, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  iconContainer: {
    display: 'flex',
  },
});

function Welcome({ match, ...props }: RouteComponentProps<{ token: string }>) {
  const classes = useStyles();

  const { token } = match.params;

  return (
    <Container maxWidth="sm">
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        minHeight="75vh"
        p={3}
      >
        <Grid container justify="center" spacing={3}>
          <Grid item className={classes.iconContainer}>
            <img
              alt="Paper Plance"
              height="64"
              src="/images/paper-plane.svg"
              width="64"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Check Your Inbox
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="body2">
              {`We just emailed a log in link to [email]. Click the link, and you’ll be logged in.`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Welcome;
