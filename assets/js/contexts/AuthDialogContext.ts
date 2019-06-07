import * as React from 'react';

interface IAuthDialogContext {
  hideAuthDialog: () => void;
  showAuthDialog: () => void;
  visible: boolean;
}

const AuthDialogContext = React.createContext<IAuthDialogContext>({
  hideAuthDialog: () => {},
  showAuthDialog: () => {},
  visible: false,
});

export default AuthDialogContext;
