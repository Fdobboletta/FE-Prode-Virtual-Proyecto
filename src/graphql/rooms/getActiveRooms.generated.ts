import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetActiveRoomsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetActiveRoomsQuery = {
  __typename?: 'Query';
  getActiveRooms: Array<{
    __typename?: 'Room';
    id: string;
    name: string;
    isActive: boolean;
    entryPrice: number;
    dueDate: string;
    paymentLink: string;
    prizeMoney: number;
  }>;
};

export const GetActiveRoomsDocument = /*#__PURE__*/ gql`
  query GetActiveRooms {
    getActiveRooms {
      id
      name
      isActive
      entryPrice
      dueDate
      paymentLink
      prizeMoney
    }
  }
`;

/**
 * __useGetActiveRoomsQuery__
 *
 * To run a query within a React component, call `useGetActiveRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActiveRoomsQuery,
    GetActiveRoomsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>(
    GetActiveRoomsDocument,
    options
  );
}
export function useGetActiveRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActiveRoomsQuery,
    GetActiveRoomsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>(
    GetActiveRoomsDocument,
    options
  );
}
export type GetActiveRoomsQueryHookResult = ReturnType<
  typeof useGetActiveRoomsQuery
>;
export type GetActiveRoomsLazyQueryHookResult = ReturnType<
  typeof useGetActiveRoomsLazyQuery
>;
export type GetActiveRoomsQueryResult = Apollo.QueryResult<
  GetActiveRoomsQuery,
  GetActiveRoomsQueryVariables
>;
