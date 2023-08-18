import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetMatchesByRoomIdQueryVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type GetMatchesByRoomIdQuery = {
  __typename?: 'Query';
  getMatchesByRoomId: Array<{
    __typename?: 'Match';
    id: string;
    homeTeam: string;
    awayTeam: string;
    officialScore?: Types.Score | null;
    startDate: string;
    roomId: string;
  }>;
};

export const GetMatchesByRoomIdDocument = /*#__PURE__*/ gql`
  query GetMatchesByRoomId($roomId: String!) {
    getMatchesByRoomId(roomId: $roomId) {
      id
      homeTeam
      awayTeam
      officialScore
      startDate
      roomId
    }
  }
`;

/**
 * __useGetMatchesByRoomIdQuery__
 *
 * To run a query within a React component, call `useGetMatchesByRoomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesByRoomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesByRoomIdQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetMatchesByRoomIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMatchesByRoomIdQuery,
    GetMatchesByRoomIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMatchesByRoomIdQuery,
    GetMatchesByRoomIdQueryVariables
  >(GetMatchesByRoomIdDocument, options);
}
export function useGetMatchesByRoomIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMatchesByRoomIdQuery,
    GetMatchesByRoomIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMatchesByRoomIdQuery,
    GetMatchesByRoomIdQueryVariables
  >(GetMatchesByRoomIdDocument, options);
}
export type GetMatchesByRoomIdQueryHookResult = ReturnType<
  typeof useGetMatchesByRoomIdQuery
>;
export type GetMatchesByRoomIdLazyQueryHookResult = ReturnType<
  typeof useGetMatchesByRoomIdLazyQuery
>;
export type GetMatchesByRoomIdQueryResult = Apollo.QueryResult<
  GetMatchesByRoomIdQuery,
  GetMatchesByRoomIdQueryVariables
>;
