import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type DisconnectMercadoPagoIntegrationMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type DisconnectMercadoPagoIntegrationMutation = {
  __typename?: 'Mutation';
  disconnectMercadoPagoIntegration?: string | null;
};

export const DisconnectMercadoPagoIntegrationDocument = /*#__PURE__*/ gql`
  mutation DisconnectMercadoPagoIntegration {
    disconnectMercadoPagoIntegration
  }
`;
export type DisconnectMercadoPagoIntegrationMutationFn =
  Apollo.MutationFunction<
    DisconnectMercadoPagoIntegrationMutation,
    DisconnectMercadoPagoIntegrationMutationVariables
  >;

/**
 * __useDisconnectMercadoPagoIntegrationMutation__
 *
 * To run a mutation, you first call `useDisconnectMercadoPagoIntegrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectMercadoPagoIntegrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectMercadoPagoIntegrationMutation, { data, loading, error }] = useDisconnectMercadoPagoIntegrationMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisconnectMercadoPagoIntegrationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisconnectMercadoPagoIntegrationMutation,
    DisconnectMercadoPagoIntegrationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DisconnectMercadoPagoIntegrationMutation,
    DisconnectMercadoPagoIntegrationMutationVariables
  >(DisconnectMercadoPagoIntegrationDocument, options);
}
export type DisconnectMercadoPagoIntegrationMutationHookResult = ReturnType<
  typeof useDisconnectMercadoPagoIntegrationMutation
>;
export type DisconnectMercadoPagoIntegrationMutationResult =
  Apollo.MutationResult<DisconnectMercadoPagoIntegrationMutation>;
export type DisconnectMercadoPagoIntegrationMutationOptions =
  Apollo.BaseMutationOptions<
    DisconnectMercadoPagoIntegrationMutation,
    DisconnectMercadoPagoIntegrationMutationVariables
  >;
