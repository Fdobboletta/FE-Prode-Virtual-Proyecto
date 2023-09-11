import { memo, useState } from 'react';
import { RoomPage } from '../room-page';
import { UserRole } from '@/generated/graphql-types.generated';
import { CircularProgress } from '@mui/material';
import {
  GetParticipantsByRoomIdQuery,
  useGetParticipantsByRoomIdQuery,
} from '@/graphql/participants/getParticipantsByRoomId.generated';
import styled from 'styled-components';
import { toRem } from '@/utils';
import { useParams } from 'react-router-dom';
import { ParticipantsTable } from './room-participants-table';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${toRem(16)};
`;

const RoomParticipantsInternal = () => {
  const params = useParams<{ roomId: string }>();

  const [participants, setParticipants] = useState<
    GetParticipantsByRoomIdQuery['getParticipantsByRoomId']
  >([]);

  const { loading: loadingParticipants } = useGetParticipantsByRoomIdQuery({
    variables: {
      roomId: params.roomId || '',
    },
    onCompleted: (data) => {
      if (data.getParticipantsByRoomId) {
        setParticipants(data.getParticipantsByRoomId);
      }
    },
    onError: (error) => {
      console.error('error', error);
    },
  });

  return (
    <RoomPage role={UserRole.Admin}>
      {' '}
      <Container>
        {loadingParticipants ? (
          <CircularProgress size={24} />
        ) : (
          <ParticipantsTable participants={participants} />
        )}
      </Container>
    </RoomPage>
  );
};

export const RoomParticipants = memo(RoomParticipantsInternal);
