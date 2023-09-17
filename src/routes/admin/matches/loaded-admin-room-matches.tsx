import { memo } from 'react';

import { Match, Room, Score } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import styled from 'styled-components';
import { Button } from '@mui/material';

import { AccordionWithTable } from '../components/accordion-table';

import { AdminMatchesTable } from '../components/admin-matches-table';
import { Calculate, Publish } from '@mui/icons-material';
import useUrlState from '@ahooksjs/use-url-state';
import Countdown from '@/components/countdown';
import { useRoomPageContext } from '../context/room-page-context';
import useDateComparison from '@/utils/use-date-comparison';
import { ConfirmationModal, useModal } from '@/components/modal-container';

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

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type LoadedAdminRoomMatchesProps = {
  matches: Match[];
  onCreateMatch: () => void;
  onEditMatch: (matchId: string) => void;
  onSaveScores: () => void;
  onScoreSelect: (matchId: string, score: Score | undefined) => void;
  onDeleteMatch: (matchId: string) => void;
  onCalculateResults: () => void;
  onPublishRoom: (roomId: string) => void;
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

  const activateRoomModalController = useModal();

  const { isDateReached } = useDateComparison({ targetDate: room.dueDate });

  const readyForCalculateResult =
    props.matches.length !== 0 &&
    props.matches.every(
      (match) =>
        match.officialScore !== null && match.officialScore !== undefined
    ) &&
    !urlState.isEditing;

  const allowedActions = getAllowedActionsSet(room);

  const handlePublishButtonClick = () => {
    activateRoomModalController.onOpenModal();
  };

  const shouldShowAddMatchButton =
    !room.isClosed && !room.isActive && !isDateReached;

  return (
    <>
      <ButtonSection>
        {shouldShowAddMatchButton && (
          <StyledButton
            startIcon={<Publish />}
            onClick={handlePublishButtonClick}
            sx={{ width: 'fit-content' }}
            disableRipple
          >
            Publicar Sala
          </StyledButton>
        )}
        {shouldShowAddMatchButton && (
          <StyledButton
            onClick={props.onCreateMatch}
            disableRipple
            sx={{ width: 'fit-content' }}
          >
            + Agregar Partido
          </StyledButton>
        )}
      </ButtonSection>
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
      <ConfirmationModal
        ariaLabel={'confirmar-publicacion-sala'}
        isModalOpen={activateRoomModalController.modalOpen}
        onConfirm={() => {
          props.onPublishRoom(room.id);
          activateRoomModalController.onCloseModal();
        }}
        onCancel={() => activateRoomModalController.onCloseModal()}
        onCloseModal={() => activateRoomModalController.onCloseModal()}
        modalTitle="Publicar Sala?"
      >
        Una vez publicados, los datos de la sala no podran ser editados
      </ConfirmationModal>
    </>
  );
};

export const LoadedAdminRoomMatches = memo(LoadedAdminRoomMatchesInternal);
