import * as React from 'react';
import NumberFormat from 'react-number-format';
// MUI Core
import { Divider, Grid, Typography } from '@material-ui/core';
// Components
import CapitalRaiseState from '../capital-raise/CapitalRaiseState';
import Discount from '../capital-raise/Discount';
import HaltPrice from '../capital-raise/HaltPrice';
import MarketCap from '../capital-raise/MarketCap';
import OfferPrice from '../capital-raise/OfferPrice';
import OptionsExpiration from '../capital-raise/OptionsExpiration';
import OptionsRatio from '../capital-raise/OptionsRatio';
import OptionsStrikePrice from '../capital-raise/OptionsStrikePrice';
import RaiseAmount from '../capital-raise/RaiseAmount';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

function OrganisationLiveCapitalRaise({ capitalRaise }: IProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Live Capital Raise</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Offer Price */}
          <Grid item xs={12} sm={6} md={4}>
            <OfferPrice capitalRaise={capitalRaise} />
          </Grid>

          {/* Discount */}
          <Grid item xs={12} sm={6} md={4}>
            <Discount capitalRaise={capitalRaise} />
          </Grid>

          {/* Raise Amount */}
          <Grid item xs={12} sm={6} md={4}>
            <RaiseAmount capitalRaise={capitalRaise} />
          </Grid>

          {/* Options */}
          {capitalRaise.optionsAvailable && (
            <React.Fragment>
              {/* Offer Price */}
              <Grid item xs={12} sm={6} md={4}>
                <OptionsRatio capitalRaise={capitalRaise} />
              </Grid>

              {/* Discount */}
              <Grid item xs={12} sm={6} md={4}>
                <OptionsStrikePrice capitalRaise={capitalRaise} />
              </Grid>

              {/* Raise Amount */}
              <Grid item xs={12} sm={6} md={4}>
                <OptionsExpiration capitalRaise={capitalRaise} />
              </Grid>
            </React.Fragment>
          )}

          {/* Halt Price */}
          <Grid item xs={12} sm={6} md={4}>
            <HaltPrice capitalRaise={capitalRaise} />
          </Grid>

          {/* Market Cap */}
          <Grid item xs={12} sm={6} md={4}>
            <MarketCap capitalRaise={capitalRaise} />
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6} md={4}>
            <CapitalRaiseState capitalRaise={capitalRaise} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
}

export default OrganisationLiveCapitalRaise;
