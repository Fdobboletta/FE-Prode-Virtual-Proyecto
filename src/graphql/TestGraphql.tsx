import { Button } from '@mui/material';
import styled from 'styled-components';
import { useAuthenticateUserMutation } from './authUser.generated';

const Error = styled.div`
  color: red;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TestGraphql = () => {
  console.log('testing');
  const [authUser, { data, loading, error }] = useAuthenticateUserMutation();

  if (error)
    return (
      <Container>
        <Error>{error.message}</Error>
      </Container>
    );

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Button
        variant="contained"
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
      </Button>
      {data && (
        <div>{`El usuario logueado es ${data.authenticateUser.firstName} ${data.authenticateUser.lastName}`}</div>
      )}
    </Container>
  );
};
