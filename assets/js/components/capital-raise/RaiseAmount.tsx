import React from 'react';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Utils
import { formatMoney } from '../../utils/helper';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function RaiseAmount({ capitalRaise }: IProps) {
  function isTradingResumed() {
    const distanceToBiddingClose = new Date(capitalRaise.biddingClose).getTime() - new Date().getTime();

    return distanceToBiddingClose < 0;
  }

  // Check if the capital raise is done
  if (isTradingResumed()) {
    return (
      <div>
        <Typography variant="caption">
          Raised
        </Typography>
        <Typography variant="h6">
          -
        </Typography>
      </div>
    );
  }

  // Check if the value is available
  if (capitalRaise.maxAmount && capitalRaise.minAmount) {
    // Check if the maximum and minimum amount are equal
    if (capitalRaise.maxAmount === capitalRaise.minAmount) {
      // Return 1 value if the amounts are equal
      return (
        <div>
          <Typography variant="caption">
            Raising
          </Typography>
          <Typography variant="h6">
            {formatMoney(capitalRaise.maxAmount, '$')}
          </Typography>
        </div>
      );
    }

    // Return a range if the amounts are not equal
    return (
      <div>
        <Typography variant="caption">
          Raising
        </Typography>
        <Typography variant="h6">
          {`${formatMoney(capitalRaise.minAmount, '$')} - ${formatMoney(capitalRaise.maxAmount, '$')}`}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Raising
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default RaiseAmount;
