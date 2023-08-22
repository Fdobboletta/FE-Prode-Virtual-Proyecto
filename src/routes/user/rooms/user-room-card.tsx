import { Room } from '@/generated/graphql-types.generated';
import { memo } from 'react';

import { AttachMoney, EmojiEvents, Event, People } from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import styled from 'styled-components';
import { Button, Card, Stack, Typography } from '@mui/material';
import { toRem } from '@/utils';

type UserRoomCardProps = {
  room: Room;
  onPayButtonClick: (roomId: string) => void;
};

const StyledCard = styled(Card)`
  padding: ${toRem(24)};
  width: calc(100% - ${toRem(48)});
  margin-top: ${toRem(24)};
  background-color: ${(props) => props.theme.palette.background.paper};
  border-radius: ${toRem(12)};
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.palette.text.primary};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const RoomTitle = styled(Typography)`
  font-size: ${toRem(24)};
  font-weight: bold;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: ${toRem(12)};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${toRem(16)};
  margin-top: ${toRem(20)};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${toRem(8)};
`;

const InfoLabel = styled(Typography)`
  font-size: ${toRem(16)};
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const InfoValue = styled(Typography)`
  font-size: ${toRem(16)};
`;

const PayButton = styled(Button)`
  margin-top: ${toRem(24)};
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.secondary.contrastText};
  font-size: ${toRem(16)};
  font-weight: bold;
  padding: ${toRem(12)} ${toRem(24)};
  border-radius: ${toRem(8)};
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.dark};
  }
`;

const UserRoomCardInternal = (props: UserRoomCardProps) => (
  <StyledCard>
    <Stack spacing={2}>
      <RoomTitle variant="h6">{props.room.name}</RoomTitle>
      <InfoGrid>
        <InfoRow>
          <IconContainer>
            <Event />
          </IconContainer>
          <div>
            <InfoLabel>Fecha límite de ingreso</InfoLabel>
            <InfoValue>
              {format(new Date(props.room.dueDate), 'dd/MM/yyyy HH:mm', {
                locale: es,
              })}
            </InfoValue>
          </div>
        </InfoRow>
        <InfoRow>
          <IconContainer>
            <People />
          </IconContainer>
          <div>
            <InfoLabel>Número de participantes</InfoLabel>
            <InfoValue>10</InfoValue>
          </div>
        </InfoRow>
        <InfoRow>
          <IconContainer>
            <AttachMoney />
          </IconContainer>
          <div>
            <InfoLabel>Precio de entrada</InfoLabel>
            <InfoValue>
              $
              {props.room.entryPrice.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </InfoValue>
          </div>
        </InfoRow>
        <InfoRow>
          <IconContainer>
            <EmojiEvents />
          </IconContainer>
          <div>
            <InfoLabel>Premios</InfoLabel>
            <InfoValue>
              $
              {props.room.prizeMoney.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </InfoValue>
          </div>
        </InfoRow>
      </InfoGrid>
      <PayButton
        variant="contained"
        onClick={() => {
          props.onPayButtonClick(props.room.id);
        }}
      >
        Participar de esta Sala
      </PayButton>
    </Stack>
  </StyledCard>
);

export const UserRoomCard = memo(UserRoomCardInternal);
