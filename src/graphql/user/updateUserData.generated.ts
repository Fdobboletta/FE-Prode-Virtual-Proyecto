import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type UpdateUserDataMutationVariables = Types.Exact<{
  firstName?: Types.InputMaybe<Types.Scalars['String']>;
  lastName?: Types.InputMaybe<Types.Scalars['String']>;
  cellphone?: Types.InputMaybe<Types.Scalars['String']>;
  address?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type UpdateUserDataMutation = {
  __typename?: 'Mutation';
  updateUserData?: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Types.UserRole;
    cellphone: string;
    address: string;
  } | null;
};

export const UpdateUserDataDocument = /*#__PURE__*/ gql`
  mutation UpdateUserData(
    $firstName: String
    $lastName: String
    $cellphone: String
    $address: String
  ) {
    updateUserData(
      firstName: $firstName
      lastName: $lastName
      cellphone: $cellphone
      address: $address
    ) {
      id
      firstName
      lastName
      email
      role
      cellphone
      address
    }
  }
`;
export type UpdateUserDataMutationFn = Apollo.MutationFunction<
  UpdateUserDataMutation,
  UpdateUserDataMutationVariables
>;

/**
 * __useUpdateUserDataMutation__
 *
 * To run a mutation, you first call `useUpdateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDataMutation, { data, loading, error }] = useUpdateUserDataMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      cellphone: // value for 'cellphone'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUpdateUserDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserDataMutation,
    UpdateUserDataMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserDataMutation,
    UpdateUserDataMutationVariables
  >(UpdateUserDataDocument, options);
}
export type UpdateUserDataMutationHookResult = ReturnType<
  typeof useUpdateUserDataMutation
>;
export type UpdateUserDataMutationResult =
  Apollo.MutationResult<UpdateUserDataMutation>;
export type UpdateUserDataMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserDataMutation,
  UpdateUserDataMutationVariables
>;
