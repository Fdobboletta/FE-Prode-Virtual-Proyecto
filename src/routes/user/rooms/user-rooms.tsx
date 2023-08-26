import { Room } from '@/generated/graphql-types.generated';
import { memo, useCallback, useState } from 'react';
import { UserPage } from '../user-page';
import { Stack } from '@mui/material';
import { useModal } from '@/components/modal-container';
import { RoomPaymentModal } from './room-payment-modal';
import { UserRoomCard } from './user-room-card';
import { useGetActiveUnpaidRoomsQuery } from '@/graphql/rooms/getActiveUnpaidRooms.generated';

const UserRoomsInternal = () => {
  const [activeRooms, setActiveRooms] = useState<Room[]>([]);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const paymentModalController = useModal();

  const { loading } = useGetActiveUnpaidRoomsQuery({
    onCompleted: (data) => {
      if (data.getActiveUnpaidRooms) {
        setActiveRooms(data.getActiveUnpaidRooms);
      }
    },
  });

  const handlePayButtonClick = useCallback((roomId: string) => {
    setSelectedRoomId(roomId);
    paymentModalController.onOpenModal();
  }, []);

  if (loading) return null;

  return (
    <UserPage>
      <Stack alignItems={'center'}>
        {activeRooms.map((room) => (
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
    </UserPage>
  );
};

export const UserRooms = memo(UserRoomsInternal);
