import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetUserMpAccessTokenQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetUserMpAccessTokenQuery = {
  __typename?: 'Query';
  getUserMpAccessToken?: string | null;
};

export const GetUserMpAccessTokenDocument = /*#__PURE__*/ gql`
  query GetUserMpAccessToken {
    getUserMpAccessToken
  }
`;

/**
 * __useGetUserMpAccessTokenQuery__
 *
 * To run a query within a React component, call `useGetUserMpAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMpAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMpAccessTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserMpAccessTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserMpAccessTokenQuery,
    GetUserMpAccessTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUserMpAccessTokenQuery,
    GetUserMpAccessTokenQueryVariables
  >(GetUserMpAccessTokenDocument, options);
}
export function useGetUserMpAccessTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserMpAccessTokenQuery,
    GetUserMpAccessTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserMpAccessTokenQuery,
    GetUserMpAccessTokenQueryVariables
  >(GetUserMpAccessTokenDocument, options);
}
export type GetUserMpAccessTokenQueryHookResult = ReturnType<
  typeof useGetUserMpAccessTokenQuery
>;
export type GetUserMpAccessTokenLazyQueryHookResult = ReturnType<
  typeof useGetUserMpAccessTokenLazyQuery
>;
export type GetUserMpAccessTokenQueryResult = Apollo.QueryResult<
  GetUserMpAccessTokenQuery,
  GetUserMpAccessTokenQueryVariables
>;
