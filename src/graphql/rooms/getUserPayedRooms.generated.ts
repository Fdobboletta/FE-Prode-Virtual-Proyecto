import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetUserPayedRoomsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetUserPayedRoomsQuery = {
  __typename?: 'Query';
  getUserPayedRooms: Array<{
    __typename?: 'Room';
    id: string;
    name: string;
    dueDate: string;
    prizeMoney: number;
    entryPrice: number;
    paymentLink: string;
    isActive: boolean;
    isClosed: boolean;
  }>;
};

export const GetUserPayedRoomsDocument = /*#__PURE__*/ gql`
  query GetUserPayedRooms {
    getUserPayedRooms {
      id
      name
      dueDate
      prizeMoney
      entryPrice
      paymentLink
      isActive
      isClosed
    }
  }
`;

/**
 * __useGetUserPayedRoomsQuery__
 *
 * To run a query within a React component, call `useGetUserPayedRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPayedRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPayedRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPayedRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserPayedRoomsQuery,
    GetUserPayedRoomsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUserPayedRoomsQuery,
    GetUserPayedRoomsQueryVariables
  >(GetUserPayedRoomsDocument, options);
}
export function useGetUserPayedRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserPayedRoomsQuery,
    GetUserPayedRoomsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserPayedRoomsQuery,
    GetUserPayedRoomsQueryVariables
  >(GetUserPayedRoomsDocument, options);
}
export type GetUserPayedRoomsQueryHookResult = ReturnType<
  typeof useGetUserPayedRoomsQuery
>;
export type GetUserPayedRoomsLazyQueryHookResult = ReturnType<
  typeof useGetUserPayedRoomsLazyQuery
>;
export type GetUserPayedRoomsQueryResult = Apollo.QueryResult<
  GetUserPayedRoomsQuery,
  GetUserPayedRoomsQueryVariables
>;
