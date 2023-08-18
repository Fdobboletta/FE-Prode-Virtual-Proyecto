import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type DeleteMatchMutationVariables = Types.Exact<{
  matchId: Types.Scalars['String'];
}>;

export type DeleteMatchMutation = {
  __typename?: 'Mutation';
  deleteMatch?: string | null;
};

export const DeleteMatchDocument = /*#__PURE__*/ gql`
  mutation DeleteMatch($matchId: String!) {
    deleteMatch(matchId: $matchId)
  }
`;
export type DeleteMatchMutationFn = Apollo.MutationFunction<
  DeleteMatchMutation,
  DeleteMatchMutationVariables
>;

/**
 * __useDeleteMatchMutation__
 *
 * To run a mutation, you first call `useDeleteMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMatchMutation, { data, loading, error }] = useDeleteMatchMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *   },
 * });
 */
export function useDeleteMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMatchMutation,
    DeleteMatchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteMatchMutation, DeleteMatchMutationVariables>(
    DeleteMatchDocument,
    options
  );
}
export type DeleteMatchMutationHookResult = ReturnType<
  typeof useDeleteMatchMutation
>;
export type DeleteMatchMutationResult =
  Apollo.MutationResult<DeleteMatchMutation>;
export type DeleteMatchMutationOptions = Apollo.BaseMutationOptions<
  DeleteMatchMutation,
  DeleteMatchMutationVariables
>;
