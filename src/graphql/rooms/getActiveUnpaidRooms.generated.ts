import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type GetActiveUnpaidRoomsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetActiveUnpaidRoomsQuery = {
  __typename?: 'Query';
  getActiveUnpaidRooms: Array<{
    __typename?: 'Room';
    id: string;
    name: string;
    dueDate: string;
    prizeMoney: number;
    entryPrice: number;
    paymentLink: string;
    isActive: boolean;
    isClosed: boolean;
    participantsCount: number;
    creator: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }>;
};

export const GetActiveUnpaidRoomsDocument = /*#__PURE__*/ gql`
  query GetActiveUnpaidRooms {
    getActiveUnpaidRooms {
      id
      name
      dueDate
      prizeMoney
      entryPrice
      paymentLink
      isActive
      isClosed
      creator {
        id
        firstName
        lastName
        email
      }
      participantsCount
    }
  }
`;

/**
 * __useGetActiveUnpaidRoomsQuery__
 *
 * To run a query within a React component, call `useGetActiveUnpaidRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveUnpaidRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveUnpaidRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveUnpaidRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActiveUnpaidRoomsQuery,
    GetActiveUnpaidRoomsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetActiveUnpaidRoomsQuery,
    GetActiveUnpaidRoomsQueryVariables
  >(GetActiveUnpaidRoomsDocument, options);
}
export function useGetActiveUnpaidRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActiveUnpaidRoomsQuery,
    GetActiveUnpaidRoomsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetActiveUnpaidRoomsQuery,
    GetActiveUnpaidRoomsQueryVariables
  >(GetActiveUnpaidRoomsDocument, options);
}
export type GetActiveUnpaidRoomsQueryHookResult = ReturnType<
  typeof useGetActiveUnpaidRoomsQuery
>;
export type GetActiveUnpaidRoomsLazyQueryHookResult = ReturnType<
  typeof useGetActiveUnpaidRoomsLazyQuery
>;
export type GetActiveUnpaidRoomsQueryResult = Apollo.QueryResult<
  GetActiveUnpaidRoomsQuery,
  GetActiveUnpaidRoomsQueryVariables
>;
