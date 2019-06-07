import * as React from 'react';
import { Form, Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';
// MUI Core
import { Button, Grid, TextField } from '@material-ui/core';
// Contexts
import AuthDialogContext from '../contexts/AuthDialogContext';
import SnackbarContext from '../contexts/SnackbarContext';
// GraphQL
import CreateUserMutation, {
  ICreateUserMutationData,
  ICreateUserMutationVariables,
} from '../graphql/mutations/CreateUserMutation.graphql';
// Utils
import { getErrorMessage } from '../utils/helper';

interface IProps {
  handleCancel: () => void;
}

function SignUpForm({ handleCancel, history }: IProps & RouteComponentProps) {
  const { hideAuthDialog } = React.useContext(AuthDialogContext);
  const { showSnackbar } = React.useContext(SnackbarContext);

  return (
    <Mutation<ICreateUserMutationData, ICreateUserMutationVariables>
      mutation={CreateUserMutation}
    >
      {(createUser) => (
        <Formik
          initialValues={{
            email: '',
            name: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            const variables = {
              redirectTo: window.location.href,
              user: {
                email: values.email,
                name: values.name.trim(),
              },
            };

            createUser({ variables })
              .then((result) => {
                setSubmitting(false);
                showSnackbar({
                  message: `An email has been sent to ${values.email}`,
                  variant: 'success',
                });

                hideAuthDialog();

                if (result && result.data && result.data.createUser) {
                  history.push(`welcome/${result.data.createUser.email}`);
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
            <Form>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(errors.email && touched.email)}
                        fullWidth
                        label="Email"
                        onChange={(e) =>
                          setFieldValue('email', e.target.value.trim())
                        }
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(errors.name && touched.name)}
                        fullWidth
                        label="Name"
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        variant="outlined"
                      />
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
                        Create Account
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        color="secondary"
                        disabled={isSubmitting}
                        fullWidth
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
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
            name: yup
              .string()
              .trim()
              .required(),
          })}
        />
      )}
    </Mutation>
  );
}

export default withRouter(SignUpForm);
