import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetPowerBiAccessTokenQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetPowerBiAccessTokenQuery = {
  __typename?: 'Query';
  getPowerBiAccessToken: string;
};

export const GetPowerBiAccessTokenDocument = /*#__PURE__*/ gql`
  query GetPowerBiAccessToken {
    getPowerBiAccessToken
  }
`;

/**
 * __useGetPowerBiAccessTokenQuery__
 *
 * To run a query within a React component, call `useGetPowerBiAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPowerBiAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPowerBiAccessTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPowerBiAccessTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPowerBiAccessTokenQuery,
    GetPowerBiAccessTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPowerBiAccessTokenQuery,
    GetPowerBiAccessTokenQueryVariables
  >(GetPowerBiAccessTokenDocument, options);
}
export function useGetPowerBiAccessTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPowerBiAccessTokenQuery,
    GetPowerBiAccessTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPowerBiAccessTokenQuery,
    GetPowerBiAccessTokenQueryVariables
  >(GetPowerBiAccessTokenDocument, options);
}
export type GetPowerBiAccessTokenQueryHookResult = ReturnType<
  typeof useGetPowerBiAccessTokenQuery
>;
export type GetPowerBiAccessTokenLazyQueryHookResult = ReturnType<
  typeof useGetPowerBiAccessTokenLazyQuery
>;
export type GetPowerBiAccessTokenQueryResult = Apollo.QueryResult<
  GetPowerBiAccessTokenQuery,
  GetPowerBiAccessTokenQueryVariables
>;
