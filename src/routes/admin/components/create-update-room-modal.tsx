import {
  ModalBody,
  ModalContainer,
  ModalFooter,
} from '@/components/modal-container';

import { memo, useCallback, useState } from 'react';
import {
  CreateOrUpdateRoomForm,
  CreateOrUpdateRoomFormData,
} from './create-update-room-form';
import { addMinutes, formatISO, parseISO } from 'date-fns';
import { ModalSecondaryButton } from '@/components/modal-container/components/modal-secondary-button';
import { Button } from '@mui/material';
import { CreateRoomMutationVariables } from '@/graphql/createRoom.generated';
import { RoomPageInternalRoom } from '../rooms/rooms';
import styled from 'styled-components';

type CreateOrUpdateRoomModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onCreateRoom: (newRoom: CreateRoomMutationVariables) => void;
  onEditRoom: (editedRoom: RoomPageInternalRoom) => void;
  loading: boolean;
  roomToEdit: RoomPageInternalRoom | null;
  serverErrorMessage: string | null;
};

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.palette.error.main};
  text-align: center;
`;

const initialDate = new Date();

const buildDueDate = (date: Date, time: Date) => {
  const combinedDueDateTime = new Date(date);
  const dueTime = parseISO(time.toISOString());
  combinedDueDateTime.setHours(dueTime.getHours());
  combinedDueDateTime.setMinutes(dueTime.getMinutes());
  return formatISO(combinedDueDateTime);
};

const CreateOrUpdateRoomModalInternal = (
  props: CreateOrUpdateRoomModalProps
) => {
  const [error, setError] = useState({
    entryPrice: false,
    name: false,
    priceMoney: false,
  });
  const [formData, setFormData] = useState<CreateOrUpdateRoomFormData>(
    props.roomToEdit
      ? {
          name: props.roomToEdit.name,
          entryPrice: props.roomToEdit.entryPrice,
          prizeMoney: props.roomToEdit.prizeMoney,
          dueTime: new Date(props.roomToEdit.dueDate),
          dueDate: new Date(props.roomToEdit.dueDate),
        }
      : {
          name: '',
          entryPrice: 0,
          prizeMoney: 0,
          dueDate: initialDate,
          dueTime: addMinutes(initialDate, 30),
        }
  );
  const handleSubmit = useCallback(
    async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      updatedFormData: CreateOrUpdateRoomFormData
    ) => {
      event.preventDefault();
      try {
        let isValid = true;
        const isoDueDate = buildDueDate(
          updatedFormData.dueDate,
          updatedFormData.dueTime
        );

        if (!updatedFormData.name) {
          setError((prevState) => ({ ...prevState, name: true }));
          isValid = false;
        }
        if (!updatedFormData.entryPrice) {
          setError((prevState) => ({ ...prevState, entryPrice: true }));
          isValid = false;
        }

        if (!updatedFormData.prizeMoney) {
          setError((prevState) => ({ ...prevState, priceMoney: true }));
          isValid = false;
        }

        if (!isValid) return;

        if (props.roomToEdit) {
          await props.onEditRoom({
            ...props.roomToEdit,
            name: updatedFormData.name,
            entryPrice: updatedFormData.entryPrice,
            prizeMoney: updatedFormData.prizeMoney,
            dueDate: isoDueDate,
          });
          props.onCancel();
          return;
        }

        await props.onCreateRoom({
          name: updatedFormData.name,
          entryPrice: updatedFormData.entryPrice,
          prizeMoney: updatedFormData.prizeMoney,
          dueDate: isoDueDate,
          isActive: false,
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

      setError({ name: false, entryPrice: false, priceMoney: false });

      if (name === 'prizeMoney' || name === 'entryPrice') {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: parseFloat(value),
        }));
        return;
      }
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
        dueDate: selectedDate,
      }));
    },
    [setFormData]
  );

  const handleTimeChange = useCallback(
    (selectedTime: Date | null) => {
      if (selectedTime === null) return;
      setFormData((prevFormData) => ({
        ...prevFormData,
        dueTime: selectedTime,
      }));
    },
    [setFormData]
  );

  return (
    <ModalContainer
      modalTitle={props.roomToEdit ? 'Editar Sala' : 'Crear Sala'}
      ariaLabel={props.roomToEdit ? 'edit-room-modal' : 'create-room-modal'}
      isModalOpen={props.isOpen}
    >
      <ModalBody>
        <CreateOrUpdateRoomForm
          errors={error}
          formData={formData}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
        />
      </ModalBody>
      {(error.entryPrice ||
        error.name ||
        error.priceMoney ||
        props.serverErrorMessage) && (
        <ErrorMessage>
          {props.serverErrorMessage || 'Todos los campos son requeridos'}
        </ErrorMessage>
      )}
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
          {props.roomToEdit ? 'Editar Sala' : 'Crear Sala'}
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CreateOrUpdateRoomModal = memo(CreateOrUpdateRoomModalInternal);
