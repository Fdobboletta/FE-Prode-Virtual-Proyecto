import { memo, useState } from 'react';

import { toRem } from '@/utils';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

import { useParams } from 'react-router';

import _ from 'lodash';

import { onError } from '@apollo/client/link/error';

import {
  GetParticipantsByRoomIdQuery,
  useGetParticipantsByRoomIdQuery,
} from '@/graphql/participants/getParticipantsByRoomId.generated';
import ParticipantsRanking from '@/components/participants-ranking/participants-ranking';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${toRem(16)};
`;

const ParticipantsRankingPageInternal = () => {
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
        const sortedMatches = _.orderBy(
          data.getParticipantsByRoomId,
          ['score'],
          ['desc']
        );
        setParticipants(sortedMatches);
      }
      onError((error) => {
        console.error('error', error);
      });
    },
  });

  return (
    <Container>
      {loadingParticipants ? (
        <CircularProgress size={24} />
      ) : (
        <ParticipantsRanking participants={participants} />
      )}
    </Container>
  );
};

export const ParticipantsRankingPage = memo(ParticipantsRankingPageInternal);
