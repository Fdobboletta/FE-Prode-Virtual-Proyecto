import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GenerateMercadoPagoPreferenceMutationVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type GenerateMercadoPagoPreferenceMutation = {
  __typename?: 'Mutation';
  generateMercadoPagoPreferenceId: {
    __typename?: 'MercadoPagoPreference';
    preferenceId: string;
    redirectLink: string;
  };
};

export const GenerateMercadoPagoPreferenceDocument = /*#__PURE__*/ gql`
  mutation GenerateMercadoPagoPreference($roomId: String!) {
    generateMercadoPagoPreferenceId(roomId: $roomId) {
      preferenceId
      redirectLink
    }
  }
`;
export type GenerateMercadoPagoPreferenceMutationFn = Apollo.MutationFunction<
  GenerateMercadoPagoPreferenceMutation,
  GenerateMercadoPagoPreferenceMutationVariables
>;

/**
 * __useGenerateMercadoPagoPreferenceMutation__
 *
 * To run a mutation, you first call `useGenerateMercadoPagoPreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateMercadoPagoPreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateMercadoPagoPreferenceMutation, { data, loading, error }] = useGenerateMercadoPagoPreferenceMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGenerateMercadoPagoPreferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateMercadoPagoPreferenceMutation,
    GenerateMercadoPagoPreferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateMercadoPagoPreferenceMutation,
    GenerateMercadoPagoPreferenceMutationVariables
  >(GenerateMercadoPagoPreferenceDocument, options);
}
export type GenerateMercadoPagoPreferenceMutationHookResult = ReturnType<
  typeof useGenerateMercadoPagoPreferenceMutation
>;
export type GenerateMercadoPagoPreferenceMutationResult =
  Apollo.MutationResult<GenerateMercadoPagoPreferenceMutation>;
export type GenerateMercadoPagoPreferenceMutationOptions =
  Apollo.BaseMutationOptions<
    GenerateMercadoPagoPreferenceMutation,
    GenerateMercadoPagoPreferenceMutationVariables
  >;
