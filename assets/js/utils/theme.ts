import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#42596D',
      main: '#173042',
      dark: '#00071C',
    },
    secondary: {
      light: '#AEDF6D',
      main: '#7CAD3E',
      dark: '#4C7D07',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none !important',
      },
      containedPrimary: {
        color: '#FFFFFF',
      },
      containedSecondary: {
        color: '#FFFFFF',
      },
      root: {
        textTransform: 'none',
      },
    },
  },
});

export default theme;
