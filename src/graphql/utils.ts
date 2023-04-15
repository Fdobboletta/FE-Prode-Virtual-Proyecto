import jwt from 'jsonwebtoken';
import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation,
} from '@apollo/client';

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_HTTP || '',
  });

  const authLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    const token = localStorage.getItem('authToken');

    operation.setContext(
      ({ headers }: { headers: Record<string, string> }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      })
    );

    return forward(operation).map((response: FetchResult) => {
      // You can modify the response here if needed.
      return response;
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: ApolloLink.from([authLink, httpLink]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
    },
  });
};
