import * as React from 'react';
// Contexts
import AuthDialogContext from './AuthDialogContext';
import SnackbarContext from './SnackbarContext';

interface IAuthDialogContext {
  hideAuthDialog: () => void;
  showAuthDialog: () => void;
  visible: boolean;
}

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

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [authDialog, setAuthDialog] = React.useState<IAuthDialogContext>({
    hideAuthDialog,
    showAuthDialog,
    visible: false,
  });

  const [snackbar, setSnackbar] = React.useState<ISnackbarContext>({
    hideSnackbar,
    message: '',
    showSnackbar,
    variant: 'success',
    visible: false,
  });

  function hideAuthDialog() {
    setAuthDialog((prevAuthDialog) => ({
      ...prevAuthDialog,
      visible: false,
    }));
  }

  function hideSnackbar() {
    setSnackbar((prevSnackbar) => ({
      ...prevSnackbar,
      visible: false,
    }));
  }

  function showAuthDialog() {
    setAuthDialog((prevAuthDialog) => ({
      ...prevAuthDialog,
      visible: false,
    }));
  }

  function showSnackbar({
    message,
    variant,
  }: {
    message: string;
    variant: 'success' | 'error';
  }) {
    setSnackbar((prevSnackbar) => ({
      ...prevSnackbar,
      message,
      variant,
      visible: true,
    }));
  }

  return (
    <AuthDialogContext.Provider value={authDialog}>
      <SnackbarContext.Provider value={snackbar}>
        {children}
      </SnackbarContext.Provider>
    </AuthDialogContext.Provider>
  );
}

export default ContextProvider;
