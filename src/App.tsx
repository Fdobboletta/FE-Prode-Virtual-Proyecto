import GlobalStyles from './styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './graphql/utils';
import { TestGraphql } from './graphql/TestGraphql';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={createApolloClient()}>
        <TestGraphql />
      </ApolloProvider>
    </>
  );
};

export default App;
