import {
  ModalBody,
  ModalContainer,
  ModalFooter,
} from '@/components/modal-container';

import { memo, useCallback, useState } from 'react';

import { formatISO } from 'date-fns';
import { ModalSecondaryButton } from '@/components/modal-container/components/modal-secondary-button';
import { Button } from '@mui/material';
import { Match } from '@/generated/graphql-types.generated';
import {
  CreateOrUpdateMatchForm,
  CreateOrUpdateMatchFormData,
} from './create-update-match-form';
import { CreateMatchMutationVariables } from '@/graphql/matches/createMatch.generated';

type CreateOrUpdateMatchModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onCreateMatch: (newMatch: CreateMatchMutationVariables) => void;
  onEditMatch: (editedMatch: Match) => void;
  loading: boolean;
  matchToEdit: Match | null;
  roomId: string;
};

const initialDate = new Date();

const CreateOrUpdateMatchModalInternal = (
  props: CreateOrUpdateMatchModalProps
) => {
  const [error, setError] = useState({
    homeTeam: false,
    awayTeam: false,
  });
  const [formData, setFormData] = useState<CreateOrUpdateMatchFormData>(
    props.matchToEdit
      ? {
          homeTeam: props.matchToEdit.homeTeam,
          awayTeam: props.matchToEdit.awayTeam,
          startDate: new Date(props.matchToEdit.startDate),
        }
      : {
          homeTeam: '',
          awayTeam: '',
          startDate: new Date(initialDate),
        }
  );
  const handleSubmit = useCallback(
    async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      updatedFormData: CreateOrUpdateMatchFormData
    ) => {
      event.preventDefault();
      try {
        let isValid = true;
        const isoStartDate = formatISO(updatedFormData.startDate);

        if (!updatedFormData.awayTeam) {
          setError((prevState) => ({ ...prevState, awayTeam: true }));
          isValid = false;
        }
        if (!updatedFormData.homeTeam) {
          setError((prevState) => ({ ...prevState, homeTeam: true }));
          isValid = false;
        }

        if (!isValid) return;

        if (props.matchToEdit) {
          await props.onEditMatch({
            ...props.matchToEdit,
            homeTeam: updatedFormData.homeTeam,
            awayTeam: updatedFormData.awayTeam,
            startDate: isoStartDate,
          });
          props.onCancel();
          return;
        }

        await props.onCreateMatch({
          roomId: props.roomId,
          homeTeam: updatedFormData.homeTeam,
          awayTeam: updatedFormData.awayTeam,
          date: isoStartDate,
        });

        props.onCancel();
      } catch (error) {
        console.error('Error al crear la sala:', error);
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;

      setError((prevErrors) => ({ ...prevErrors, [name]: false }));

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [setFormData]
  );

  const handleDateChange = useCallback(
    (selectedDate: Date | null) => {
      if (selectedDate === null) return;
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: selectedDate,
      }));
    },
    [setFormData]
  );

  return (
    <ModalContainer
      modalTitle={props.matchToEdit ? 'Editar Partido' : 'Crear Partido'}
      ariaLabel={props.matchToEdit ? 'edit-match-modal' : 'create-match-modal'}
      isModalOpen={props.isOpen}
    >
      <ModalBody>
        <CreateOrUpdateMatchForm
          errors={error}
          formData={formData}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
        />
      </ModalBody>
      <ModalFooter>
        <ModalSecondaryButton onClick={() => props.onCancel()} variant="text">
          Cancelar
        </ModalSecondaryButton>
        <Button
          onClick={(event) => handleSubmit(event, formData)}
          variant="contained"
          color="primary"
          type="submit"
          disabled={props.loading}
        >
          {props.matchToEdit ? 'Editar Partido' : 'Crear Partido'}
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CreateOrUpdateMatchModal = memo(CreateOrUpdateMatchModalInternal);
