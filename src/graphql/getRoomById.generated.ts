import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetRoomByIdQueryVariables = Types.Exact<{
  roomId: Types.Scalars['String'];
}>;

export type GetRoomByIdQuery = {
  __typename?: 'Query';
  getRoomById: {
    __typename?: 'Room';
    id: string;
    entryPrice: number;
    dueDate: string;
    isActive: boolean;
    name: string;
    prizeMoney: number;
    paymentLink: string;
  };
};

export const GetRoomByIdDocument = /*#__PURE__*/ gql`
  query GetRoomById($roomId: String!) {
    getRoomById(roomId: $roomId) {
      id
      entryPrice
      dueDate
      isActive
      name
      prizeMoney
      paymentLink
    }
  }
`;

/**
 * __useGetRoomByIdQuery__
 *
 * To run a query within a React component, call `useGetRoomByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomByIdQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetRoomByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRoomByIdQuery,
    GetRoomByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRoomByIdQuery, GetRoomByIdQueryVariables>(
    GetRoomByIdDocument,
    options
  );
}
export function useGetRoomByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRoomByIdQuery,
    GetRoomByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRoomByIdQuery, GetRoomByIdQueryVariables>(
    GetRoomByIdDocument,
    options
  );
}
export type GetRoomByIdQueryHookResult = ReturnType<typeof useGetRoomByIdQuery>;
export type GetRoomByIdLazyQueryHookResult = ReturnType<
  typeof useGetRoomByIdLazyQuery
>;
export type GetRoomByIdQueryResult = Apollo.QueryResult<
  GetRoomByIdQuery,
  GetRoomByIdQueryVariables
>;
