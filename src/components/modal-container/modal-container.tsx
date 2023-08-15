import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Box } from '@mui/system';

import {
  BaseModalContainerProps,
  BaseModalContainer,
} from './base-modal-container';
import { ModalHeader } from './modal-header';
import { toRem } from '@/utils';

export type ModalContainerProps = BaseModalContainerProps & {
  showCloseIcon?: boolean;
  modalTitle?: ReactNode;
  modalSubtitle?: ReactNode;
  tabs?: ReactNode;
  headerButton?: ReactNode;
};

const StyledModal = styled(BaseModalContainer)`
  padding: ${toRem(24)} !important;
`;

const StyledModalHeader = styled(ModalHeader)`
  margin-bottom: ${toRem(4)};
`;

const StyledHeaderControlContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: ${toRem(12)};
`;
const StyledHeaderTabsContainer = styled(Box)`
  display: flex;
  flex: 1;
`;
const StyledHeaderButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  max-width: ${toRem(150)};
  padding: ${toRem(12)};
`;

/**
 *
 * @param {Object} children ReactNode to render in modal
 * @param {Object} ariaLabel Accessibility label `aria-label` for modal
 * @param {Object} isModalOpen Boolean to determine modal open state
 * @param {Object} onCloseModal Function to call on click of modal backdrop
 * @param {Object} showCloseIcon Boolean to determine if to show close icon
 * @param {Object} modalTitle Modal title
 * @param {Object} modalSubtitle Modal subtitle
 * @param {Object} tabs Header tabs list
 *
 */
const ModalContainer: FC<ModalContainerProps> = (props): JSX.Element => (
  <StyledModal
    ariaLabel={props.ariaLabel}
    className={props.className}
    data-testid={props['data-testid']}
    isModalOpen={props.isModalOpen}
    onCloseModal={props.onCloseModal}
  >
    {(props.modalTitle || props.showCloseIcon) && (
      <StyledModalHeader
        modalSubtitle={props.modalSubtitle}
        onClickCloseIcon={props.showCloseIcon ? props.onCloseModal : undefined}
      >
        {props.modalTitle}
      </StyledModalHeader>
    )}
    {(props.tabs || props.headerButton) && (
      <StyledHeaderControlContainer>
        {props.tabs && (
          <StyledHeaderTabsContainer>{props.tabs}</StyledHeaderTabsContainer>
        )}
        <Box display="flex" flex="1" />
        {props.headerButton && (
          <StyledHeaderButtonContainer>
            <span>{props.headerButton}</span>
          </StyledHeaderButtonContainer>
        )}
      </StyledHeaderControlContainer>
    )}
    {props.children}
  </StyledModal>
);

export { ModalContainer };
