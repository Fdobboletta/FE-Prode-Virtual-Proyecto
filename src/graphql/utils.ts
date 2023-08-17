import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation,
  from,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

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
      return response;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions?.code === 'UNAUTHENTICATED') {
          // Handle token expiration, e.g., redirect to login page
          window.location.replace('/login');
        } else if (error.message === 'Authentication required') {
          // Handle authentication required error
          // For example, you might want to show a message to the user or perform other actions
          console.error('Authentication required', error);
          window.location.replace('/login');
        }
      }
    }
    if (networkError) {
      // Handle network errors as needed
      console.error('Network error', networkError);
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: from([errorLink, authLink, httpLink]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
    },
  });
};
