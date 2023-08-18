import { Menu, MenuItem, MenuItemText } from '@/components/menu';
import { Delete, Edit } from '@mui/icons-material';

import { memo } from 'react';

type MatchesTableRowMenuProps = {
  menuAnchorElement: HTMLElement;
  open: boolean;
  onClose: () => void;
  onEdit: (matchId: string) => void;
  onDelete: (matchId: string) => void;
  matchId: string;
};

const MatchesTableRowMenuInternal = (props: MatchesTableRowMenuProps) => {
  return (
    <Menu
      anchorEl={props.menuAnchorElement}
      anchorOrigin={{
        vertical: 'center',
        horizontal: -30,
      }}
      disableAutoFocus
      onClose={props.onClose}
      open={props.open}
    >
      <MenuItem
        data-cy="workbook-edit-button"
        data-testid="WorkbooksList-workbook-edit-button"
        onClick={() => props.onEdit(props.matchId)}
      >
        <Edit />
        <MenuItemText>Editar</MenuItemText>
      </MenuItem>
      <MenuItem
        data-cy="workbook-delete-button"
        data-testid="WorkbooksList-workbook-delete-button"
        onClick={() => props.onDelete(props.matchId)}
      >
        <Delete />
        <MenuItemText>Eliminar</MenuItemText>
      </MenuItem>
    </Menu>
  );
};
export const MatchesTableRowMenu = memo(MatchesTableRowMenuInternal);
