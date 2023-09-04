import { UserRole } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { AccountCircle, Lock } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { memo } from 'react';
import styled from 'styled-components';

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  cellphone: string;
  termsAccepted: boolean;
  userRole: UserRole;
}

type SignUpFormProps = {
  emailError: string;
  cellphoneError: string;
  passwordError: string;
  formValues: RegisterFormValues;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledAccountCircle = styled(AccountCircle)`
  margin-right: ${toRem(6)};
`;
const StyledLock = styled(Lock)`
  margin-right: ${toRem(6)};
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 0px !important;
`;

const SignUpFormInternal = (props: SignUpFormProps): JSX.Element => {
  return (
    <>
      <StyledTextField
        label="Email"
        margin="normal"
        variant="outlined"
        name="email"
        type="email"
        fullWidth
        error={!!props.emailError}
        helperText={props.emailError}
        value={props.formValues.email}
        onChange={props.handleInputChange}
        InputProps={{
          startAdornment: <StyledAccountCircle />,
        }}
      />
      <StyledTextField
        label="Contraseña"
        margin="normal"
        variant="outlined"
        type="password"
        name="password"
        fullWidth
        value={props.formValues.password}
        error={!!props.passwordError}
        helperText={props.passwordError}
        onChange={props.handleInputChange}
        InputProps={{
          startAdornment: <StyledLock />,
        }}
      />
      <StyledTextField
        label="Confirmar Contraseña"
        margin="normal"
        variant="outlined"
        type="password"
        name="confirmPassword"
        fullWidth
        value={props.formValues.confirmPassword}
        error={!!props.passwordError}
        helperText={props.passwordError}
        onChange={props.handleInputChange}
        InputProps={{
          startAdornment: <StyledLock />,
        }}
      />
      <StyledTextField
        label="Nombre"
        margin="normal"
        variant="outlined"
        name="firstName"
        fullWidth
        value={props.formValues.firstName}
        onChange={props.handleInputChange}
      />
      <StyledTextField
        label="Apellido"
        margin="normal"
        variant="outlined"
        name="lastName"
        fullWidth
        value={props.formValues.lastName}
        onChange={props.handleInputChange}
      />
      <StyledTextField
        label="Direccion"
        margin="normal"
        variant="outlined"
        name="address"
        fullWidth
        value={props.formValues.address}
        onChange={props.handleInputChange}
      />
      <StyledTextField
        label="Numero Telefonico"
        margin="normal"
        variant="outlined"
        name="cellphone"
        fullWidth
        type={'tel'}
        value={props.formValues.cellphone}
        onChange={props.handleInputChange}
        error={!!props.cellphoneError}
        helperText={props.cellphoneError}
      />
    </>
  );
};

export const SignUpForm = memo(SignUpFormInternal);
