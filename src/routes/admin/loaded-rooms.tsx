import { useModal } from '@/components/modal-container';
import { Room } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { AccordionWithTable } from './components/accordion-table';
import { memo, useMemo } from 'react';
import { CreateRoomModal } from './components/create-room-modal';
import { CreateRoomMutationVariables } from '@/graphql/createRoom.generated';

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
};

const LoadedRoomsInternal = (props: LoadedRoomsProps) => {
  const createRoomModalController = useModal();

  const activeRooms = useMemo(
    () => props.rooms.filter((room) => room.isActive),
    [props.rooms]
  );
  const inactiveRooms = useMemo(
    () => props.rooms.filter((room) => !room.isActive),
    [props.rooms]
  );

  return (
    <AccordionGroupContainer>
      <StyledButton
        disabled={props.loadingGetAccessToken || !props.isIntegrated}
        onClick={() => {
          createRoomModalController.onOpenModal();
        }}
      >
        {props.loadingGetAccessToken ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          '+ Crear nueva Sala'
        )}
      </StyledButton>
      <AccordionWithTable title="SALAS ACTIVAS" data={activeRooms} />
      <Spacer />
      <AccordionWithTable title="SALAS INACTIVAS" data={inactiveRooms} />
      <CreateRoomModal
        loading={props.loadingCreateRoom}
        onCreateRoom={props.onCreateRoom}
        onCancel={createRoomModalController.onCloseModal}
        isOpen={createRoomModalController.modalOpen}
      />
    </AccordionGroupContainer>
  );
};

export const LoadedRooms = memo(LoadedRoomsInternal);
