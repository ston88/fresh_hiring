import * as React from 'react';

interface ISnackbarContext {
  hideSnackbar: () => void;
  message: string;
  showSnackbar: ({
    message,
    variant,
  }: {
    message: string;
    variant: 'success' | 'error';
  }) => void;
  variant: 'success' | 'error';
  visible: boolean;
}

const SnackbarContext = React.createContext<ISnackbarContext>({
  hideSnackbar: () => {},
  message: '',
  showSnackbar: ({
    message,
    variant,
  }) => {},
  variant: 'success',
  visible: false,
});

export default SnackbarContext;
