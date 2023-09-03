import {
  ModalBody,
  ModalContainer,
  ModalFooter,
} from '@/components/modal-container';

import { memo, useState } from 'react';

import { ModalSecondaryButton } from '@/components/modal-container/components/modal-secondary-button';
import { Button, CircularProgress, List, ListItem } from '@mui/material';
import { useCalculateRoomResultsMutation } from '@/graphql/rooms/calculateRoomResults.generated';
import { RoomParticipantWithScore } from '@/generated/graphql-types.generated';

type CalculateRoomResultsModalProps = {
  isOpen: boolean;
  roomId: string;
  onCancel: () => void;
};

const CalculateRoomResultsModalInternal = (
  props: CalculateRoomResultsModalProps
) => {
  const [rank, setRank] = useState<RoomParticipantWithScore[] | null>(null);
  const [calculateResults, { loading }] = useCalculateRoomResultsMutation();

  const handleSubmit = async () => {
    await calculateResults({
      variables: { roomId: props.roomId },
      onCompleted: (data) => {
        if (data.calculateRoomResults) {
          setRank(data.calculateRoomResults);
        }
      },
    });
  };

  return (
    <ModalContainer
      modalTitle={'Calcular puntajes'}
      ariaLabel={'calculate-score-modal'}
      isModalOpen={props.isOpen}
      onCloseModal={() => props.onCancel()}
    >
      {loading ? (
        <CircularProgress />
      ) : rank === null ? (
        <>
          <ModalBody>
            <div>
              Al calular los puntajes. La sala se cerrara y no podra ser
              modificada.
            </div>
            <div>
              Se obtendra una lista de participantes ordenada por cantidad de
              aciertos
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalSecondaryButton
              onClick={() => props.onCancel()}
              variant="text"
            >
              Cancelar
            </ModalSecondaryButton>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Calcular puntajes
            </Button>
          </ModalFooter>
        </>
      ) : (
        <ModalBody>
          <List>
            {rank.map((participant) => {
              return (
                <ListItem key={participant.participantId}>
                  {participant.name} {participant.lastName}
                  {participant.score}
                </ListItem>
              );
            })}
          </List>
        </ModalBody>
      )}
    </ModalContainer>
  );
};

export const CalculateRoomResultsModal = memo(
  CalculateRoomResultsModalInternal
);
