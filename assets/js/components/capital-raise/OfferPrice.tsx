import React from 'react';
import NumberFormat from 'react-number-format';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function OfferPrice({ capitalRaise }: IProps) {
  function isTradingResumed() {
    const distanceToBiddingClose = new Date(capitalRaise.biddingClose).getTime() - new Date().getTime();

    return distanceToBiddingClose < 0;
  }

  if (isTradingResumed()) {
    if (capitalRaise.allocationAvailable && capitalRaise.price) {
      return (
        <div>
          <Typography variant="caption">
            Offer Price
          </Typography>
          <Typography variant="h6">
            <NumberFormat
              decimalScale={4}
              displayType="text"
              fixedDecimalScale
              prefix="$"
              thousandSeparator=","
              value={capitalRaise.price}
            />
          </Typography>
        </div>
      );
    }
  }

  return (
    <div>
      <Typography variant="caption">
        Offer Price
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default OfferPrice;
