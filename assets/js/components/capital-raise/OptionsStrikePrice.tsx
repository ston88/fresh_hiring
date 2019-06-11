import React from 'react';
import NumberFormat from 'react-number-format';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function OptionsStrikePrice({ capitalRaise }: IProps) {
  if (capitalRaise.optionsStrikePrice) {
    return (
      <div>
        <Typography variant="caption">
          Options Strike Price
        </Typography>
        <Typography variant="h6">
          <NumberFormat
            decimalScale={4}
            displayType="text"
            fixedDecimalScale
            prefix="$"
            thousandSeparator=","
            value={capitalRaise.optionsStrikePrice}
          />
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Options Strike Price
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default OptionsStrikePrice;
