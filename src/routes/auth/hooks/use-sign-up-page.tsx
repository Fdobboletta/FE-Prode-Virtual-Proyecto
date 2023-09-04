import { useCallback, useState } from 'react';
import { RegisterFormValues } from '../components/sing-up-form';
import { useLocalStorageState } from 'ahooks';
import { useRegisterUserMutation } from '@/graphql/registerUser.generated';
import { SelectChangeEvent } from '@mui/material';
import { UserRole } from '@/generated/graphql-types.generated';
import { useNavigate } from 'react-router';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateCellphone = (cellphone: string): boolean => {
  const cellphoneRegex = /^(\+?54)?\s*9?\s*([1-9]{2})\s*\d{4}(\s*\d{2}){2}$/;
  return cellphoneRegex.test(cellphone);
};

export const useSignUpPage = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [cellphoneError, setCellphoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
    cellphone: '',
    termsAccepted: false,
    userRole: UserRole.Player,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAuthData] = useLocalStorageState<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
  }>('authData');

  const [registerUser, { loading }] = useRegisterUserMutation({
    onCompleted: (data) => {
      setAuthData({
        id: data.registerNewUser.id,
        firstName: data.registerNewUser.firstName,
        lastName: data.registerNewUser.lastName,
        email: data.registerNewUser.email,
        role: data.registerNewUser.role,
      });
      if (data.registerNewUser.token) {
        localStorage.setItem('authToken', data.registerNewUser.token);
      }
      navigate('/user');
    },
    onError: (mutationError) => {
      if (mutationError.message) {
        setEmailError(mutationError.message);
      }
    },
  });

  const handleNext = useCallback(() => {
    setActiveStep((prevStep) => prevStep + 1);
  }, []);

  const handleBack = useCallback((previousStep: number) => {
    if (previousStep === 0) {
      navigate('/login');
    }
    setActiveStep((prevStep) => prevStep - 1);
  }, []);

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

  const handleTermsCheckboxChange = useCallback((checked: boolean) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      termsAccepted: checked,
    }));
  }, []);

  const handleUserRoleSelect = useCallback(
    (event: SelectChangeEvent<UserRole>) => {
      const userRole = event.target.value as UserRole;
      setFormValues((prevValues) => ({
        ...prevValues,
        userRole,
      }));
    },
    []
  );

  const handleStepSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>, step: number) => {
      event.preventDefault();

      let isValid = true;
      const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        address,
        cellphone,
        userRole,
        termsAccepted,
      } = formValues;

      if (step === 0) {
        handleNext();
      } else if (step === 1) {
        if (!validateEmail(email)) {
          setEmailError('El valor ingresado no corresponde a un email');
          isValid = false;
        } else {
          setEmailError('');
        }

        if (!validateCellphone(cellphone)) {
          setCellphoneError(
            'El valor ingresado no corresponde a un numero telefonico'
          );
          isValid = false;
        } else {
          setCellphoneError('');
        }

        if (password !== confirmPassword) {
          setPasswordError('Las contraseñas no coinciden');
          isValid = false;
        } else {
          setPasswordError('');
        }

        if (isValid) {
          handleNext();
        }
      } else if (step === 2) {
        if (isValid) {
          await registerUser({
            variables: {
              email,
              password,
              firstName,
              lastName,
              address,
              cellphone,
              role: userRole,
              termsAccepted,
            },
          });
        }
      }
    },
    [formValues]
  );

  return {
    handleStepSubmit,
    handleInputChange,
    handleUserRoleSelect,
    handleTermsCheckboxChange,
    handleBack,
    emailError,
    cellphoneError,
    passwordError,
    activeStep,
    loading,
    formValues,
  };
};
