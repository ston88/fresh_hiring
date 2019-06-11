import React from 'react';
import NumberFormat from 'react-number-format';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function HaltPrice({ capitalRaise }: IProps) {
  if (capitalRaise.haltPrice) {
    return (
      <div>
        <Typography variant="caption">
          Price at Close
        </Typography>
        <Typography variant="h6">
          <NumberFormat
            decimalScale={4}
            displayType="text"
            fixedDecimalScale
            prefix="$"
            thousandSeparator=","
            value={capitalRaise.haltPrice}
          />
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Price at Close
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default HaltPrice;
