import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type UpdateMatchMutationVariables = Types.Exact<{
  matchId: Types.Scalars['String'];
  homeTeam: Types.Scalars['String'];
  awayTeam: Types.Scalars['String'];
  date: Types.Scalars['String'];
}>;

export type UpdateMatchMutation = {
  __typename?: 'Mutation';
  updateMatch: {
    __typename?: 'Match';
    id: string;
    homeTeam: string;
    awayTeam: string;
    roomId: string;
    officialScore?: Types.Score | null;
    startDate: string;
  };
};

export const UpdateMatchDocument = /*#__PURE__*/ gql`
  mutation UpdateMatch(
    $matchId: String!
    $homeTeam: String!
    $awayTeam: String!
    $date: String!
  ) {
    updateMatch(
      matchId: $matchId
      homeTeam: $homeTeam
      awayTeam: $awayTeam
      date: $date
    ) {
      id
      homeTeam
      awayTeam
      roomId
      officialScore
      startDate
    }
  }
`;
export type UpdateMatchMutationFn = Apollo.MutationFunction<
  UpdateMatchMutation,
  UpdateMatchMutationVariables
>;

/**
 * __useUpdateMatchMutation__
 *
 * To run a mutation, you first call `useUpdateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchMutation, { data, loading, error }] = useUpdateMatchMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *      homeTeam: // value for 'homeTeam'
 *      awayTeam: // value for 'awayTeam'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useUpdateMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMatchMutation,
    UpdateMatchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateMatchMutation, UpdateMatchMutationVariables>(
    UpdateMatchDocument,
    options
  );
}
export type UpdateMatchMutationHookResult = ReturnType<
  typeof useUpdateMatchMutation
>;
export type UpdateMatchMutationResult =
  Apollo.MutationResult<UpdateMatchMutation>;
export type UpdateMatchMutationOptions = Apollo.BaseMutationOptions<
  UpdateMatchMutation,
  UpdateMatchMutationVariables
>;
