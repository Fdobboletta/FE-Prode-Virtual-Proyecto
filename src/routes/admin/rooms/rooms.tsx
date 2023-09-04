import { memo, useState } from 'react';
import { AdminPage } from '../admin-page';
import styled from 'styled-components';
import { toRem } from '@/utils';

import {
  CreateRoomMutationVariables,
  useCreateRoomMutation,
} from '@/graphql/createRoom.generated';

import { useGetUserMpAccessTokenQuery } from '@/graphql/getUserMpAccessToken.generated';
import {
  GetRoomsByUserIdQuery,
  useGetRoomsByUserIdQuery,
} from '@/graphql/getRoomsByUser.generated';
import { CircularProgress } from '@mui/material';

import { LoadedRooms } from './loaded-rooms';
import { useActivateRoomMutation } from '@/graphql/activateRoom.generated';
import { useDeleteRoomMutation } from '@/graphql/deleteRoom.generated';

import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';
import { useUpdateRoomMutation } from '@/graphql/updateRoom.generated';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${toRem(16)};
`;

export type RoomPageInternalRoom = GetRoomsByUserIdQuery['getRoomsByUserId'][0];

const RoomsPageInternal = (props: WithSnackbarProps) => {
  const [rooms, setRooms] = useState<RoomPageInternalRoom[]>([]);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const [isIntegrated, setIsIntegrated] = useState(false);
  const [createRoom, { loading: loadingCreateRoom }] = useCreateRoomMutation();
  const [activateRoom] = useActivateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const { loading: loadingGetAccessTokenQuery } = useGetUserMpAccessTokenQuery({
    onCompleted: (data) => {
      if (data.getUserMpAccessToken) {
        setIsIntegrated(true);
      }
    },
  });

  const { loading: loadingRooms } = useGetRoomsByUserIdQuery({
    onCompleted: (data) => {
      if (data.getRoomsByUserId) {
        setRooms(data.getRoomsByUserId);
      }
    },
  });

  const handleCreateRoom = async (newRoom: CreateRoomMutationVariables) => {
    try {
      const createdRoom = await createRoom({
        variables: newRoom,
        optimisticResponse: {
          createRoom: {
            id: 'new-room',
            paymentLink: 'noLink',
            isClosed: false,
            ...newRoom,
          },
        },
        onCompleted: () => {
          props.snackbarShowMessage(
            3000,
            'Sala creada exitosamente',
            snackSeverity.success
          );
        },
        onError: (error) => {
          props.snackbarShowMessage(
            4000,
            'Ocurrio un error al intentar crear su sala',
            snackSeverity.error
          );
          if (error.message) {
            setServerErrorMessage(error.message);
          }
        },
      });
      if (createdRoom.data && createdRoom.data.createRoom) {
        const addNewRoom = createdRoom.data.createRoom;
        setRooms((prevState) => [...prevState, addNewRoom]);
      }
    } catch (error) {
      console.error('Error al crear la sala:', error);
    }
  };

  const handleConfirmActivateRoom = async (roomId: string) => {
    try {
      await activateRoom({
        variables: {
          roomId,
        },
        onCompleted: () => {
          props.snackbarShowMessage(
            4000,
            'Su sala fue publicada',
            snackSeverity.success
          );
        },
        onError: () => {
          props.snackbarShowMessage(
            4000,
            'Ocurrio un error al intentar publicada su sala',
            snackSeverity.error
          );
        },
      });
      setRooms((prevRoomsArray) => {
        return prevRoomsArray.map((room) => {
          if (room.id === roomId) {
            return { ...room, isActive: true };
          }
          return room;
        });
      });
    } catch (error) {
      console.error('Error al activar sala', error);
    }
  };

  const handleUpdateRoom = async (roomToUpdate: RoomPageInternalRoom) => {
    try {
      const updatedRoom = await updateRoom({
        variables: {
          roomId: roomToUpdate.id,
          name: roomToUpdate.name,
          prizeMoney: roomToUpdate.prizeMoney,
          entryPrice: roomToUpdate.entryPrice,
          isActive: roomToUpdate.isActive,
          dueDate: roomToUpdate.dueDate,
        },
        onCompleted: () => {
          props.snackbarShowMessage(
            4000,
            'Su sala fue editada con exito',
            snackSeverity.success
          );
        },
        onError: () => {
          props.snackbarShowMessage(
            4000,
            'Ocurrio un error al intentar editar su sala',
            snackSeverity.error
          );
        },
      });
      if (updatedRoom.data && updatedRoom.data.updateRoom) {
        const newlyUpdatedRoom = updatedRoom.data.updateRoom;
        setRooms((prevRoomsArray) => {
          return prevRoomsArray.map((room) => {
            if (room.id === roomToUpdate.id) {
              return newlyUpdatedRoom;
            }
            return room;
          });
        });
      }
    } catch (error) {
      console.error('Error al editar la sala', error);
    }
  };

  const handleConfirmDeleteRoom = async (roomId: string) => {
    try {
      await deleteRoom({
        variables: {
          roomId,
        },
        onCompleted: () => {
          props.snackbarShowMessage(
            4000,
            'Su sala fue eliminada correctamente',
            snackSeverity.success
          );
        },
        onError: () => {
          props.snackbarShowMessage(
            4000,
            'Ocurrio un error al intentar eliminar su sala',
            snackSeverity.error
          );
        },
      });
      setRooms((prevRoomsArray) =>
        prevRoomsArray.filter((room) => room.id !== roomId)
      );
    } catch (error) {
      console.error('Error al activar sala', error);
    }
  };

  return (
    <AdminPage title="Salas">
      <PageContainer>
        {loadingRooms ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <LoadedRooms
            serverErrorMessage={serverErrorMessage}
            onConfirmActivateRoom={handleConfirmActivateRoom}
            onConfirmDeleteRoom={handleConfirmDeleteRoom}
            onCreateRoom={handleCreateRoom}
            onUpdateRoom={handleUpdateRoom}
            rooms={rooms}
            isIntegrated={isIntegrated}
            loadingCreateRoom={loadingCreateRoom}
            loadingGetAccessToken={loadingGetAccessTokenQuery}
          />
        )}
      </PageContainer>
    </AdminPage>
  );
};

export const RoomsPage = withSnack(memo(RoomsPageInternal));
