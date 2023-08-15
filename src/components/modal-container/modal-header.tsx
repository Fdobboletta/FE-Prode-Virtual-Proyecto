import React, { FC } from 'react';

import styled from 'styled-components';

import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { toRem } from '@/utils';
import { Tooltip } from '../tooltip';
import { IconButton } from '@mui/material';

type ModalHeaderProps = {
  onClickCloseIcon?: () => void;
  className?: string;
  modalSubtitle?: React.ReactNode | string;
  children?: React.ReactNode;
  tooltipDescription?: React.ReactNode;
};

const StyledModalHeader = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding-bottom: ${toRem(8)};
`;

const ModalTitleContainer = styled.div`
  flex: 1 1;
  overflow: hidden;
`;

const ModalTitle = styled(Typography)<{ component?: string }>`
  font-size: ${(props) => props.theme.typography.h2.fontSize} !important;
  font-weight: ${(props) => props.theme.typography.h2.fontWeight} !important;
  padding-right: ${toRem(6)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ModalSubtitle = styled(Typography)<{ component?: string }>`
  font-size: ${(props) => props.theme.typography.caption.fontSize} !important;
  font-weight: ${(props) =>
    props.theme.typography.caption.fontWeight} !important;
  color: ${(props) => props.theme.palette.text.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CloseButton = styled.div`
  margin-left: auto;
  min-width: ${toRem(24)};
`;

const ModalHeader: FC<ModalHeaderProps> = (props): JSX.Element => (
  <StyledModalHeader className={props.className}>
    {props.children && (
      <Tooltip
        description={
          props.tooltipDescription ?? (
            <Typography component="span">{props.children}</Typography>
          )
        }
      >
        <ModalTitleContainer>
          <ModalTitle component="h2" variant="h2">
            {props.children}
          </ModalTitle>
          {props.modalSubtitle && (
            <ModalSubtitle component="span">
              {props.modalSubtitle}
            </ModalSubtitle>
          )}
        </ModalTitleContainer>
      </Tooltip>
    )}
    {Boolean(props.onClickCloseIcon) && (
      <CloseButton>
        <IconButton aria-label="close button" onClick={props.onClickCloseIcon}>
          <CloseIcon />
        </IconButton>
      </CloseButton>
    )}
  </StyledModalHeader>
);

export { ModalHeader };
