import * as Types from '@/generated/graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = { shouldResubscribe: true } as const;
export type SendResetPasswordEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;

export type SendResetPasswordEmailMutation = {
  __typename?: 'Mutation';
  sendResetPasswordEmail?: string | null;
};

export const SendResetPasswordEmailDocument = /*#__PURE__*/ gql`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;
export type SendResetPasswordEmailMutationFn = Apollo.MutationFunction<
  SendResetPasswordEmailMutation,
  SendResetPasswordEmailMutationVariables
>;

/**
 * __useSendResetPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordEmailMutation, { data, loading, error }] = useSendResetPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetPasswordEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendResetPasswordEmailMutation,
    SendResetPasswordEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendResetPasswordEmailMutation,
    SendResetPasswordEmailMutationVariables
  >(SendResetPasswordEmailDocument, options);
}
export type SendResetPasswordEmailMutationHookResult = ReturnType<
  typeof useSendResetPasswordEmailMutation
>;
export type SendResetPasswordEmailMutationResult =
  Apollo.MutationResult<SendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationOptions = Apollo.BaseMutationOptions<
  SendResetPasswordEmailMutation,
  SendResetPasswordEmailMutationVariables
>;
