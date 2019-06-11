import React from 'react';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function OptionsExpiration({ capitalRaise }: IProps) {
  if (capitalRaise.optionsExpiration) {
    return (
      <div>
        <Typography variant="caption">
          Options Expire
        </Typography>
        <Typography variant="h6">
          {`${capitalRaise.optionsExpiration} months`}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">
        Options Expire
      </Typography>
      <Typography variant="h6">
        -
      </Typography>
    </div>
  );
}

export default OptionsExpiration;
