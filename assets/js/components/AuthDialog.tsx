import * as React from 'react';
import { Form, Formik, FormikBag, FormikActions, FormikProps } from 'formik';
import * as yup from 'yup';
// MUI Core
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Theme,
} from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Contexts
import AuthDialogContext from '../contexts/AuthDialogContext';

const useStyles = makeStyles((theme: Theme) => ({
  dialogContentRoot: {
    padding: theme.spacing(3),
  },
  logoContainer: {
    display: 'flex',
  },
}));

function AuthDialog() {
  const classes = useStyles();

  const { hideAuthDialog, visible } = React.useContext(AuthDialogContext);

  function handleSubmit() {}

  return (
    <Dialog keepMounted maxWidth="xs" onClose={hideAuthDialog} open={visible}>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={handleSubmit}
          render={({
            errors,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => (
            <Form>
              <Grid container justify="center" spacing={3}>
                <Grid item className={classes.logoContainer}>
                  <Box my={3}>
                    <img
                      alt="Fresh Equities"
                      height="32"
                      src="images/logo.svg"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(errors.email && touched.email)}
                    fullWidth
                    label="Email"
                    onChange={(e) => setFieldValue('email', e.target.value)}
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
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
