import 'phoenix_html';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// MUI Core
import CssBaseline from '@material-ui/core/CssBaseline';
// MUI Styles
import { ThemeProvider } from '@material-ui/styles';
// Containers
import Root from './containers/Root';
// Utils
import theme from './utils/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Root />
  </ThemeProvider>,
  document.getElementById('react-app'),
);
