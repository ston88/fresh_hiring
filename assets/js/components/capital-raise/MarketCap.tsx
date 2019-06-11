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

function MarketCap({ capitalRaise }: IProps) {
  if (capitalRaise.marketCap) {
    return (
      <div>
        <Typography variant="caption">
          Market Cap at Close
        </Typography>
        <Typography variant="h6">
          {formatMoney(capitalRaise.marketCap, '$')}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Market Cap at Close
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default MarketCap;
