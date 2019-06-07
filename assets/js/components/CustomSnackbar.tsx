import * as React from 'react';
import classNames from 'classnames';
// MUI Core
import {
  colors,
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent,
  Theme,
} from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Context
import SnackbarContext from '../contexts/SnackbarContext';

interface ICustomSnackbarContentProps {
  classes: {
    success: string;
    error: string;
    info: string;
    warning: string;
    icon: string;
    iconVariant: string;
    message: string;
  };
  message: string;
  onClose: () => void;
  variant: 'success' | 'error';
}

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: colors.green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: colors.amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function CustomSnackbarContent(props: ICustomSnackbarContentProps) {
  const { classes, message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="snackbar"
      message={
        <span id="snackbar" className={classes.message}>
          {variant === 'success' && (
            <Icon className={classNames(classes.icon, classes.iconVariant)}>
              check_circle
            </Icon>
          )}
          {variant === 'error' && (
            <Icon className={classNames(classes.icon, classes.iconVariant)}>
              error
            </Icon>
          )}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <Icon className={classes.icon}>close</Icon>
        </IconButton>,
      ]}
      {...other}
    />
  );
}

function CustomSnackbar() {
  const classes = useStyles();

  const { hideSnackbar, message, variant, visible } = React.useContext(
    SnackbarContext,
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={visible}
      autoHideDuration={6000}
      onClose={hideSnackbar}
    >
      <CustomSnackbarContent
        classes={classes}
        onClose={hideSnackbar}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}

export default CustomSnackbar;
