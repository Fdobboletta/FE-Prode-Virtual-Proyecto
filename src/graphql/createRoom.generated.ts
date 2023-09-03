import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type CreateRoomMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  dueDate: Types.Scalars['String'];
  prizeMoney: Types.Scalars['Float'];
  entryPrice: Types.Scalars['Float'];
  isActive: Types.Scalars['Boolean'];
}>;

export type CreateRoomMutation = {
  __typename?: 'Mutation';
  createRoom: {
    __typename?: 'Room';
    id: string;
    entryPrice: number;
    dueDate: string;
    isActive: boolean;
    isClosed: boolean;
    name: string;
    paymentLink: string;
    prizeMoney: number;
  };
};

export const CreateRoomDocument = /*#__PURE__*/ gql`
  mutation CreateRoom(
    $name: String!
    $dueDate: String!
    $prizeMoney: Float!
    $entryPrice: Float!
    $isActive: Boolean!
  ) {
    createRoom(
      name: $name
      dueDate: $dueDate
      prizeMoney: $prizeMoney
      entryPrice: $entryPrice
      isActive: $isActive
    ) {
      id
      entryPrice
      dueDate
      isActive
      isClosed
      name
      paymentLink
      prizeMoney
    }
  }
`;
export type CreateRoomMutationFn = Apollo.MutationFunction<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      name: // value for 'name'
 *      dueDate: // value for 'dueDate'
 *      prizeMoney: // value for 'prizeMoney'
 *      entryPrice: // value for 'entryPrice'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useCreateRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument,
    options
  );
}
export type CreateRoomMutationHookResult = ReturnType<
  typeof useCreateRoomMutation
>;
export type CreateRoomMutationResult =
  Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;
