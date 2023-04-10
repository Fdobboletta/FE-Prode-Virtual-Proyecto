import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
});

export default theme;
