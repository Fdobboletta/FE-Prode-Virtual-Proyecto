import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type CreateMatchMutationVariables = Types.Exact<{
  homeTeam: Types.Scalars['String'];
  awayTeam: Types.Scalars['String'];
  date: Types.Scalars['String'];
  roomId: Types.Scalars['String'];
}>;

export type CreateMatchMutation = {
  __typename?: 'Mutation';
  createMatch: {
    __typename?: 'Match';
    id: string;
    homeTeam: string;
    awayTeam: string;
    officialScore?: Types.Score | null;
    roomId: string;
    startDate: string;
  };
};

export const CreateMatchDocument = /*#__PURE__*/ gql`
  mutation CreateMatch(
    $homeTeam: String!
    $awayTeam: String!
    $date: String!
    $roomId: String!
  ) {
    createMatch(
      homeTeam: $homeTeam
      awayTeam: $awayTeam
      date: $date
      roomId: $roomId
    ) {
      id
      homeTeam
      awayTeam
      officialScore
      roomId
      startDate
    }
  }
`;
export type CreateMatchMutationFn = Apollo.MutationFunction<
  CreateMatchMutation,
  CreateMatchMutationVariables
>;

/**
 * __useCreateMatchMutation__
 *
 * To run a mutation, you first call `useCreateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMatchMutation, { data, loading, error }] = useCreateMatchMutation({
 *   variables: {
 *      homeTeam: // value for 'homeTeam'
 *      awayTeam: // value for 'awayTeam'
 *      date: // value for 'date'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useCreateMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMatchMutation,
    CreateMatchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMatchMutation, CreateMatchMutationVariables>(
    CreateMatchDocument,
    options
  );
}
export type CreateMatchMutationHookResult = ReturnType<
  typeof useCreateMatchMutation
>;
export type CreateMatchMutationResult =
  Apollo.MutationResult<CreateMatchMutation>;
export type CreateMatchMutationOptions = Apollo.BaseMutationOptions<
  CreateMatchMutation,
  CreateMatchMutationVariables
>;
