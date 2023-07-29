import React, { memo, useCallback, useEffect, useState } from 'react';
import { Lock } from '@mui/icons-material';
import styled from 'styled-components';
import { Button, CircularProgress, TextField } from '@mui/material';
import { toRem } from '../utils';
import { Logo } from '../logo';
import { useChangePasswordMutation } from '../graphql/changePassword.generated';
import { useNavigate, useParams } from 'react-router';
import { useValidateTokenLazyQuery } from '../graphql/validateToken.generated';

interface ResetPasswordFormValues {
  newPassword: string;
  repeatNewPassword: string;
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
`;

const StyledLock = styled(Lock)`
  margin-right: ${toRem(6)};
`;

const ExpandContent = styled.div`
  flex-grow: 1;
`;

const StyledSubmitButton = styled(Button)`
  margin-top: ${toRem(6)} !important;
`;

const useChangePassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [validateTokenQuery] = useValidateTokenLazyQuery();

  const [changePassword, { loading: loadingChangePassword }] =
    useChangePasswordMutation();

  const [loadingPage, setLoadingPage] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token || !validateTokenQuery) return;
        const { data, loading } = await validateTokenQuery({
          variables: { token, isResetPassword: true },
        });

        if (!loading && !data?.validateToken) {
          navigate('/login');
          return;
        }
        if (data?.validateToken) {
          setLoadingPage(false);
        }
      } catch (error) {
        console.error('Error validating token:', error);
        navigate('/login');
      }
    };
    validateToken();
  }, [token, validateTokenQuery]);

  const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
    newPassword: '',
    repeatNewPassword: '',
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
      const { newPassword, repeatNewPassword } = formValues;

      let isValid = true;

      if (newPassword !== repeatNewPassword) {
        setPasswordError('Las contraseñas ingresadas deben ser idénticas');
        isValid = false;
      } else {
        setPasswordError('');
      }

      if (isValid) {
        await changePassword({
          variables: {
            newPassword,
            token: token || '',
          },
        });
      }
    },
    [formValues]
  );

  return {
    loadingChangePassword,
    loadingPage,
    handleInputChange,
    handleSubmit,
    passwordError,
    formValues,
  };
};

const InternalChangePassword = (): JSX.Element => {
  const controller = useChangePassword();

  return (
    <Container>
      <Logo />
      <FormContainer>
        {controller.loadingPage ? (
          <CircularProgress color="inherit" />
        ) : (
          <Form onSubmit={controller.handleSubmit}>
            <TextField
              label="Nueva contraseña"
              margin="normal"
              variant="outlined"
              type="password"
              name="newPassword"
              fullWidth
              value={controller.formValues.newPassword}
              error={!!controller.passwordError}
              helperText={controller.passwordError}
              onChange={controller.handleInputChange}
              InputProps={{
                startAdornment: <StyledLock />,
              }}
            />
            <TextField
              label="Repetir nueva contraseña"
              margin="normal"
              variant="outlined"
              type="password"
              name="repeatNewPassword"
              fullWidth
              value={controller.formValues.repeatNewPassword}
              error={!!controller.passwordError}
              helperText={controller.passwordError}
              onChange={controller.handleInputChange}
              InputProps={{
                startAdornment: <StyledLock />,
              }}
            />
            <StyledSubmitButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={controller.loadingChangePassword}
            >
              {controller.loadingChangePassword ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Cambiar Contraseña'
              )}
            </StyledSubmitButton>
            <ExpandContent />
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export const ChangePasswordPage = memo(InternalChangePassword);
