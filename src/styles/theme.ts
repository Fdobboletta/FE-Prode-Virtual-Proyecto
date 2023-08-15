import { Theme, createTheme } from '@mui/material/styles';

const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#355430',
      light: '#78887E',
      dark: '#666A66',
    },
    success: {
      main: '#4c9a4d',
    },
    warning: {
      main: '#ca8a15',
    },
    error: {
      main: '#f44336',
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
