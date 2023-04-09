import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const AUTH_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      firstName
      lastName
      teamId
      token
      email
    }
  }
`;

const Error = styled.div`
  color: red;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type AuthUser = {
  email: string;
  firstName: string;
  lastName: string;
  teamId: string | null;
  token: string;
  id: string;
};

export const TestGraphql = () => {
  console.log('testing');
  const [authUser, { data, loading, error }] = useMutation<{
    authenticateUser: AuthUser;
  }>(AUTH_USER);

  if (error)
    return (
      <Container>
        <Error>{error.message}</Error>
      </Container>
    );

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <button
        onClick={() =>
          authUser({
            variables: {
              email: 'facudobbo@hotmail.com',
              password: 'Fmc172221',
            },
          })
        }
      >
        TEST AUTH
      </button>
      {data && (
        <div>{`El usuario logueado es ${data.authenticateUser.firstName} ${data.authenticateUser.lastName}`}</div>
      )}
    </Container>
  );
};
