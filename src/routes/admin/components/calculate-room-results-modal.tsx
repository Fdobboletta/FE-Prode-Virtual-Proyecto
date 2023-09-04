import {
  ModalBody,
  ModalContainer,
  ModalFooter,
} from '@/components/modal-container';

import { memo, useState } from 'react';

import { ModalSecondaryButton } from '@/components/modal-container/components/modal-secondary-button';
import { Button, CircularProgress } from '@mui/material';
import { useCalculateRoomResultsMutation } from '@/graphql/rooms/calculateRoomResults.generated';
import { RoomParticipantWithScore } from '@/generated/graphql-types.generated';
import { EmojiEvents } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';

type CalculateRoomResultsModalProps = WithSnackbarProps & {
  isOpen: boolean;
  roomId: string;
  onCancel: () => void;
};

const CalculateRoomResultsModalInternal = (
  props: CalculateRoomResultsModalProps
) => {
  const [rank, setRank] = useState<RoomParticipantWithScore[] | null>(null);
  const [calculateResults, { loading }] = useCalculateRoomResultsMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await calculateResults({
      variables: { roomId: props.roomId },
      onCompleted: (data) => {
        if (data.calculateRoomResults) {
          setRank(data.calculateRoomResults);
          props.snackbarShowMessage(
            4000,
            'Puntajes calculados exitosamente',
            snackSeverity.success
          );
        }
      },
      onError: () => {
        props.snackbarShowMessage(
          4000,
          'Los puntajes de la sala no pudieron calcularse correctamente',
          snackSeverity.error
        );
      },
    });
  };

  const handleNavigateToRank = () => {
    const url = `/admin/room/${props.roomId}/rank`;
    navigate(url);
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
          <Button
            onClick={handleNavigateToRank}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<EmojiEvents />}
          >
            Ver ganadores
          </Button>
        </ModalBody>
      )}
    </ModalContainer>
  );
};

export const CalculateRoomResultsModal = memo(
  withSnack(CalculateRoomResultsModalInternal)
);
