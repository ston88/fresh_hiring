import * as React from 'react';
import { Query } from 'react-apollo';
// MUI Core
import { Theme, Typography, Box, Container, Grid, Hidden } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Types
import { ICapitalRaise } from '../../utils/types';
// Components
import OrganisationBiddingForm from '../organisation/OrganisationBiddingForm';
// GraphQL
import MeQuery, { IMeQueryData } from '../../graphql/queries/MeQuery.graphql';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.common.white,
    border: `solid 1px ${theme.palette.divider}`,
    borderRadius: 4,
    padding: theme.spacing(3),
    position: 'sticky',
    top: theme.spacing(3),
  },
}));

interface IProps {
  capitalRaise: ICapitalRaise;
}

function OrganisationStickyBidCard({ capitalRaise }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Query<IMeQueryData, {}>
        fetchPolicy="cache-and-network"
        query={MeQuery}
      >
        {({ data }) => {
          if (data && data.me) {
            return (
              <OrganisationBiddingForm capitalRaise={capitalRaise} meData={data} />
            );
          }
        
          return (
            <Typography color="error">
              Please sign in to bid!
            </Typography>
          );
        }}
      </Query>      
    </div>
  );
}

export default OrganisationStickyBidCard;
