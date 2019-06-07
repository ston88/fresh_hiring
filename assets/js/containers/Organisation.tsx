import * as React from 'react';
import { Query } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// MUI Core
import { Box, Container, Grid, Hidden } from '@material-ui/core';
// Components
import OrganisationHeader from '../components/organisation/OrganisationHeader';
import OrganisationInformation from '../components/organisation/OrganisationInformation';
import OrganisationLiveCapitalRaise from '../components/organisation/OrganisationLiveCapitalRaise';
import OrganisationStickyBidCard from '../components/organisation/OrganisationStickyBidCard';
// GraphQL
import CapitalRaiseQuery, {
  ICapitalRaiseQueryData,
  ICapitalRaiseQueryVariables,
} from '../graphql/queries/CapitalRaiseQuery.graphql';

function Organisation({
  match,
}: RouteComponentProps<{ capitalRaiseId: string }>) {
  const { capitalRaiseId } = match.params;

  return (
    <Query<ICapitalRaiseQueryData, ICapitalRaiseQueryVariables>
      fetchPolicy="cache-and-network"
      query={CapitalRaiseQuery}
      variables={{ id: capitalRaiseId }}
    >
      {({ data }) => {
        if (data && data.capitalRaise) {
          const { capitalRaise } = data;

          return (
            <React.Fragment>
              <OrganisationHeader capitalRaise={capitalRaise} />
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

        return null;
      }}
    </Query>
  );
}

export default withRouter(Organisation);
