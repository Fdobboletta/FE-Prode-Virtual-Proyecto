import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export const maybeGetAuthToken = async () => {
  // logic to get user token
  const token = '';
  return token ? `Bearer ${token}` : '';
};

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_HTTP || '',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: httpLink,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
    },
  });
};
