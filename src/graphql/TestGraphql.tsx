import { Button, CircularProgress, Typography } from '@mui/material';
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
  const [authUser, { data, loading, error }] = useAuthenticateUserMutation();

  if (error)
    return (
      <Container>
        <Error>{error.message}</Error>
      </Container>
    );

  if (loading)
    return (
      <Container>
        <CircularProgress color="primary" />
      </Container>
    );

  return (
    <Container>
      <Button
        variant="outlined"
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
        <Typography>{`El usuario logueado es ${data.authenticateUser.firstName} ${data.authenticateUser.lastName}`}</Typography>
      )}
    </Container>
  );
};
