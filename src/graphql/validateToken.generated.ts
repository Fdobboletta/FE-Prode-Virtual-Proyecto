import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type ValidateTokenQueryVariables = Types.Exact<{
  token: Types.Scalars['String'];
  isResetPassword: Types.Scalars['Boolean'];
}>;

export type ValidateTokenQuery = {
  __typename?: 'Query';
  validateToken: boolean;
};

export const ValidateTokenDocument = /*#__PURE__*/ gql`
  query ValidateToken($token: String!, $isResetPassword: Boolean!) {
    validateToken(token: $token, isResetPassword: $isResetPassword)
  }
`;

/**
 * __useValidateTokenQuery__
 *
 * To run a query within a React component, call `useValidateTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *      isResetPassword: // value for 'isResetPassword'
 *   },
 * });
 */
export function useValidateTokenQuery(
  baseOptions: Apollo.QueryHookOptions<
    ValidateTokenQuery,
    ValidateTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(
    ValidateTokenDocument,
    options
  );
}
export function useValidateTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidateTokenQuery,
    ValidateTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(
    ValidateTokenDocument,
    options
  );
}
export type ValidateTokenQueryHookResult = ReturnType<
  typeof useValidateTokenQuery
>;
export type ValidateTokenLazyQueryHookResult = ReturnType<
  typeof useValidateTokenLazyQuery
>;
export type ValidateTokenQueryResult = Apollo.QueryResult<
  ValidateTokenQuery,
  ValidateTokenQueryVariables
>;
