import { toRem } from '@/utils';
import MuiMenu from '@mui/material/Menu';

import styled from 'styled-components';

const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    box-shadow: 0px 0px ${toRem(12)} rgba(0, 0, 0, 0.1);
    border: 1px solid ${(props) => props.theme.palette.divider};
    border-radius: ${toRem(4)};
  }
  .MuiList-root {
    padding: 0 !important;
    min-width: ${toRem(150)};
    background-color: ${(props) => props.theme.palette.background.default};
  }
`;

export { Menu };
