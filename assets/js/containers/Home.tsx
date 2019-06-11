import * as React from 'react';
import { ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
// MUI Core
import { Box, Container, Grid, Typography } from '@material-ui/core';
// Components
import HomeHeader from '../components/home/HomeHeader';
import HomeOrganisationItem from '../components/home/HomeOrganisationItem';
// GraphQL
import CapitalRaisesListQuery, {
  ICapitalRaisesListQueryData,
  ICapitalRaisesListQueryVariables,
} from '../graphql/queries/CapitalRaisesListQuery.graphql';

function Home() {
  function renderContent({
    data,
    error,
    loading,
  }: {
    data?: ICapitalRaisesListQueryData;
    error?: ApolloError;
    loading: boolean;
  }) {
    if (data && data.capitalRaisesList) {
      if (data.capitalRaisesList.edges.length === 0) {
        return (
          <Typography variant="body2">Sorry, we could not find the capital raise you are looking for.</Typography>
        );
      }

      return (
        <Grid container spacing={2}>
          {data.capitalRaisesList.edges.map(({ node }) => (
            <Grid key={node.id} item xs={12} sm={6} md={4} lg={3}>
              <HomeOrganisationItem capitalRaise={node} />
            </Grid>
          ))}
        </Grid>
      );
    }

    if (error) {
      return (
        <Typography variant="body2">Oops! Something went wrong.</Typography>
      );
    }

    if (loading) {
      return null;
    }
  }

  return (
    <Query<ICapitalRaisesListQueryData, ICapitalRaisesListQueryVariables>
      fetchPolicy="cache-and-network"
      query={CapitalRaisesListQuery}
      variables={{ first: 10 }}
    >
      {({ data, error, loading, refetch }) => (
        <React.Fragment>
          <HomeHeader
            applySearch={(value: string) =>
              refetch({
                options: { filters: [{ key: 'search', value: `%${value}%` }] },
              })
            }
          />
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
                  {renderContent({ data, error, loading })}
                </Grid>
              </Grid>
            </Box>
          </Container>
        </React.Fragment>
      )}
    </Query>
  );
}

export default Home;
