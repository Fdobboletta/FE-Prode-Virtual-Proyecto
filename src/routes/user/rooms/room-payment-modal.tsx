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
  flex-direction: column;
  align-items: center;
`;

const ModalText = styled(Typography)`
  font-size: ${toRem(16)};
  text-align: center;
  margin-bottom: ${toRem(24)};
`;

const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${toRem(16)};
`;

const ConfirmButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
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
      modalTitle={'Confirmar compra'}
      onCloseModal={props.onCloseModal}
    >
      <>
        <StyledModalBody>
          <ModalText>
            ¿Estás seguro de que deseas comprar el acceso a esta sala?
          </ModalText>
        </StyledModalBody>
        <StyledModalFooter>
          <ButtonsContainer>
            <ModalSecondaryButton
              onClick={props.onCancel || props.onCloseModal}
              variant="text"
            >
              Cancelar
            </ModalSecondaryButton>
            <ConfirmButton variant="contained" disabled={loading}>
              <a
                href={mpPreference?.paymentLink || ''}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Confirmar Pago'}
              </a>
            </ConfirmButton>
          </ButtonsContainer>
        </StyledModalFooter>
      </>
    </StyledModalContainer>
  );
};

export const RoomPaymentModal = memo(RoomPaymentModalInternal);
