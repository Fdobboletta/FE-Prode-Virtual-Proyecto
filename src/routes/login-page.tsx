import React, { memo, useCallback, useState } from 'react';

import { AccountCircle, Lock } from '@mui/icons-material';
import styled from 'styled-components';
import { Button, CircularProgress, Link, TextField } from '@mui/material';
import { useAuthenticateUserMutation } from '../graphql/authUser.generated';
import { useNavigate } from 'react-router';
import { useLocalStorageState } from 'ahooks';
import { toRem } from '../utils';
import { Logo } from '../logo';
import { UserRole } from '@/generated/graphql-types.generated';

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
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: ${toRem(24)};
  border-radius: 8px;
  width: 30%; /* Adjust the width as needed */
  max-width: ${toRem(600)};
  box-shadow: 0 0 ${toRem(10)} rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${toRem(600)};
`;

const StyledAccountCircle = styled(AccountCircle)`
  margin-right: ${toRem(6)};
`;
const StyledLock = styled(Lock)`
  margin-right: ${toRem(6)};
`;

const ForgotPasswordLink = styled(Link)`
  margin-top: ${toRem(8)} !important;
`;

const ExpandContent = styled.div`
  flex-grow: 1;
`;

const StyledRegisterButton = styled(Button)`
  margin-top: ${toRem(12)} !important;
  margin-bottom: ${toRem(6)} !important;
`;

const StyledLoginButton = styled(Button)`
  margin-top: ${toRem(6)} !important;
`;

const InternalLogin = (): JSX.Element => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAuthData] = useLocalStorageState<{
    email: string;
    role: UserRole;
  }>('authData');

  const navigate = useNavigate();

  const [authUser, { loading }] = useAuthenticateUserMutation({
    onCompleted: (data) => {
      const userRole = data.authenticateUser.role;
      setAuthData({
        email: data.authenticateUser.email,
        role: userRole,
      });
      localStorage.setItem('authToken', data.authenticateUser.token);
      userRole === UserRole.Player ? navigate('/user') : navigate('/admin');
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
    },
    [formValues]
  );

  return (
    <Container>
      <Logo />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            margin="normal"
            variant="outlined"
            name="email"
            type="email"
            fullWidth
            value={formValues.email}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <StyledAccountCircle />,
            }}
          />
          <TextField
            label="Contraseña"
            margin="normal"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            value={formValues.password}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <StyledLock />,
            }}
          />
          <StyledLoginButton
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Iniciar Sesion'
            )}
          </StyledLoginButton>
          <StyledRegisterButton
            fullWidth
            onClick={() => navigate('/register')}
            variant="outlined"
            color="primary"
          >
            Crear Cuenta
          </StyledRegisterButton>
          <ForgotPasswordLink onClick={() => navigate('/reset-password')}>
            Olvidaste tu contraseña?
          </ForgotPasswordLink>
          <ExpandContent />
        </Form>
      </FormContainer>
    </Container>
  );
};

export const LoginPage = memo(InternalLogin);
