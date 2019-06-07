import * as React from 'react';
// Components
import AuthDialog from '../components/AuthDialog';
import Nav from '../components/Nav';
// Contexts
import ContextProvider from '../contexts/ContextProvider';

function Root() {
  return (
    <ContextProvider>
      <AuthDialog />
      <Nav />
    </ContextProvider>
  );
}

export default Root;
