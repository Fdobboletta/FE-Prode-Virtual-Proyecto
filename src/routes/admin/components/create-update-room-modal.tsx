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
import { Room } from '@/generated/graphql-types.generated';

type CreateOrUpdateRoomModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onCreateRoom: (newRoom: CreateRoomMutationVariables) => void;
  onEditRoom: (editedRoom: Room) => void;
  loading: boolean;
  roomToEdit: Room | null;
};

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
        const isoDueDate = buildDueDate(
          updatedFormData.dueDate,
          updatedFormData.dueTime
        );

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
          formData={formData}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
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
          {props.roomToEdit ? 'Editar Sala' : 'Crear Sala'}
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CreateOrUpdateRoomModal = memo(CreateOrUpdateRoomModalInternal);
