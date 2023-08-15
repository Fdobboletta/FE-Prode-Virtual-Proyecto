import styled from 'styled-components';

import { toRem } from '@/utils';
import { Button } from '@mui/material';

const ModalSecondaryButton = styled(Button)`
  color: ${(props) => props.theme.palette.text.secondary} !important;
  margin-right: ${toRem(12)} !important;

  :hover {
    color: ${(props) => props.theme.palette.text.primary} !important;
  }
`;

export { ModalSecondaryButton };
