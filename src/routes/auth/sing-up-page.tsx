import { memo } from 'react';

import styled from 'styled-components';
import {
  Button,
  CircularProgress,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';

import { toRem } from '@/utils';
import { Logo } from '@/logo';
import { UserRole } from '@/generated/graphql-types.generated';
import TermsAndConditions from './components/terms-and-conditions';
import { SignUpForm } from './components/sing-up-form';
import { useSignUpPage } from './hooks/use-sign-up-page';

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
  width: 90%;
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

const ExpandContent = styled.div`
  flex-grow: 1;
`;

const StyledRegisterButton = styled(Button)`
  margin-top: ${toRem(6)} !important;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
`;

const steps = [
  'Selecciona el tipo de usuario',
  'Completa tus datos',
  'Acepta términos',
];

const InternalRegister = (): JSX.Element => {
  const controller = useSignUpPage();
  return (
    <Container>
      <Logo />
      <FormContainer>
        <Stepper activeStep={controller.activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Form
          onSubmit={(event) =>
            controller.handleStepSubmit(event, controller.activeStep)
          }
          style={{ marginTop: `${toRem(12)}` }}
        >
          {controller.activeStep === 0 && (
            <>
              <InputLabel id="demo-simple-select-label">
                Tipo de usuario
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={controller.formValues.userRole}
                onChange={(event) => controller.handleUserRoleSelect(event)}
                renderValue={(selected) => {
                  if (UserRole.Admin === selected) {
                    return 'Administrador';
                  }
                  return 'Jugador';
                }}
              >
                <MenuItem value={UserRole.Player}>
                  <ListItemText
                    primary="Jugador"
                    secondary="El usuario 'Jugador' solo podra participar de los prodes creados por un administrador"
                  />
                </MenuItem>
                <MenuItem value={UserRole.Admin}>
                  <ListItemText
                    primary="Administrador"
                    secondary="El usuario administrador sera el encargado de crear prodes para que los demas usuarios"
                  />
                </MenuItem>
              </Select>
            </>
          )}
          {controller.activeStep === 1 && (
            <SignUpForm
              handleInputChange={controller.handleInputChange}
              formValues={controller.formValues}
              emailError={controller.emailError}
              cellphoneError={controller.cellphoneError}
            />
          )}
          {controller.activeStep === 2 && (
            <TermsAndConditions
              termsAccepted={controller.formValues.termsAccepted}
              onChange={controller.handleTermsCheckboxChange}
            />
          )}
          <ButtonsContainer>
            <Button
              style={{ marginRight: `${toRem(6)}` }}
              onClick={() => controller.handleBack(controller.activeStep)}
            >
              Atrás
            </Button>
            <StyledRegisterButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                controller.loading ||
                (controller.activeStep === 2 &&
                  !controller.formValues.termsAccepted)
              }
            >
              {controller.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : controller.activeStep !== 2 ? (
                'Siguiente'
              ) : (
                'Registrarse'
              )}
            </StyledRegisterButton>
          </ButtonsContainer>
          <ExpandContent />
        </Form>
      </FormContainer>
    </Container>
  );
};

export const RegisterPage = memo(InternalRegister);
