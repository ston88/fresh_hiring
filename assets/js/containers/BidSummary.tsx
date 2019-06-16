import * as React from 'react';
import { Query } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// MUI Core
import { Box, Container, Grid, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// GraphQL
import GetBidQuery, { IGetBidQueryData, IGetBidQueryVariables } from '../graphql/queries/GetBidQuery.graphql';

const useStyles = makeStyles({
  iconContainer: {
    display: 'flex',
  },
});

function BidSummary({ match, ...props }: RouteComponentProps<{ bidId: string }>) {
  const classes = useStyles();

  const { bidId } = match.params;

  return (
    <Query<IGetBidQueryData, IGetBidQueryVariables>
        fetchPolicy="cache-and-network"
        query={GetBidQuery}
        variables={{ id: bidId }}
      >
        {({ data }) => {
          if (data && data.getBid) {
            const shares: number = Math.floor(data.getBid.amount_paid);
            const options: number = Math.floor(shares * data.getBid.options_ratio_numerator / data.getBid.options_ratio_denominator); 

            return (
              <Grid container spacing={3}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Typography align="justify">
                    Bidding Summary:<br />
                    Amount Bid: <b>${data.getBid.amount_paid}</b><br />
                    Shares Received: <b>{shares}</b>
                    Options Received: <b>{options}</b>
                  </Typography>
                </Grid>
                <Grid item xs={4} />
              </Grid>
            );
          }
        
          return (
            <Typography color="error">
              Could not find Bidding Summary!
            </Typography>
          );
        }}
      </Query>      
  );
}

export default BidSummary;
