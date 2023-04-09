import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const maybeGetAuthToken = async () => {
  // logic to get user token
  const token = '';
  return token ? `Bearer ${token}` : '';
};

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_HTTP || '',
  });

  const authLink = setContext(async () => ({
    headers: { authorization: await maybeGetAuthToken() },
  }));

  console.log('AutLink', authLink);
  console.log('httpLink', httpLink);

  // const httpAuthLink = authLink.concat(httpLink as unknown as ApolloLink);

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
