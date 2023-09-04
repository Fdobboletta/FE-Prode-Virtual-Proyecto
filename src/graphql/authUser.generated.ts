import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type AuthenticateUserMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

export type AuthenticateUserMutation = {
  __typename?: 'Mutation';
  authenticateUser: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    token?: string | null;
    email: string;
    role: Types.UserRole;
    address: string;
    cellphone: string;
  };
};

export const AuthenticateUserDocument = /*#__PURE__*/ gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      firstName
      lastName
      token
      email
      role
      address
      cellphone
    }
  }
`;
export type AuthenticateUserMutationFn = Apollo.MutationFunction<
  AuthenticateUserMutation,
  AuthenticateUserMutationVariables
>;

/**
 * __useAuthenticateUserMutation__
 *
 * To run a mutation, you first call `useAuthenticateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateUserMutation, { data, loading, error }] = useAuthenticateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateUserMutation,
    AuthenticateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AuthenticateUserMutation,
    AuthenticateUserMutationVariables
  >(AuthenticateUserDocument, options);
}
export type AuthenticateUserMutationHookResult = ReturnType<
  typeof useAuthenticateUserMutation
>;
export type AuthenticateUserMutationResult =
  Apollo.MutationResult<AuthenticateUserMutation>;
export type AuthenticateUserMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateUserMutation,
  AuthenticateUserMutationVariables
>;
