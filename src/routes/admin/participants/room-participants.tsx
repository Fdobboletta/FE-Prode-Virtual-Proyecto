import { memo } from 'react';
import { RoomPage } from '../room-page';

const RoomParticipantsInternal = () => {
  return <RoomPage>Hello World!</RoomPage>;
};

export const RoomParticipants = memo(RoomParticipantsInternal);
