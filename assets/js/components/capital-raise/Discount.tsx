import React from 'react';
import NumberFormat from 'react-number-format';
// MUI Core
import Typography from '@material-ui/core/Typography';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function Discount({ capitalRaise }: IProps) {
  function isTradingResumed() {
    const distanceToBiddingClose =
      new Date(capitalRaise.biddingClose).getTime() - new Date().getTime();

    return distanceToBiddingClose < 0;
  }

  if (isTradingResumed()) {
    if (
      capitalRaise.allocationAvailable &&
      capitalRaise.haltPrice &&
      capitalRaise.price
    ) {
      if (capitalRaise.price < capitalRaise.haltPrice) {
        return (
          <div>
            <Typography variant="caption">Discount to Close</Typography>
            <Typography variant="h6">
              <NumberFormat
                decimalScale={2}
                displayType="text"
                fixedDecimalScale
                suffix="%"
                thousandSeparator=","
                value={
                  (Math.abs(capitalRaise.haltPrice - capitalRaise.price) /
                    capitalRaise.haltPrice) *
                  100
                }
              />
            </Typography>
          </div>
        );
      }

      return (
        <div>
          <Typography variant="caption">Premium to Close</Typography>
          <Typography variant="h6">
            <NumberFormat
              decimalScale={2}
              displayType="text"
              fixedDecimalScale
              suffix="%"
              thousandSeparator=","
              value={
                (Math.abs(capitalRaise.haltPrice - capitalRaise.price) /
                  capitalRaise.haltPrice) *
                100
              }
            />
          </Typography>
        </div>
      );
    }
  }

  return (
    <div>
      <Typography variant="caption">Discount to Close</Typography>
      <Typography variant="h6">-</Typography>
    </div>
  );
}

export default Discount;
