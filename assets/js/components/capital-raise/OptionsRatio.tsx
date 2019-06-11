import React from 'react';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function OptionsRatio({ capitalRaise }: IProps) {
  if (capitalRaise.optionsRatioNumerator && capitalRaise.optionsRatioDenominator) {
    return (
      <div>
        <Typography variant="caption">
          Options
        </Typography>
        <Typography variant="h6">
          {`${capitalRaise.optionsRatioNumerator} for ${capitalRaise.optionsRatioDenominator}`}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Options
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default OptionsRatio;
