import { Room } from '@/generated/graphql-types.generated';
import { useGetActiveRoomsQuery } from '@/graphql/rooms/getActiveRooms.generated';
import { memo, useState } from 'react';
import { UserPage } from '../user-page';
import { Button, Card, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { toRem } from '@/utils';
import { useModal } from '@/components/modal-container';
import { RoomPaymentModal } from './room-payment-modal';
import { AttachMoney, EmojiEvents, Event, People } from '@mui/icons-material';

const StyledCard = styled(Card)`
  padding: ${toRem(16)};
  width: calc(100% - ${toRem(32)});
  margin-top: ${toRem(20)};
  background-color: ${(props) => props.theme.palette.background.paper};
  border-radius: ${toRem(8)};
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.08);
  color: ${(props) => props.theme.palette.text.primary};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const RoomTitle = styled(Typography)`
  font-size: ${toRem(18)};
  font-weight: bold;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: ${toRem(8)};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${toRem(12)};

  & > * {
    margin-right: ${toRem(8)};
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${toRem(4)};
`;

const InfoText = styled(Typography)`
  font-size: ${toRem(14)};
  color: ${(props) => props.theme.palette.text.secondary};
`;

const PayButton = styled(Button)`
  margin-top: ${toRem(16)};
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.secondary.contrastText};

  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.dark};
  }
`;
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

  if (loading) return null;

  return (
    <UserPage>
      <Stack alignItems={'center'}>
        {activeRooms.map((room) => (
          <StyledCard key={room.id}>
            <Stack spacing={2}>
              <RoomTitle variant="h6">{room.name}</RoomTitle>
              <InfoContainer>
                <IconContainer>
                  <Event />
                </IconContainer>
                <InfoText variant="body2">
                  Fecha límite de ingreso: {room.dueDate}
                </InfoText>
              </InfoContainer>
              <InfoContainer>
                <IconContainer>
                  <AttachMoney />
                </IconContainer>
                <InfoText variant="body2">
                  Precio de entrada: {room.entryPrice}
                </InfoText>
              </InfoContainer>
              <InfoContainer>
                <IconContainer>
                  <EmojiEvents />
                </IconContainer>
                <InfoText variant="body2">Premios: {room.prizeMoney}</InfoText>
              </InfoContainer>
              <InfoContainer>
                <IconContainer>
                  <People />
                </IconContainer>
                <InfoText variant="body2">Número de participantes: 2</InfoText>
              </InfoContainer>
              <PayButton
                variant="contained"
                onClick={() => {
                  setSelectedRoomId(room.id);
                  paymentModalController.onOpenModal();
                }}
              >
                Pagar
              </PayButton>
            </Stack>
          </StyledCard>
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
