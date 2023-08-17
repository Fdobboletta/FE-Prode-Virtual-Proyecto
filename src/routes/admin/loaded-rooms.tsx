import { ConfirmationModal, useModal } from '@/components/modal-container';
import { Room } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { AccordionWithTable } from './components/accordion-table';
import { memo, useMemo, useState } from 'react';

import { CreateRoomMutationVariables } from '@/graphql/createRoom.generated';
import { CreateOrUpdateRoomModal } from './components/create-update-room-modal';

const AccordionGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: ${toRem(200)};
  justify-content: flex-end !important;
  align-self: flex-end;
  &&& {
    &:hover {
      text-decoration: underline;
      background-color: transparent;
    }
    &:focus {
      background-color: transparent;
    }
  }
`;

const Spacer = styled.div`
  margin-top: ${toRem(6)};
`;

type LoadedRoomsProps = {
  rooms: Room[];
  loadingGetAccessToken: boolean;
  loadingCreateRoom: boolean;
  isIntegrated: boolean;
  onCreateRoom: (newRoom: CreateRoomMutationVariables) => void;
  onUpdateRoom: (room: Room) => void;
  onConfirmActivateRoom: (roomId: string) => void;
  onConfirmDeleteRoom: (roomId: string) => void;
};

const LoadedRoomsInternal = (props: LoadedRoomsProps) => {
  const createOrUpdateRoomModalController = useModal();
  const activateRoomModalController = useModal();
  const deleteRoomModalController = useModal();

  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);

  const activeRooms = useMemo(
    () => props.rooms.filter((room) => room.isActive),
    [props.rooms]
  );
  const inactiveRooms = useMemo(
    () => props.rooms.filter((room) => !room.isActive),
    [props.rooms]
  );

  const handleActivateRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    activateRoomModalController.onOpenModal();
  };

  const handleEditRoom = (roomId: string) => {
    const selectedRoomToEdit = props.rooms.find((room) => room.id === roomId);

    if (selectedRoomToEdit) {
      setRoomToEdit(selectedRoomToEdit);
    }
    createOrUpdateRoomModalController.onOpenModal();
  };

  const handleDeleteRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    deleteRoomModalController.onOpenModal();
  };
  const handleCreateRoomModalCancel = () => {
    setRoomToEdit(null);
    createOrUpdateRoomModalController.onCloseModal();
  };

  return (
    <AccordionGroupContainer>
      <StyledButton
        disabled={props.loadingGetAccessToken || !props.isIntegrated}
        onClick={() => {
          createOrUpdateRoomModalController.onOpenModal();
        }}
      >
        {props.loadingGetAccessToken ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          '+ Crear nueva Sala'
        )}
      </StyledButton>
      <AccordionWithTable
        inactiveRooms={false}
        title="SALAS PUBLICADAS"
        data={activeRooms}
        onDeleteRoom={handleDeleteRoom}
      />
      <Spacer />
      <AccordionWithTable
        title="SALAS NO PUBLICADAS"
        inactiveRooms
        data={inactiveRooms}
        onEditRoom={handleEditRoom}
        onActivateRoom={handleActivateRoom}
        onDeleteRoom={handleDeleteRoom}
      />
      {createOrUpdateRoomModalController.modalOpen && (
        <CreateOrUpdateRoomModal
          roomToEdit={roomToEdit}
          onEditRoom={props.onUpdateRoom}
          loading={props.loadingCreateRoom}
          onCreateRoom={props.onCreateRoom}
          onCancel={handleCreateRoomModalCancel}
          isOpen={createOrUpdateRoomModalController.modalOpen}
        />
      )}
      <ConfirmationModal
        ariaLabel={'confirmar-publicacion-sala'}
        isModalOpen={activateRoomModalController.modalOpen}
        onConfirm={() => {
          props.onConfirmActivateRoom(selectedRoomId);
          activateRoomModalController.onCloseModal();
        }}
        onCancel={() => activateRoomModalController.onCloseModal()}
        onCloseModal={() => activateRoomModalController.onCloseModal()}
        modalTitle="Publicar Sala?"
      >
        Una vez publicados, los datos de la sala no podran ser editados
      </ConfirmationModal>
      <ConfirmationModal
        ariaLabel={'confirmar-borrar-sala'}
        isModalOpen={deleteRoomModalController.modalOpen}
        onConfirm={() => {
          props.onConfirmDeleteRoom(selectedRoomId);
          deleteRoomModalController.onCloseModal();
        }}
        onCancel={() => deleteRoomModalController.onCloseModal()}
        onCloseModal={() => deleteRoomModalController.onCloseModal()}
        modalTitle="Desea eliminar la sala?"
      >
        Une vez eliminada una sala, sus datos no podran recuperarse
      </ConfirmationModal>
    </AccordionGroupContainer>
  );
};

export const LoadedRooms = memo(LoadedRoomsInternal);
