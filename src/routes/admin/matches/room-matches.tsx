import { memo, useState } from 'react';

import { Match, Score } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { RoomPage } from '../room-page';
import { AccordionWithTable } from '../components/accordion-table';
import { MatchesTable } from '../components/matches-table';
import { useGetMatchesByRoomIdQuery } from '@/graphql/matches/getMatchesByRoomId.generated';
import { useCreateMatchMutation } from '@/graphql/matches/createMatch.generated';
import { useParams } from 'react-router';
import { ConfirmationModal, useModal } from '@/components/modal-container';
import { CreateOrUpdateMatchModal } from '../components/create-update-match-modal';
import { CreateMatchMutationVariables } from '@/graphql/matches/createMatch.generated';
import { useUpdateMatchMutation } from '@/graphql/matches/updateMatch.generated';
import { useDeleteMatchMutation } from '@/graphql/matches/deleteMatch.generated';
import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';
import { useUpdateManyMatchScoresMutation } from '@/graphql/matches/updateManyMatchScores.generated';
import _ from 'lodash';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${toRem(16)};
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

const RoomMatchesInternal = (props: WithSnackbarProps) => {
  const params = useParams<{ roomId: string }>();

  const [matches, setMatches] = useState<Match[]>([]);

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const createOrUpdateMatchModalController = useModal();
  const deleteMatchModalController = useModal();

  const { loading: LoadingMatches } = useGetMatchesByRoomIdQuery({
    variables: {
      roomId: params.roomId || '',
    },
    onCompleted: (data) => {
      if (data.getMatchesByRoomId) {
        const sortedMatches = _.orderBy(
          data.getMatchesByRoomId,
          ['startDate'],
          ['asc']
        );
        setMatches(sortedMatches);
      }
    },
  });

  const [createMatch, { loading: loadingCreateMatch }] =
    useCreateMatchMutation();

  const [updateMatch] = useUpdateMatchMutation();

  const [deleteMatch] = useDeleteMatchMutation();
  const [updateManyMatchScores] = useUpdateManyMatchScoresMutation();

  const handleDeleteMatch = async (matchId: string) => {
    try {
      await deleteMatch({
        variables: {
          matchId,
        },
        onCompleted: () => {
          props.snackbarShowMessage(
            4000,
            'Su partido fue eliminado con exito',
            snackSeverity.success
          );
        },
        onError: () => {
          props.snackbarShowMessage(
            4000,
            'Ocurrio un error al intentar eliminar su partido',
            snackSeverity.error
          );
        },
      });
      setMatches((prevMatchesState) =>
        prevMatchesState.filter((match) => match.id !== selectedMatchId)
      );
    } catch (error) {
      console.error('Error al eliminar el partido:', error);
    }
  };

  const handleEditMatch = async (editedMatch: Match) => {
    try {
      await updateMatch({
        variables: {
          matchId: editedMatch.id,
          homeTeam: editedMatch.homeTeam,
          awayTeam: editedMatch.awayTeam,
          date: editedMatch.startDate,
        },
        onCompleted: () => {
          props.snackbarShowMessage(
            4000,
            'Su partido fue editado con exito',
            snackSeverity.success
          );
        },
        onError: () => {
          props.snackbarShowMessage(
            4000,
            'Ocurrio un error al intentar editar su partido',
            snackSeverity.error
          );
        },
      });
      setMatches((prevMatchesArray) => {
        return prevMatchesArray.map((match) => {
          if (match.id === editedMatch.id) {
            return {
              ...match,
              homeTeam: editedMatch.homeTeam,
              awayTeam: editedMatch.awayTeam,
              startDate: editedMatch.startDate,
            };
          }
          return match;
        });
      });
    } catch (error) {
      console.error('Error al modificar datos del partido:', error);
    }
  };

  const handleCreateMatch = async (newMatch: CreateMatchMutationVariables) => {
    try {
      const newlyCreatedMatch = await createMatch({
        variables: newMatch,
      });

      if (newlyCreatedMatch.data && newlyCreatedMatch.data.createMatch) {
        const addNewMatch = newlyCreatedMatch.data.createMatch;
        setMatches((prevState) =>
          _.orderBy([...prevState, addNewMatch], ['startDate'], ['asc'])
        );
      }
    } catch (error) {
      console.error('Error al crear la sala:', error);
    }
  };

  const handleScoreSelect = (matchId: string, score: Score | undefined) => {
    setMatches((prevMatchesArray) => {
      const updatedArray = prevMatchesArray.map((match) => {
        if (match.id === matchId) {
          return {
            ...match,
            officialScore: score,
          };
        }
        return match;
      });
      return _.orderBy(updatedArray, ['startDate'], ['asc']);
    });
  };

  const handleScoreSubmit = async () => {
    const scoreUpdates = matches.map((match) => ({
      matchId: match.id,
      score: match.officialScore || null,
    }));

    await updateManyMatchScores({
      variables: {
        scoreUpdates,
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
    <RoomPage>
      <Container>
        <StyledButton
          onClick={() => {
            createOrUpdateMatchModalController.onOpenModal();
          }}
        >
          + Agregar Partido
        </StyledButton>
        {LoadingMatches ? (
          <CircularProgress size={24} />
        ) : (
          <AccordionWithTable
            title="Listado de partidos"
            dataLength={matches.length}
            keepExpanded
          >
            <MatchesTable
              matches={matches}
              onEditMatch={(matchId) => {
                setSelectedMatchId(matchId);
                createOrUpdateMatchModalController.onOpenModal();
              }}
              onSaveScores={handleScoreSubmit}
              onScoreSelect={handleScoreSelect}
              onDeleteMatch={(matchId) => {
                setSelectedMatchId(matchId);
                deleteMatchModalController.onOpenModal();
              }}
            />
          </AccordionWithTable>
        )}
        {createOrUpdateMatchModalController.modalOpen && (
          <CreateOrUpdateMatchModal
            roomId={params.roomId || ''}
            loading={loadingCreateMatch}
            isOpen={createOrUpdateMatchModalController.modalOpen}
            onCancel={() => {
              createOrUpdateMatchModalController.onCloseModal();
              setSelectedMatchId(null);
            }}
            onCreateMatch={handleCreateMatch}
            onEditMatch={handleEditMatch}
            matchToEdit={
              matches.find((match) => match.id === selectedMatchId) || null
            }
          />
        )}
        <ConfirmationModal
          ariaLabel={'confirmar-eliminar-partido'}
          isModalOpen={deleteMatchModalController.modalOpen}
          onConfirm={() => {
            handleDeleteMatch(selectedMatchId || '');
            setSelectedMatchId(null);
            deleteMatchModalController.onCloseModal();
          }}
          onCancel={() => deleteMatchModalController.onCloseModal()}
          onCloseModal={() => deleteMatchModalController.onCloseModal()}
          modalTitle="Eliminar partido?"
        >
          Una vez eliminados, los datos del partido no podran ser recuperarse
        </ConfirmationModal>
      </Container>
    </RoomPage>
  );
};

export const RoomMatches = withSnack(memo(RoomMatchesInternal));
