import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetParticipantsByRoomIdQueryVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type GetParticipantsByRoomIdQuery = {
  __typename?: 'Query';
  getParticipantsByRoomId: Array<{
    __typename?: 'Participant';
    id: string;
    firstName: string;
    email: string;
    lastName: string;
    score?: number | null;
  }>;
};

export const GetParticipantsByRoomIdDocument = /*#__PURE__*/ gql`
  query GetParticipantsByRoomId($roomId: String!) {
    getParticipantsByRoomId(roomId: $roomId) {
      id
      firstName
      email
      lastName
      score
    }
  }
`;

/**
 * __useGetParticipantsByRoomIdQuery__
 *
 * To run a query within a React component, call `useGetParticipantsByRoomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParticipantsByRoomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParticipantsByRoomIdQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetParticipantsByRoomIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetParticipantsByRoomIdQuery,
    GetParticipantsByRoomIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetParticipantsByRoomIdQuery,
    GetParticipantsByRoomIdQueryVariables
  >(GetParticipantsByRoomIdDocument, options);
}
export function useGetParticipantsByRoomIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetParticipantsByRoomIdQuery,
    GetParticipantsByRoomIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetParticipantsByRoomIdQuery,
    GetParticipantsByRoomIdQueryVariables
  >(GetParticipantsByRoomIdDocument, options);
}
export type GetParticipantsByRoomIdQueryHookResult = ReturnType<
  typeof useGetParticipantsByRoomIdQuery
>;
export type GetParticipantsByRoomIdLazyQueryHookResult = ReturnType<
  typeof useGetParticipantsByRoomIdLazyQuery
>;
export type GetParticipantsByRoomIdQueryResult = Apollo.QueryResult<
  GetParticipantsByRoomIdQuery,
  GetParticipantsByRoomIdQueryVariables
>;
