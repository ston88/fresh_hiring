import * as React from 'react';
// MUI Core
import { Box, Container, Grid, Typography } from '@material-ui/core';
// Components
import HomeHeader from '../components/home/HomeHeader';
import HomeOrganisationItem from '../components/home/HomeOrganisationItem';

function Home() {
  return (
    <React.Fragment>
      <HomeHeader />
      <Container maxWidth="lg">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Recently Launched</Typography>
              <Typography variant="body2">
                These raises were most recently launched on the ASX.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <HomeOrganisationItem />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <HomeOrganisationItem />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <HomeOrganisationItem />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Home;
