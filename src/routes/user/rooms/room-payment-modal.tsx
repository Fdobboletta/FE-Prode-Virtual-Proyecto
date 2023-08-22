import React, { FC, memo, useEffect, useState } from 'react';

import styled from 'styled-components';

import {
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material';
import { toRem } from '@/utils';
import { ModalSecondaryButton } from '@/components/modal-container/components/modal-secondary-button';
import {
  ModalBody,
  ModalContainer,
  ModalContainerProps,
  ModalFooter,
} from '@/components/modal-container';
import { useGenerateMercadoPagoPreferenceMutation } from '@/graphql/mercado-pago/generteMpPreference.generated';

type RoomPaymentModalProps = ModalContainerProps & {
  onCancel?: () => void;
  modalTitle?: React.ReactNode;
  roomId: string;
  confirmButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
};

const StyledModalContainer = styled(ModalContainer)`
  max-width: ${toRem(400)};
`;

const StyledModalBody = styled(ModalBody)`
  display: flex;
  align-items: center;
`;

const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoomPaymentModalInternal: FC<RoomPaymentModalProps> = (
  props
): JSX.Element => {
  const [generateMpPreference, { loading }] =
    useGenerateMercadoPagoPreferenceMutation();
  const [mpPreference, setMpPreference] = useState<{
    id: string;
    paymentLink: string;
  } | null>(null);

  const [loadingMpButton, setLoadingMpButton] = useState(true);

  useEffect(() => {
    const getMpPreferenceId = async () => {
      const response = await generateMpPreference({
        variables: {
          roomId: props.roomId,
        },
      });
      if (response.data && response.data.generateMercadoPagoPreferenceId) {
        setMpPreference({
          id: response.data.generateMercadoPagoPreferenceId.preferenceId,
          paymentLink:
            response.data.generateMercadoPagoPreferenceId.redirectLink,
        });
      }
    };
    getMpPreferenceId();
  }, []);

  return (
    <StyledModalContainer
      ariaLabel={props.ariaLabel}
      data-testid={props['data-testid']}
      isModalOpen={props.isModalOpen}
      modalSubtitle={props.modalSubtitle}
      modalTitle={props.modalTitle}
      onCloseModal={props.onCloseModal}
    >
      <>
        <StyledModalBody>
          <Typography component="span">
            Estas seguro que desea comprar el accesso a esta sala?
          </Typography>
        </StyledModalBody>
        <StyledModalFooter>
          <ModalSecondaryButton
            onClick={props.onCancel || props.onCloseModal}
            variant="text"
          >
            Cancelar
          </ModalSecondaryButton>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Button onClick={() => {}}>
              <a
                href={mpPreference?.paymentLink || ''}
                target="_blank"
                rel="noreferrer"
              >
                Confirmar Pago
              </a>
            </Button>
          )}
        </StyledModalFooter>
      </>
    </StyledModalContainer>
  );
};

export const RoomPaymentModal = memo(RoomPaymentModalInternal);
