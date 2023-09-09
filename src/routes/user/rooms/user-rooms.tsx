import { memo, useCallback, useState } from 'react';
import { UserPage } from '../user-page';
import { CircularProgress, Stack } from '@mui/material';
import { useModal } from '@/components/modal-container';
import { RoomPaymentModal } from './room-payment-modal';
import { UserRoomCard } from './user-room-card';
import {
  GetActiveUnpaidRoomsQuery,
  useGetActiveUnpaidRoomsQuery,
} from '@/graphql/rooms/getActiveUnpaidRooms.generated';
import { UserRoomEmptyState } from './user-room-empty-state';
import { toRem } from '@/utils';
import styled from 'styled-components';

export type UnpaidRoom = GetActiveUnpaidRoomsQuery['getActiveUnpaidRooms'][0];

const CenterLoadingContainer = styled.div`
  width: 100%;
  margin-top: ${toRem(32)};
  display: flex;
  justify-content: center;
`;

const UserRoomsInternal = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const paymentModalController = useModal();

  const { loading, data, refetch } = useGetActiveUnpaidRoomsQuery();

  const handlePayButtonClick = useCallback((roomId: string) => {
    setSelectedRoomId(roomId);
    paymentModalController.onOpenModal();
  }, []);

  return (
    <UserPage>
      {loading || !data ? (
        <CenterLoadingContainer>
          <CircularProgress />
        </CenterLoadingContainer>
      ) : (
        <>
          <Stack alignItems={'center'}>
            {data.getActiveUnpaidRooms.length === 0 && (
              <UserRoomEmptyState onRefresh={() => refetch()} />
            )}
            {data.getActiveUnpaidRooms.map((room) => (
              <UserRoomCard
                key={room.id}
                room={room}
                onPayButtonClick={handlePayButtonClick}
              />
            ))}
          </Stack>
          {selectedRoomId && paymentModalController.modalOpen && (
            <RoomPaymentModal
              ariaLabel="room-payment-modal"
              isModalOpen={paymentModalController.modalOpen}
              roomId={selectedRoomId}
              onCancel={() => {
                setSelectedRoomId(null);
                paymentModalController.onCloseModal();
              }}
              onCloseModal={() => {
                setSelectedRoomId(null);
                paymentModalController.onCloseModal();
              }}
            />
          )}
        </>
      )}
    </UserPage>
  );
};

export const UserRooms = memo(UserRoomsInternal);
