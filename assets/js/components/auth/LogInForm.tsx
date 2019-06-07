import * as React from 'react';
import { Form, Formik } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';
// MUI Core
import { Button, Grid, TextField, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Contexts
import AuthDialogContext from '../../contexts/AuthDialogContext';
import SnackbarContext from '../../contexts/SnackbarContext';

interface IProps {
  handleSignUp: () => void;
}

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },
});

function LogInForm({ handleSignUp, history }: IProps & RouteComponentProps) {
  const classes = useStyles();

  const { hideAuthDialog } = React.useContext(AuthDialogContext);
  const { showSnackbar } = React.useContext(SnackbarContext);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const input = {
          email: values.email,
          redirect_to: window.location.href,
        };

        fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              setSubmitting(false);
              showSnackbar({
                message: 'Oops! Someting went wrong.',
                variant: 'error',
              });

              return;
            }

            resetForm();

            showSnackbar({
              message: `An email has been sent to ${values.email}`,
              variant: 'success',
            });

            hideAuthDialog();

            history.push(`welcome/${data.session_token}`);
          })
          .catch(() => {
            setSubmitting(false);
            showSnackbar({
              message: 'Oops! Someting went wrong.',
              variant: 'error',
            });
          });
      }}
      render={({ errors, isSubmitting, setFieldValue, touched, values }) => (
        <Form>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.email && touched.email)}
                fullWidth
                label="Email"
                onChange={(e) => setFieldValue('email', e.target.value.trim())}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                type="submit"
                variant="contained"
              >
                Continue with Email
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                <Grid item>
                  <Typography variant="body2">
                    Do not have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.link}
                    color="secondary"
                    onClick={handleSignUp}
                    variant="body2"
                  >
                    Create
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email()
          .required(),
      })}
    />
  );
}

export default withRouter(LogInForm);
