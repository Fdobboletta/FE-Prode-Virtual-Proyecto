import GlobalStyles from './styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './graphql/utils';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from './styles/theme-provider';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
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
