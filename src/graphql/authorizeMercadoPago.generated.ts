import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type AuthorizeMercadoPagoMutationVariables = Types.Exact<{
  mercadoPagoCode: Types.Scalars['String'];
}>;

export type AuthorizeMercadoPagoMutation = {
  __typename?: 'Mutation';
  authorizeMercadoPago?: {
    __typename?: 'MercadoPagoAccessToken';
    accessToken: string;
  } | null;
};

export const AuthorizeMercadoPagoDocument = /*#__PURE__*/ gql`
  mutation AuthorizeMercadoPago($mercadoPagoCode: String!) {
    authorizeMercadoPago(mercadoPagoCode: $mercadoPagoCode) {
      accessToken
    }
  }
`;
export type AuthorizeMercadoPagoMutationFn = Apollo.MutationFunction<
  AuthorizeMercadoPagoMutation,
  AuthorizeMercadoPagoMutationVariables
>;

/**
 * __useAuthorizeMercadoPagoMutation__
 *
 * To run a mutation, you first call `useAuthorizeMercadoPagoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeMercadoPagoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeMercadoPagoMutation, { data, loading, error }] = useAuthorizeMercadoPagoMutation({
 *   variables: {
 *      mercadoPagoCode: // value for 'mercadoPagoCode'
 *   },
 * });
 */
export function useAuthorizeMercadoPagoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthorizeMercadoPagoMutation,
    AuthorizeMercadoPagoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AuthorizeMercadoPagoMutation,
    AuthorizeMercadoPagoMutationVariables
  >(AuthorizeMercadoPagoDocument, options);
}
export type AuthorizeMercadoPagoMutationHookResult = ReturnType<
  typeof useAuthorizeMercadoPagoMutation
>;
export type AuthorizeMercadoPagoMutationResult =
  Apollo.MutationResult<AuthorizeMercadoPagoMutation>;
export type AuthorizeMercadoPagoMutationOptions = Apollo.BaseMutationOptions<
  AuthorizeMercadoPagoMutation,
  AuthorizeMercadoPagoMutationVariables
>;
