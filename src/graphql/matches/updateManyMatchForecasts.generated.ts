import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type UpdateManyMatchForecastsMutationVariables = Types.Exact<{
  forecasts: Array<Types.ForecastInput> | Types.ForecastInput;
}>;

export type UpdateManyMatchForecastsMutation = {
  __typename?: 'Mutation';
  createOrUpdateMultipleForecasts: boolean;
};

export const UpdateManyMatchForecastsDocument = /*#__PURE__*/ gql`
  mutation UpdateManyMatchForecasts($forecasts: [ForecastInput!]!) {
    createOrUpdateMultipleForecasts(forecasts: $forecasts)
  }
`;
export type UpdateManyMatchForecastsMutationFn = Apollo.MutationFunction<
  UpdateManyMatchForecastsMutation,
  UpdateManyMatchForecastsMutationVariables
>;

/**
 * __useUpdateManyMatchForecastsMutation__
 *
 * To run a mutation, you first call `useUpdateManyMatchForecastsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateManyMatchForecastsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateManyMatchForecastsMutation, { data, loading, error }] = useUpdateManyMatchForecastsMutation({
 *   variables: {
 *      forecasts: // value for 'forecasts'
 *   },
 * });
 */
export function useUpdateManyMatchForecastsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateManyMatchForecastsMutation,
    UpdateManyMatchForecastsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateManyMatchForecastsMutation,
    UpdateManyMatchForecastsMutationVariables
  >(UpdateManyMatchForecastsDocument, options);
}
export type UpdateManyMatchForecastsMutationHookResult = ReturnType<
  typeof useUpdateManyMatchForecastsMutation
>;
export type UpdateManyMatchForecastsMutationResult =
  Apollo.MutationResult<UpdateManyMatchForecastsMutation>;
export type UpdateManyMatchForecastsMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateManyMatchForecastsMutation,
    UpdateManyMatchForecastsMutationVariables
  >;
