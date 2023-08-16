import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type DeleteRoomMutationVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type DeleteRoomMutation = {
  __typename?: 'Mutation';
  deleteRoom?: string | null;
};

export const DeleteRoomDocument = /*#__PURE__*/ gql`
  mutation DeleteRoom($roomId: String!) {
    deleteRoom(roomId: $roomId)
  }
`;
export type DeleteRoomMutationFn = Apollo.MutationFunction<
  DeleteRoomMutation,
  DeleteRoomMutationVariables
>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useDeleteRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRoomMutation,
    DeleteRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(
    DeleteRoomDocument,
    options
  );
}
export type DeleteRoomMutationHookResult = ReturnType<
  typeof useDeleteRoomMutation
>;
export type DeleteRoomMutationResult =
  Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<
  DeleteRoomMutation,
  DeleteRoomMutationVariables
>;
