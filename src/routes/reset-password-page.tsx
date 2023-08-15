import React, { memo, useCallback, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import styled from 'styled-components';
import { Button, CircularProgress, TextField } from '@mui/material';
import { toRem } from '../utils';
import { Logo } from '../logo';
import { useSendResetPasswordEmailMutation } from '../graphql/sendResetPasswordEmail.generated';
import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';

interface ResetPasswordFormValues {
  email: string;
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

const StyledAccountCircle = styled(AccountCircle)`
  margin-right: ${toRem(6)};
`;

const ExpandContent = styled.div`
  flex-grow: 1;
`;

const StyledRegisterButton = styled(Button)`
  margin-top: ${toRem(6)} !important;
`;

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const InternalResetPassword = (props: WithSnackbarProps): JSX.Element => {
  const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
    email: '',
  });

  const [emailError, setEmailError] = useState('');

  const [sendResetPasswordEmail, { loading }] =
    useSendResetPasswordEmailMutation({
      onCompleted: () => {
        props.snackbarShowMessage(
          4000,
          'Email enviado con exito',
          snackSeverity.success
        );
      },

      onError: (error) => {
        if (error.message) {
          setEmailError(error.message);
        }
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
      const { email } = formValues;

      let isValid = true;

      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        isValid = false;
      } else {
        setEmailError('');
      }

      if (isValid) {
        await sendResetPasswordEmail({
          variables: {
            email,
          },
        });
      }
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
            error={!!emailError}
            helperText={emailError}
            value={formValues.email}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <StyledAccountCircle />,
            }}
          />
          <StyledRegisterButton
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Recuperar Contraseña'
            )}
          </StyledRegisterButton>
          <ExpandContent />
        </Form>
      </FormContainer>
    </Container>
  );
};

export const ResetPasswordPage = withSnack(memo(InternalResetPassword));
