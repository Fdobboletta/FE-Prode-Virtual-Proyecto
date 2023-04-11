import GlobalStyles from './styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './graphql/utils';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/system';
import theme from './styles/theme';

import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={createApolloClient()}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
