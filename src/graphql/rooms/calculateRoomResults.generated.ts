import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type CalculateRoomResultsMutationVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type CalculateRoomResultsMutation = {
  __typename?: 'Mutation';
  calculateRoomResults: Array<{
    __typename?: 'RoomParticipantWithScore';
    participantId: string;
    name: string;
    lastName: string;
    email: string;
    score?: number | null;
  }>;
};

export const CalculateRoomResultsDocument = /*#__PURE__*/ gql`
  mutation CalculateRoomResults($roomId: String!) {
    calculateRoomResults(roomId: $roomId) {
      participantId
      name
      lastName
      email
      score
    }
  }
`;
export type CalculateRoomResultsMutationFn = Apollo.MutationFunction<
  CalculateRoomResultsMutation,
  CalculateRoomResultsMutationVariables
>;

/**
 * __useCalculateRoomResultsMutation__
 *
 * To run a mutation, you first call `useCalculateRoomResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCalculateRoomResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [calculateRoomResultsMutation, { data, loading, error }] = useCalculateRoomResultsMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useCalculateRoomResultsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CalculateRoomResultsMutation,
    CalculateRoomResultsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CalculateRoomResultsMutation,
    CalculateRoomResultsMutationVariables
  >(CalculateRoomResultsDocument, options);
}
export type CalculateRoomResultsMutationHookResult = ReturnType<
  typeof useCalculateRoomResultsMutation
>;
export type CalculateRoomResultsMutationResult =
  Apollo.MutationResult<CalculateRoomResultsMutation>;
export type CalculateRoomResultsMutationOptions = Apollo.BaseMutationOptions<
  CalculateRoomResultsMutation,
  CalculateRoomResultsMutationVariables
>;
