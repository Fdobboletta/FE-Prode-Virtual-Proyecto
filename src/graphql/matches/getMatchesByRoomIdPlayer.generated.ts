import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetMatchesByRoomIdForPlayersQueryVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type GetMatchesByRoomIdForPlayersQuery = {
  __typename?: 'Query';
  getMatchesByRoomIdForPlayers: Array<{
    __typename?: 'Match';
    id: string;
    homeTeam: string;
    awayTeam: string;
    officialScore?: Types.Score | null;
    roomId: string;
    startDate: string;
    userForecast?: Types.Score | null;
  }>;
};

export const GetMatchesByRoomIdForPlayersDocument = /*#__PURE__*/ gql`
  query GetMatchesByRoomIdForPlayers($roomId: String!) {
    getMatchesByRoomIdForPlayers(roomId: $roomId) {
      id
      homeTeam
      awayTeam
      officialScore
      roomId
      startDate
      userForecast
    }
  }
`;

/**
 * __useGetMatchesByRoomIdForPlayersQuery__
 *
 * To run a query within a React component, call `useGetMatchesByRoomIdForPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesByRoomIdForPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesByRoomIdForPlayersQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetMatchesByRoomIdForPlayersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMatchesByRoomIdForPlayersQuery,
    GetMatchesByRoomIdForPlayersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMatchesByRoomIdForPlayersQuery,
    GetMatchesByRoomIdForPlayersQueryVariables
  >(GetMatchesByRoomIdForPlayersDocument, options);
}
export function useGetMatchesByRoomIdForPlayersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMatchesByRoomIdForPlayersQuery,
    GetMatchesByRoomIdForPlayersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMatchesByRoomIdForPlayersQuery,
    GetMatchesByRoomIdForPlayersQueryVariables
  >(GetMatchesByRoomIdForPlayersDocument, options);
}
export type GetMatchesByRoomIdForPlayersQueryHookResult = ReturnType<
  typeof useGetMatchesByRoomIdForPlayersQuery
>;
export type GetMatchesByRoomIdForPlayersLazyQueryHookResult = ReturnType<
  typeof useGetMatchesByRoomIdForPlayersLazyQuery
>;
export type GetMatchesByRoomIdForPlayersQueryResult = Apollo.QueryResult<
  GetMatchesByRoomIdForPlayersQuery,
  GetMatchesByRoomIdForPlayersQueryVariables
>;
