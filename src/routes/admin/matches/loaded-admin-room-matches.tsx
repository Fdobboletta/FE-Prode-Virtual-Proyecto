import { memo } from 'react';

import { Match, Room, Score } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import styled from 'styled-components';
import { Button } from '@mui/material';

import { AccordionWithTable } from '../components/accordion-table';

import { AdminMatchesTable } from '../components/admin-matches-table';
import { Calculate } from '@mui/icons-material';
import useUrlState from '@ahooksjs/use-url-state';
import Countdown from '@/components/countdown';
import { useRoomPageContext } from '../context/room-page-context';

const SubmitButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledRegisterButton = styled(Button)`
  margin-top: ${toRem(6)} !important;
  margin-bottom: ${toRem(12)} !important;
  padding: ${toRem(8)} ${toRem(16)} !important;
  max-width: ${toRem(300)};
`;

const StyledButton = styled(Button)`
  width: ${toRem(200)};
  justify-content: flex-end !important;
  align-self: flex-end;
  &&& {
    &:hover {
      text-decoration: underline;
      background-color: transparent;
    }
    &:focus {
      background-color: transparent;
    }
  }
`;

type LoadedAdminRoomMatchesProps = {
  matches: Match[];
  onCreateMatch: () => void;
  onEditMatch: (matchId: string) => void;
  onSaveScores: () => void;
  onScoreSelect: (matchId: string, score: Score | undefined) => void;
  onDeleteMatch: (matchId: string) => void;
  onCalculateResults: () => void;
};

const getAllowedActionsSet = (
  room: Omit<Room, 'creatorId' | 'creator' | 'participantsCount'>
): Set<'Edit' | 'Delete'> => {
  if (room.isClosed) return new Set([]);
  if (room.isActive) return new Set(['Edit']);
  return new Set(['Edit', 'Delete']);
};

const LoadedAdminRoomMatchesInternal = (props: LoadedAdminRoomMatchesProps) => {
  const [urlState] = useUrlState<{ isEditing: '1' }>();

  const { room } = useRoomPageContext();

  const readyForCalculateResult =
    props.matches.length !== 0 &&
    props.matches.every(
      (match) =>
        match.officialScore !== null && match.officialScore !== undefined
    ) &&
    !urlState.isEditing;

  const allowedActions = getAllowedActionsSet(room);

  return (
    <>
      {(!room.isClosed || !room.isActive) && (
        <StyledButton onClick={props.onCreateMatch}>
          + Agregar Partido
        </StyledButton>
      )}
      <AccordionWithTable
        title="Listado de partidos"
        dataLength={props.matches.length}
        keepExpanded
      >
        <AdminMatchesTable
          allowedActions={allowedActions}
          matches={props.matches}
          onEditMatch={props.onEditMatch}
          onSaveScores={props.onSaveScores}
          onScoreSelect={props.onScoreSelect}
          onDeleteMatch={props.onDeleteMatch}
        />
      </AccordionWithTable>
      <SubmitButtonContainer>
        {!room.isClosed && (
          <>
            <StyledRegisterButton
              onClick={props.onCalculateResults}
              variant="contained"
              color="primary"
              disabled={!readyForCalculateResult}
              startIcon={<Calculate />}
            >
              Calcular puntaje
            </StyledRegisterButton>
            <Countdown
              label={'Tiempo hasta el vencimiento de la sala:'}
              targetDate={room.dueDate}
            />
          </>
        )}
      </SubmitButtonContainer>
    </>
  );
};

export const LoadedAdminRoomMatches = memo(LoadedAdminRoomMatchesInternal);
