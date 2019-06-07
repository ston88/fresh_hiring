import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// MUI Core
import { Box, Container, Grid, Hidden } from '@material-ui/core';
// Components
import OrganisationHeader from '../components/OrganisationHeader';
import OrganisationInformation from '../components/OrganisationInformation';
import OrganisationLiveCapitalRaise from '../components/OrganisationLiveCapitalRaise';
import OrganisationStickyBidCard from '../components/OrganisationStickyBidCard';

function Organisation({
  match,
}: RouteComponentProps<{ listingKey: string; marketKey: string }>) {
  const { listingKey, marketKey } = match.params;

  return (
    <React.Fragment>
      <OrganisationHeader />
      <Container maxWidth="lg">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <OrganisationLiveCapitalRaise />
                </Grid>
                <Grid item xs={12}>
                  <OrganisationInformation />
                </Grid>
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <OrganisationStickyBidCard />
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(Organisation);
