import React, { FC } from 'react';

import styled from 'styled-components';

import { ModalContainer, ModalContainerProps } from './modal-container';
import { ModalFooter } from './modal-footer';

import { ModalSecondaryButton } from './components/modal-secondary-button';
import { ModalBody } from './modal-body';
import { Button, ButtonProps, Typography } from '@mui/material';
import { toRem } from '@/utils';

type ConfirmationModalProps = ModalContainerProps & {
  onConfirm: () => void;
  onCancel?: () => void;
  modalTitle?: React.ReactNode;
  modalSubtitle?: React.ReactNode;
  destructive?: boolean;
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
  width: 100%;
`;

const DangerButton = styled(Button)`
  color: ${(props) => props.theme.palette.error.main} !important;
`;

const ConfirmationModal: FC<ConfirmationModalProps> = (props): JSX.Element => (
  <StyledModalContainer
    ariaLabel={props.ariaLabel}
    data-testid={props['data-testid']}
    isModalOpen={props.isModalOpen}
    modalSubtitle={props.modalSubtitle}
    modalTitle={props.modalTitle}
    onCloseModal={props.onCloseModal}
  >
    <StyledModalBody>
      <Typography component="span">{props.children}</Typography>
    </StyledModalBody>
    <StyledModalFooter>
      <ModalSecondaryButton
        onClick={props.onCancel || props.onCloseModal}
        variant="text"
      >
        Cancelar
      </ModalSecondaryButton>
      {props.destructive ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <DangerButton {...props.confirmButtonProps} onClick={props.onConfirm}>
          Confirmar
        </DangerButton>
      ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Button {...props.confirmButtonProps} onClick={props.onConfirm}>
          Confirmar
        </Button>
      )}
    </StyledModalFooter>
  </StyledModalContainer>
);

export { ConfirmationModal };
