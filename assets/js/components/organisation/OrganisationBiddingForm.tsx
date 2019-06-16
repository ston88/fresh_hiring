import * as React from 'react';
import { Form, Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// MUI Core
import { Typography, Dialog, Grid, TextField, Button, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  warning: {
    color: 'orange'
  },
});

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

function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, user, organisation, bidAmount, ...other } = props;
  const { showSnackbar } = React.useContext(SnackbarContext);

  const shares:number = Math.floor(bidAmount / organisation.price);
  const option:number = Math.floor(shares * organisation.optionsRatioNumerator / organisation.optionsRatioDenominator);

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
                  message: `Bid successful! Bid Summary -> Amount paid $${bidAmount}, receiving ${shares} shares and ${option} options.`,
                  variant: 'success',
                });

                onClose();

                if (result && result.data && result.data.placeBid) {
                  // history.push(`/bidsummary/${result.data.placeBid.id}`);
                }
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
                      <Grid item xs={4} />
                      <Grid item xs={4}>
                        <Typography align="justify">
                          Proceed with the bid?<br />
                          Amount paid: <b>${bidAmount}</b><br />
                          Shares received: <b>{shares}</b><br />
                          Option received: <b>{option}</b><br />
                        </Typography>
                      </Grid>
                      <Grid item xs={4} />
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
  const [warningMessage, setWarningMessage] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  const styles = useStyles();

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
    setWarningMessage("");
    var value:number = parseFloat(input);
    setAmount(value);

    if (input.trim() === "" || value == 0)
    {
      setSharesReceived(printSharesReceived(0));
      setOptionsReceived(printOptionsReceived(0));
    }
    else if (!isNaN(value)) {
      var message:string = "";
      var numOfShares:number = value / capitalRaise.price;
      var numOfOptions:number = numOfShares * capitalRaise.optionsRatioNumerator / capitalRaise.optionsRatioDenominator;        

      setSharesReceived(printSharesReceived(numOfShares));
      setOptionsReceived(printOptionsReceived(numOfOptions));

      if (!Number.isInteger(numOfShares)) {
        const shares = Math.floor(numOfShares);
        const suggestedAmount:number = shares * capitalRaise.price;

        if (suggestedAmount === 0) {
          setErrorMessage("Bid invalid, number of shares received is 0!");
        }
        else {
          setWarningMessage(`
            Cannot bid fractional shares.
            The amount of bid will automatically be round down to $${suggestedAmount}
            and you will receive ${shares} shares.`);
          setBtnDisabled(false);  
        }

        setAmount(suggestedAmount);
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
          Please put the amount of bid:
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
        <Typography 
          classes={{ root: styles.warning }} 
          align="center"
        >
          {warningMessage}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          <Button variant="contained" color="primary" onClick={handleOpen} disabled={btnDisabled}>
            Place Bid
          </Button>
        </Typography>
        <ConfirmDialog open={openDialog} onClose={handleClose} organisation={capitalRaise} user={meData} bidAmount={amount} />
      </Grid>
    </Grid>
  );
}

export default OrganisationBiddingForm;
