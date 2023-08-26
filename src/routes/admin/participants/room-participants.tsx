import { memo } from 'react';
import { RoomPage } from '../room-page';
import { UserRole } from '@/generated/graphql-types.generated';

const RoomParticipantsInternal = () => {
  return <RoomPage role={UserRole.Admin}>Hello World!</RoomPage>;
};

export const RoomParticipants = memo(RoomParticipantsInternal);
