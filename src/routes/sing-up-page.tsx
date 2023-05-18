import React, { memo, useCallback, useState } from 'react';
import { AccountCircle, Lock } from '@mui/icons-material';
import styled from 'styled-components';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLocalStorageState } from 'ahooks';
import { UserRole } from '../types';
import { toRem } from '../utils';
import { useRegisterUserMutation } from '../graphql/registerUser.generated';
import { Logo } from '../logo';

interface RegisterFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  cellphone: string;
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
const StyledLock = styled(Lock)`
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

const validateCellphone = (cellphone: string): boolean => {
  const cellphoneRegex = /^(\+?54)?\s*9?\s*([1-9]{2})\s*\d{4}(\s*\d{2}){2}$/;
  return cellphoneRegex.test(cellphone);
};

const InternalRegister = (): JSX.Element => {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    cellphone: '',
  });

  const [emailError, setEmailError] = useState('');
  const [cellphoneError, setCellphoneError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAuthData] = useLocalStorageState<{
    email: string;
    role: UserRole;
  }>('authData');

  const navigate = useNavigate();

  const [registerUser, { loading }] = useRegisterUserMutation({
    onCompleted: (data) => {
      setAuthData({
        email: data.registerNewUser.email,
        role: data.registerNewUser.role as UserRole,
      });
      localStorage.setItem('authToken', data.registerNewUser.token);
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
      const { email, password, firstName, lastName, address, cellphone } =
        formValues;

      let isValid = true;

      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        isValid = false;
      } else {
        setEmailError('');
      }

      if (!validateCellphone(cellphone)) {
        setCellphoneError('Invalid cellphone format');
        isValid = false;
      } else {
        setCellphoneError('');
      }

      if (isValid) {
        await registerUser({
          variables: {
            email,
            password,
            firstName,
            lastName,
            address,
            cellphone,
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
          <TextField
            label="Nombre"
            margin="normal"
            variant="outlined"
            name="firstName"
            fullWidth
            value={formValues.firstName}
            onChange={handleInputChange}
          />
          <TextField
            label="Apellido"
            margin="normal"
            variant="outlined"
            name="lastName"
            fullWidth
            value={formValues.lastName}
            onChange={handleInputChange}
          />
          <TextField
            label="Direccion"
            margin="normal"
            variant="outlined"
            name="address"
            fullWidth
            value={formValues.address}
            onChange={handleInputChange}
          />
          <TextField
            label="Numero Telefonico"
            margin="normal"
            variant="outlined"
            name="cellphone"
            fullWidth
            type={'tel'}
            value={formValues.cellphone}
            onChange={handleInputChange}
            error={!!cellphoneError}
            helperText={cellphoneError}
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
              'Registrarse'
            )}
          </StyledRegisterButton>
          <ExpandContent />
        </Form>
      </FormContainer>
    </Container>
  );
};

export const RegisterPage = memo(InternalRegister);
