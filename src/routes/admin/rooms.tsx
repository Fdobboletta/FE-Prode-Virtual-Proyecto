import { memo, useState } from 'react';
import { AdminPage } from './admin-page';
import styled from 'styled-components';
import { toRem } from '@/utils';

import {
  CreateRoomMutationVariables,
  useCreateRoomMutation,
} from '@/graphql/createRoom.generated';

import { useGetUserMpAccessTokenQuery } from '@/graphql/getUserMpAccessToken.generated';
import { useGetRoomsByUserIdQuery } from '@/graphql/getRoomsByUser.generated';
import { CircularProgress } from '@mui/material';
import { Room } from '@/generated/graphql-types.generated';
import { LoadedRooms } from './loaded-rooms';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${toRem(32)};
`;

const RoomsPageInternal = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isIntegrated, setIsIntegrated] = useState(false);
  const [createRoom, { loading: loadingCreateRoom }] = useCreateRoomMutation();
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
            ...newRoom,
          },
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

  return (
    <AdminPage>
      <PageContainer>
        {loadingRooms ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <LoadedRooms
            onCreateRoom={handleCreateRoom}
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

export const RoomsPage = memo(RoomsPageInternal);
