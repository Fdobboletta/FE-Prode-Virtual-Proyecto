import { toRem } from '@/utils';
import React, { useState } from 'react';
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

const StyledButton = styled.button`
  height: ${toRem(40)};
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

type UserProfileUpdateFormProps = {
  // Define las propiedades necesarias, si las hay
};

const validateCellphone = (cellphone: string): boolean => {
  const cellphoneRegex = /^(\+?54)?\s*9?\s*([1-9]{2})\s*\d{4}(\s*\d{2}){2}$/;
  return cellphoneRegex.test(cellphone);
};

const UserProfileUpdateForm: React.FC<UserProfileUpdateFormProps> = (props) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const [passwordError, setPasswordError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    } else {
      setPasswordError('');
    }

    // Validación de número de teléfono
    if (!validateCellphone(formData.phone)) {
      setPhoneError('El número de teléfono no es válido');
      return;
    } else {
      setPhoneError('');
    }

    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
  };

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormRow>
          <StyledLabel>Contraseña:</StyledLabel>
          <StyledInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </StyledFormRow>
        <StyledFormRow>
          <StyledLabel>Confirmar Contraseña:</StyledLabel>
          <StyledInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <StyledErrorMessage>{passwordError}</StyledErrorMessage>
          )}
        </StyledFormRow>
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
        <StyledButton disabled type="submit">
          Actualizar
        </StyledButton>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default UserProfileUpdateForm;
