import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type ActivateRoomMutationVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type ActivateRoomMutation = {
  __typename?: 'Mutation';
  activateRoom: {
    __typename?: 'Room';
    id: string;
    isActive: boolean;
    name: string;
    paymentLink: string;
    prizeMoney: number;
    entryPrice: number;
    dueDate: string;
  };
};

export const ActivateRoomDocument = /*#__PURE__*/ gql`
  mutation ActivateRoom($roomId: String!) {
    activateRoom(roomId: $roomId) {
      id
      isActive
      name
      paymentLink
      prizeMoney
      entryPrice
      dueDate
    }
  }
`;
export type ActivateRoomMutationFn = Apollo.MutationFunction<
  ActivateRoomMutation,
  ActivateRoomMutationVariables
>;

/**
 * __useActivateRoomMutation__
 *
 * To run a mutation, you first call `useActivateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateRoomMutation, { data, loading, error }] = useActivateRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useActivateRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ActivateRoomMutation,
    ActivateRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ActivateRoomMutation,
    ActivateRoomMutationVariables
  >(ActivateRoomDocument, options);
}
export type ActivateRoomMutationHookResult = ReturnType<
  typeof useActivateRoomMutation
>;
export type ActivateRoomMutationResult =
  Apollo.MutationResult<ActivateRoomMutation>;
export type ActivateRoomMutationOptions = Apollo.BaseMutationOptions<
  ActivateRoomMutation,
  ActivateRoomMutationVariables
>;
