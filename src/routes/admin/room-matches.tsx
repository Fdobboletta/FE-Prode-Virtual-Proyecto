import { memo } from 'react';
import { RoomPage } from './room-page';

const RoomMatchesInternal = () => {
  return <RoomPage>Hello World!</RoomPage>;
};

export const RoomMatches = memo(RoomMatchesInternal);
