import * as React from 'react';
// MUI Core
import { Theme, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';

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

function OrganisationStickyBidCard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography color="error">Implement bidding here...</Typography>
    </div>
  );
}

export default OrganisationStickyBidCard;
