import React, { FC } from 'react';

import Backdrop from '@mui/material/Backdrop';

import styled from 'styled-components';

import { Box, Modal, Fade } from '@mui/material';
import { toRem } from '@/utils';

export type BaseModalContainerProps = {
  ariaLabel: string;
  'data-testid'?: string;
  className?: string;
  isModalOpen: boolean;
  onCloseModal?: () => void;
  children?: React.ReactNode;
};

const StyledBackdrop = styled(Backdrop)`
  background-color: rgba(223, 235, 238, 0.7) !important;
`;

const StyledBox = styled(Box)`
  @media screen and (max-width: 600px) {
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    min-width: 100vw;
  }
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: ${toRem(4)};
  box-shadow: 0px 0px ${toRem(12)} rgba(0, 0, 0, 0.1);
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: ${toRem(848)};
  min-height: ${toRem(200)};
  max-height: 100vh;
  overflow-y: auto;
  width: 90vw;
`;

/**
 *
 * @param {Object} children ReactNode to render in modal
 * @param {Object} ariaLabel Accessibility label `aria-label` for modal
 * @param {Object} isModalOpen Boolean to determine modal open state
 * @param {Object} onCloseModal Function to call on click of modal backdrop
 *
 */
const BaseModalContainer: FC<BaseModalContainerProps> = (
  props
): JSX.Element => (
  <Modal
    aria-label={props.ariaLabel}
    BackdropComponent={StyledBackdrop}
    BackdropProps={{
      timeout: 500,
    }}
    closeAfterTransition
    data-testid={props['data-testid']}
    onClose={props.onCloseModal}
    open={props.isModalOpen}
  >
    <Fade in={props.isModalOpen}>
      <StyledBox alignItems="center" className={props.className}>
        {props.children}
      </StyledBox>
    </Fade>
  </Modal>
);

export { BaseModalContainer };
