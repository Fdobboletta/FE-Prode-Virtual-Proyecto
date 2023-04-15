import React, { useCallback, useState } from 'react';

import { AccountCircle, Lock } from '@mui/icons-material';
import styled from 'styled-components';
import { Button, CircularProgress, Link, TextField } from '@mui/material';
import { useAuthenticateUserMutation } from '../graphql/authUser.generated';
import { useNavigate } from 'react-router';

interface LoginFormValues {
  email: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #355430;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
`;

const StyledAccountCircle = styled(AccountCircle)`
  margin-right: 6px;
`;
const StyledLock = styled(Lock)`
  margin-right: 6px;
`;

const ForgotPasswordLink = styled(Link)`
  margin-top: 8px !important;
`;

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [authUser, { loading }] = useAuthenticateUserMutation({
    onCompleted: (data) => {
      localStorage.setItem('authToken', data.authenticateUser.token);
      navigate('/user');
    },
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [setFormValues]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { email, password } = formValues;

      await authUser({
        variables: {
          email,
          password,
        },
      });

      // Handle login logic here using the username and password values
    },
    [formValues]
  );

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            margin="normal"
            variant="outlined"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <StyledAccountCircle />,
            }}
          />
          <TextField
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <StyledLock />,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <ForgotPasswordLink href="#">
            Forgot your password?
          </ForgotPasswordLink>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;
