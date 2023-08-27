import { memo, useState } from 'react';

import { Match, Score, UserRole } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

import { useParams } from 'react-router';

import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';

import _ from 'lodash';
import { useGetMatchesByRoomIdForPlayersQuery } from '@/graphql/matches/getMatchesByRoomIdPlayer.generated';
import { onError } from '@apollo/client/link/error';
import { RoomPage } from '@/routes/admin/room-page';
import { AccordionWithTable } from '@/routes/admin/components/accordion-table';

import { UserMatchesTable } from '../components/user-matches-table';
import { useUpdateManyMatchForecastsMutation } from '@/graphql/matches/updateManyMatchForecasts.generated';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${toRem(16)};
`;

const UserRoomMatchesInternal = (props: WithSnackbarProps) => {
  const params = useParams<{ roomId: string }>();

  const [matches, setMatches] = useState<Match[]>([]);

  const { loading: LoadingMatches } = useGetMatchesByRoomIdForPlayersQuery({
    variables: {
      roomId: params.roomId || '',
    },
    onCompleted: (data) => {
      if (data.getMatchesByRoomIdForPlayers) {
        const sortedMatches = _.orderBy(
          data.getMatchesByRoomIdForPlayers,
          ['startDate'],
          ['asc']
        );
        setMatches(sortedMatches);
      }
      onError((error) => {
        console.log('error', error);
      });
    },
  });

  const [updateManyMatchForecasts] = useUpdateManyMatchForecastsMutation();

  const handleForecastScoreSelect = (
    matchId: string,
    score: Score | undefined
  ) => {
    setMatches((prevMatchesArray) => {
      const updatedArray = prevMatchesArray.map((match) => {
        if (match.id === matchId) {
          return {
            ...match,
            userForecast: score,
          };
        }
        return match;
      });
      return _.orderBy(updatedArray, ['startDate'], ['asc']);
    });
  };

  const handleForecastScoreSubmit = async () => {
    const matchForecasts = matches.map((match) => ({
      matchId: match.id,
      score: match.userForecast || null,
    }));

    await updateManyMatchForecasts({
      variables: {
        forecasts: matchForecasts,
      },
      onCompleted: () => {
        props.snackbarShowMessage(
          4000,
          'Los resultados fueron guardados',
          snackSeverity.success
        );
      },
      onError: () => {
        props.snackbarShowMessage(
          4000,
          'Ocurrio un error al intentar guardar los resultados. Intente nuevamente',
          snackSeverity.error
        );
      },
    });
  };

  return (
    <RoomPage role={UserRole.Player}>
      <Container>
        {LoadingMatches ? (
          <CircularProgress size={24} />
        ) : (
          <AccordionWithTable
            title="Listado de partidos"
            dataLength={matches.length}
            keepExpanded
          >
            <UserMatchesTable
              matches={matches}
              onSaveScores={handleForecastScoreSubmit}
              onScoreSelect={handleForecastScoreSelect}
            />
          </AccordionWithTable>
        )}
      </Container>
    </RoomPage>
  );
};

export const UserRoomMatches = withSnack(memo(UserRoomMatchesInternal));
