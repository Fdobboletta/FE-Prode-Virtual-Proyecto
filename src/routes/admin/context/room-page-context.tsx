import { Room } from '@/generated/graphql-types.generated';
import { createTypedContext } from '@/utils';

export type RoomPageContext = {
  room: Omit<Room, 'creatorId' | 'creator' | 'participantsCount'>;
};

export const [useRoomPageContext, RoomPageContextProvider] =
  createTypedContext<RoomPageContext>();
