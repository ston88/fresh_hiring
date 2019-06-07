import * as React from 'react';
// MUI Core
import { Box, Container, Grid, Typography, Theme } from '@material-ui/core';
// MUI Styles
import { useTheme } from '@material-ui/styles';

function OrganisationHeader() {
  const theme = useTheme<Theme>();

  return (
    <Box bgcolor={theme.palette.common.white}>
      <Container maxWidth="lg">
        <Box px={3} py={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Logo
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4">Company Name</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="body2">
                    ASX:CMP
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="secondary" variant="body2">
                    Financial Exchanges &amp; Data
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
