import * as React from 'react';
// MUI Core
import { Box, Container, Grid, Theme, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles, useTheme } from '@material-ui/styles';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    height: 96,
    width: 96,
  },
  logoContainer: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    display: 'flex',
    overflow: 'hidden',
  },
}));

function OrganisationHeader({ capitalRaise }: IProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <Box bgcolor={theme.palette.common.white}>
      <Container maxWidth="lg">
        <Box px={3} py={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.logoContainer}>
                <img
                  className={classes.logo}
                  alt={capitalRaise.key}
                  src={capitalRaise.logo}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4">{capitalRaise.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="body2">
                    {capitalRaise.key}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="secondary" variant="body2">
                    {capitalRaise.gics}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default OrganisationHeader;
