import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetRoomsByUserIdQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetRoomsByUserIdQuery = {
  __typename?: 'Query';
  getRoomsByUserId: Array<{
    __typename?: 'Room';
    id: string;
    name: string;
    prizeMoney: number;
    dueDate: string;
    entryPrice: number;
    isActive: boolean;
    paymentLink: string;
  }>;
};

export const GetRoomsByUserIdDocument = /*#__PURE__*/ gql`
  query GetRoomsByUserId {
    getRoomsByUserId {
      id
      name
      prizeMoney
      dueDate
      entryPrice
      isActive
      paymentLink
    }
  }
`;

/**
 * __useGetRoomsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetRoomsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomsByUserIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRoomsByUserIdQuery,
    GetRoomsByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRoomsByUserIdQuery, GetRoomsByUserIdQueryVariables>(
    GetRoomsByUserIdDocument,
    options
  );
}
export function useGetRoomsByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRoomsByUserIdQuery,
    GetRoomsByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRoomsByUserIdQuery,
    GetRoomsByUserIdQueryVariables
  >(GetRoomsByUserIdDocument, options);
}
export type GetRoomsByUserIdQueryHookResult = ReturnType<
  typeof useGetRoomsByUserIdQuery
>;
export type GetRoomsByUserIdLazyQueryHookResult = ReturnType<
  typeof useGetRoomsByUserIdLazyQuery
>;
export type GetRoomsByUserIdQueryResult = Apollo.QueryResult<
  GetRoomsByUserIdQuery,
  GetRoomsByUserIdQueryVariables
>;
