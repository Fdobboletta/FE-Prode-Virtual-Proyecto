import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type UpdateRoomMutationVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
  name: Types.Scalars['String'];
  dueDate: Types.Scalars['String'];
  prizeMoney: Types.Scalars['Float'];
  entryPrice: Types.Scalars['Float'];
  isActive: Types.Scalars['Boolean'];
}>;

export type UpdateRoomMutation = {
  __typename?: 'Mutation';
  updateRoom?: {
    __typename?: 'Room';
    id: string;
    isActive: boolean;
    isClosed: boolean;
    name: string;
    paymentLink: string;
    prizeMoney: number;
    entryPrice: number;
    dueDate: string;
  } | null;
};

export const UpdateRoomDocument = /*#__PURE__*/ gql`
  mutation UpdateRoom(
    $roomId: String!
    $name: String!
    $dueDate: String!
    $prizeMoney: Float!
    $entryPrice: Float!
    $isActive: Boolean!
  ) {
    updateRoom(
      roomId: $roomId
      name: $name
      dueDate: $dueDate
      prizeMoney: $prizeMoney
      entryPrice: $entryPrice
      isActive: $isActive
    ) {
      id
      isActive
      isClosed
      name
      paymentLink
      prizeMoney
      entryPrice
      dueDate
    }
  }
`;
export type UpdateRoomMutationFn = Apollo.MutationFunction<
  UpdateRoomMutation,
  UpdateRoomMutationVariables
>;

/**
 * __useUpdateRoomMutation__
 *
 * To run a mutation, you first call `useUpdateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoomMutation, { data, loading, error }] = useUpdateRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      name: // value for 'name'
 *      dueDate: // value for 'dueDate'
 *      prizeMoney: // value for 'prizeMoney'
 *      entryPrice: // value for 'entryPrice'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useUpdateRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRoomMutation,
    UpdateRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRoomMutation, UpdateRoomMutationVariables>(
    UpdateRoomDocument,
    options
  );
}
export type UpdateRoomMutationHookResult = ReturnType<
  typeof useUpdateRoomMutation
>;
export type UpdateRoomMutationResult =
  Apollo.MutationResult<UpdateRoomMutation>;
export type UpdateRoomMutationOptions = Apollo.BaseMutationOptions<
  UpdateRoomMutation,
  UpdateRoomMutationVariables
>;
