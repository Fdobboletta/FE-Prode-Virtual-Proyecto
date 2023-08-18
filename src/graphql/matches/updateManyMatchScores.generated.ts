import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type UpdateManyMatchScoresMutationVariables = Types.Exact<{
  scoreUpdates: Array<Types.ScoreUpdateInput> | Types.ScoreUpdateInput;
}>;

export type UpdateManyMatchScoresMutation = {
  __typename?: 'Mutation';
  updateManyMatchScores: Array<{
    __typename?: 'Match';
    id: string;
    homeTeam: string;
    awayTeam: string;
    officialScore?: Types.Score | null;
    roomId: string;
    startDate: string;
  }>;
};

export const UpdateManyMatchScoresDocument = /*#__PURE__*/ gql`
  mutation UpdateManyMatchScores($scoreUpdates: [ScoreUpdateInput!]!) {
    updateManyMatchScores(scoreUpdates: $scoreUpdates) {
      id
      homeTeam
      awayTeam
      officialScore
      roomId
      startDate
    }
  }
`;
export type UpdateManyMatchScoresMutationFn = Apollo.MutationFunction<
  UpdateManyMatchScoresMutation,
  UpdateManyMatchScoresMutationVariables
>;

/**
 * __useUpdateManyMatchScoresMutation__
 *
 * To run a mutation, you first call `useUpdateManyMatchScoresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateManyMatchScoresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateManyMatchScoresMutation, { data, loading, error }] = useUpdateManyMatchScoresMutation({
 *   variables: {
 *      scoreUpdates: // value for 'scoreUpdates'
 *   },
 * });
 */
export function useUpdateManyMatchScoresMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateManyMatchScoresMutation,
    UpdateManyMatchScoresMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateManyMatchScoresMutation,
    UpdateManyMatchScoresMutationVariables
  >(UpdateManyMatchScoresDocument, options);
}
export type UpdateManyMatchScoresMutationHookResult = ReturnType<
  typeof useUpdateManyMatchScoresMutation
>;
export type UpdateManyMatchScoresMutationResult =
  Apollo.MutationResult<UpdateManyMatchScoresMutation>;
export type UpdateManyMatchScoresMutationOptions = Apollo.BaseMutationOptions<
  UpdateManyMatchScoresMutation,
  UpdateManyMatchScoresMutationVariables
>;
