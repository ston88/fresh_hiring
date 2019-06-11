import React from 'react';
import moment from 'moment';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function CapitalRaiseState({ capitalRaise }: IProps) {
  const now = new Date().getTime();

  const distanceToBiddingOpen = new Date(capitalRaise.biddingOpen).getTime() - now;
  const distanceToBidsDue = new Date(capitalRaise.bidsDue).getTime() - now;
  const distanceToBiddingClose = new Date(capitalRaise.biddingClose).getTime() - now;

  if (distanceToBiddingOpen > 0) {
    return (
      <div>
        <Typography variant="caption">
          Biding Opens
        </Typography>
        <Typography variant="h6">
          {moment(new Date(capitalRaise.biddingOpen)).toNow(true)}
        </Typography>
      </div>
    );
  }

  if (distanceToBidsDue > 0) {
    if (capitalRaise.allocationAvailable) {
      return (
        <div>
          <Typography variant="caption">
            Bids Due
          </Typography>
          <Typography variant="h6">
            {moment(new Date(capitalRaise.bidsDue)).toNow(true)}
          </Typography>
        </div>
      );
    }

    return (
      <div>
        <Typography variant="caption">
          Estimated Bids Due
        </Typography>
        <Typography variant="h6">
          {moment(new Date(capitalRaise.bidsDue)).toNow(true)}
        </Typography>
      </div>
    );
  }

  if (distanceToBiddingClose > 0) {
    return (
      <div>
        <Typography variant="caption">
          Trading Resumes
        </Typography>
        <Typography variant="h6">
          {moment(new Date(capitalRaise.biddingClose)).toNow(true)}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Relisted
      </Typography>
      <Typography variant="h6">
        {moment(new Date(capitalRaise.biddingClose)).format('DD MMMM YYYY')}
      </Typography>
    </div>
  );
}

export default CapitalRaiseState;
