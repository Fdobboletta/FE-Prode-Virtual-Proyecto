import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';
import { UserRole } from '@/generated/graphql-types.generated';
import { useUpdateUserDataMutation } from '@/graphql/user/updateUserData.generated';
import { toRem } from '@/utils';
import { CircularProgress } from '@mui/material';
import { useLocalStorageState } from 'ahooks';
import React, { memo, useState } from 'react';
import styled from 'styled-components';

const StyledFormContainer = styled.div`
  padding: ${toRem(48)};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${toRem(16)};
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  height: ${toRem(40)};
  border: ${toRem(1)} solid #ccc;
  border-radius: ${toRem(4)};
  padding: ${toRem(8)};
  font-size: ${toRem(16)};
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  height: ${toRem(40)};
  min-width: ${toRem(200)};
  max-width: ${toRem(300)};
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: ${toRem(4)};
  font-size: ${toRem(16)};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    &:hover {
      background-color: #007bff;
    }
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: ${toRem(14)};
  margin-top: ${toRem(4)};
`;

type UserProfileUpdateFormProps = WithSnackbarProps;

const validateCellphone = (cellphone: string): boolean => {
  const cellphoneRegex = /^(\+?54)?\s*9?\s*([1-9]{2})\s*\d{4}(\s*\d{2}){2}$/;
  return cellphoneRegex.test(cellphone);
};

const UserProfileUpdateFormInternal: React.FC<UserProfileUpdateFormProps> = (
  props
) => {
  const [authData, setAuthData] = useLocalStorageState<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    role: UserRole;
  }>('authData');

  const [updateUserData, { loading }] = useUpdateUserDataMutation();

  const [formData, setFormData] = useState({
    address: authData?.address || '',
    phone: authData?.phone || '',
    firstName: authData?.firstName || '',
    lastName: authData?.lastName || '',
  });

  const [phoneError, setPhoneError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación de número de teléfono
    if (!validateCellphone(formData.phone)) {
      setPhoneError('El número de teléfono no es válido');
      return;
    } else {
      setPhoneError('');
    }

    await updateUserData({
      variables: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        cellphone: formData.phone,
      },
      onCompleted: (data) => {
        if (data.updateUserData) {
          setAuthData({
            id: data.updateUserData.id,
            email: data.updateUserData.email,
            firstName: data.updateUserData.firstName,
            lastName: data.updateUserData.lastName,
            address: data.updateUserData.lastName,
            phone: data.updateUserData.cellphone,
            role: data.updateUserData.role,
          });
          props.snackbarShowMessage(
            4000,
            'Los datos del usuario fueron actualizados exitosamente',
            snackSeverity.success
          );
        }
      },
      onError: () => {
        props.snackbarShowMessage(
          4000,
          'Ocurrio un error al actualizar los datos del usuario',
          snackSeverity.error
        );
      },
    });
  };

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormRow>
          <StyledLabel>Dirección:</StyledLabel>
          <StyledInput
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </StyledFormRow>
        <StyledFormRow>
          <StyledLabel>Teléfono:</StyledLabel>
          <StyledInput
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {phoneError && <StyledErrorMessage>{phoneError}</StyledErrorMessage>}
        </StyledFormRow>
        <StyledFormRow>
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </StyledFormRow>
        <StyledFormRow>
          <StyledLabel>Apellido:</StyledLabel>
          <StyledInput
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </StyledFormRow>
        <SubmitButtonContainer>
          <StyledButton disabled={loading} type="submit">
            {loading ? <CircularProgress /> : 'Actualizar'}
          </StyledButton>
        </SubmitButtonContainer>
      </StyledForm>
    </StyledFormContainer>
  );
};

export const UserProfileUpdateForm = memo(
  withSnack(UserProfileUpdateFormInternal)
);
