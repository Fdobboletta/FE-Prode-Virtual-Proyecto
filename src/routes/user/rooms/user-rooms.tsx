import { Room } from '@/generated/graphql-types.generated';
import { useGetActiveRoomsQuery } from '@/graphql/rooms/getActiveRooms.generated';
import { memo, useCallback, useState } from 'react';
import { UserPage } from '../user-page';
import { Stack } from '@mui/material';
import { useModal } from '@/components/modal-container';
import { RoomPaymentModal } from './room-payment-modal';
import { UserRoomCard } from './user-room-card';

const UserRoomsInternal = () => {
  const [activeRooms, setActiveRooms] = useState<Room[]>([]);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const paymentModalController = useModal();

  const { loading } = useGetActiveRoomsQuery({
    onCompleted: (data) => {
      if (data.getActiveRooms) {
        setActiveRooms(data.getActiveRooms);
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
