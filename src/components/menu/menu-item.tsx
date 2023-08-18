import { toRem } from '@/utils';
import MuiMenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

const MenuItem = styled(MuiMenuItem)`
  font-size: ${toRem(14)} !important;

  &.MuiMenuItem-root {
    color: ${(props) => props.theme.palette.text.primary} !important;
    font-family: inherit;
    font-size: ${toRem(14)};
    padding: ${toRem(6)} ${toRem(12)};

    &:hover {
      background-color: ${(props) =>
        props.theme.palette.background.paper} !important;
    }
  }
  > svg {
    color: ${(props) => props.theme.palette.text.secondary};
  }
  background-color: ${(props) => props.theme.palette.background.default};
`;
const MenuItemText = styled.span`
  display: inline-block;
  margin-left: ${toRem(4)};
`;

export { MenuItem, MenuItemText };
