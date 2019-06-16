import * as React from 'react';
import { Form, Formik } from 'formik';
import { Mutation } from 'react-apollo';
// MUI Core
import { Typography, Dialog, Grid, TextField, Button, DialogTitle } from '@material-ui/core';
// Types
import { ICapitalRaise } from '../../utils/types';
import { isInteger } from 'formik';
import NumberFormat from 'react-number-format';
// GraphQL
import { IMeQueryData } from '../../graphql/queries/MeQuery.graphql';
import PlaceBidMutation, {
  IPlaceBidMutationData,
  IPlaceBidMutationVariables,
} from '../../graphql/mutations/PlaceBidMutation.graphql';
// Context
import SnackbarContext from '../../contexts/SnackbarContext';
// Utils
import { getErrorMessage } from '../../utils/helper';
import { orange } from '@material-ui/core/colors';

interface IProps {
  capitalRaise: ICapitalRaise;
  meData: IMeQueryData;
}

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  user: IMeQueryData;
  organisation: ICapitalRaise;
  bidAmount: number;
}

function ConfirmDialog2(props: ConfirmDialogProps) {
  const { onClose, user, organisation, bidAmount, ...other } = props;
  const { showSnackbar } = React.useContext(SnackbarContext);

  const shares:number = bidAmount / organisation.price;
  const option:number = shares * organisation.optionsRatioNumerator / organisation.optionsRatioDenominator;

  return(
    <Mutation<IPlaceBidMutationData, IPlaceBidMutationVariables>
      mutation={PlaceBidMutation}
    >
      {(placeBid) => (
        <Formik
          initialValues={{
            amount_paid: bidAmount,
            shares_price: organisation.price,
            options_ratio_numerator: organisation.optionsRatioNumerator,
            options_ratio_denominator: organisation.optionsRatioDenominator,
            options_strike_price: organisation.optionsStrikePrice,
            user_id: user.me.id,
            organisation_id: organisation.id
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const variables = {
              bid: {
                amount_paid: bidAmount,
                shares_price: organisation.price,
                options_ratio_numerator: organisation.optionsRatioNumerator,
                options_ratio_denominator: organisation.optionsRatioDenominator,
                options_strike_price: organisation.optionsStrikePrice,
                user_id: user.me.id,
                organisation_id: organisation.id
              },
            };

            placeBid({ variables })
              .then((result) => {
                resetForm();

                showSnackbar({
                  message: `Bid successful - Receiving ${shares} shares and ${option} options.`,
                  variant: 'success',
                });
              })
              .catch((error) => {
                setSubmitting(false);
                showSnackbar({
                  message: getErrorMessage(error),
                  variant: 'error',
                });
              });
          }}
          render={({
            errors,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => (
            <Dialog maxWidth="sm" fullWidth={true} onClose={onClose} aria-labelledby="simple-dialog-title" {...other} >
              <DialogTitle id="dialog">Confirm Bid</DialogTitle>
              <Form>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        <Typography align="center">
                          Proceed with the bid?<br />
                          Amount paid: {bidAmount}<br />
                          Shares to receive: {shares}<br />
                          Option to receive: {option}<br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        <Button
                          color="secondary"
                          disabled={isSubmitting}
                          fullWidth
                          type="submit"
                          variant="contained"
                        >
                          Place Bid
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          color="secondary"
                          disabled={isSubmitting}
                          fullWidth
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Dialog>
          )}
        />
      )}
    </Mutation>
  );
}

function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, ...other } = props;

  return (
    <Dialog maxWidth="sm" fullWidth={true} onClose={onClose} aria-labelledby="simple-dialog-title" {...other} >
      <DialogTitle id="dialog">Confirm Bid</DialogTitle>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center">
            Proceed with the bid?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            <Button variant="contained" color="primary" onClick={onClose}>
              Confirm
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">            
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );

}

function OrganisationBiddingForm({ capitalRaise, meData }: IProps) {
  const printSharesReceived = (value:number) => {
    return value.toString() + " shares received.";
  }

  const printOptionsReceived = (value:number) => {
    return value.toString() + " options received.";
  }

  const [openDialog, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [sharesReceived, setSharesReceived] = React.useState(printSharesReceived(0));
  const [optionsReceived, setOptionsReceived] = React.useState(printOptionsReceived(0));
  const [errorMessage, setErrorMessage] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  function calculateShareAndOption (event: React.ChangeEvent, capitalRaise: ICapitalRaise) {
    const input:string = event.target.value;
    
    setBtnDisabled(true); // Enable the place bid button
    setErrorMessage("");
    var value:number = parseFloat(input);
    setAmount(value);

    if (input.trim() === "")
    {
      setSharesReceived(printSharesReceived(0));
      setOptionsReceived(printOptionsReceived(0));
    }
    else if (!isNaN(value)) {
      var numOfShares:number = value / capitalRaise.price;
      var numOfOptions:number = numOfShares * capitalRaise.optionsRatioNumerator / capitalRaise.optionsRatioDenominator;        

      setSharesReceived(printSharesReceived(numOfShares));
      setOptionsReceived(printOptionsReceived(numOfOptions));

      if (!Number.isInteger(numOfShares)) {
        var suggestedAmount:number = Math.floor(numOfShares) * capitalRaise.price;
        if (suggestedAmount === 0)
          suggestedAmount = 1 * capitalRaise.price;
        const message = "Cannot bid fractional shares. Do you wanna bid " + suggestedAmount + " instead?";
        setErrorMessage(message);
      }
      else {
        setBtnDisabled(false);
      }  
    }
    else {
      const errorMessage = "invalid amount!";
      setSharesReceived(errorMessage);
      setOptionsReceived(errorMessage);
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography variant="body1" align="right">
          Hi {meData.me.id} - {capitalRaise.id} Please put the amount of bid:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField id="totalAmount" onChange={(event) => calculateShareAndOption(event, capitalRaise)}>{amount}</TextField>
      </Grid>
      <Grid item xs={6}>
        <Typography id="shareLabel" variant="body1" align="center">
          {sharesReceived}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography id="optionLabel" variant="body1" align="center">
          {optionsReceived}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="error" align="center">
          {errorMessage}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          <Button variant="contained" color="primary" onClick={handleOpen} disabled={btnDisabled}>
            Place Bid
          </Button>
        </Typography>
        {/* <ConfirmDialog open={openDialog} onClose={handleClose} /> */}
        <ConfirmDialog2 open={openDialog} onClose={handleClose} organisation={capitalRaise} user={meData} bidAmount={amount} />
      </Grid>
    </Grid>
  );
}

export default OrganisationBiddingForm;
