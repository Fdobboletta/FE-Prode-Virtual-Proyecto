import { Theme, createTheme } from '@mui/material/styles';

const theme: Theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#3f5372',
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
    caption: {
      fontSize: '0.75rem',
    },
    overline: {
      fontSize: '0.75rem',
    },
  },
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
    background: {
      paper: '#FAFAFA',
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
