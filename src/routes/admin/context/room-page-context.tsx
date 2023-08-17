import { Room } from '@/generated/graphql-types.generated';
import { createTypedContext } from '@/utils';

export type RoomPageContext = {
  room: Room;
};

export const [useRoomPageContext, RoomPageContextProvider] =
  createTypedContext<RoomPageContext>();
