import * as React from 'react';
// MUI Core
import { Box, Container, Grid, Theme, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles, useTheme } from '@material-ui/styles';

interface IProps {
  capitalRaise: {
    id: string;
    insertedAt: string;
    updatedAt: string;

    allocationAvailable: string;
    banner: string;
    bidsDue: string;
    biddingOpen: string;
    biddingClose: string;
    gics: string;
    haltPrice: number;
    instrument: string;
    key: string;
    logo: string;
    marketCap: number;
    maxAmount: number;
    minAmount: number;
    name: string;
    optionsAvailable: boolean;
    optionsExpiration: number;
    optionsRatioNumerator: number;
    optionsRatioDenominator: number;
    optionsStrikePrice: number;
    price: number;
    summary: string;
    type: string;
    website: string;
  };
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
