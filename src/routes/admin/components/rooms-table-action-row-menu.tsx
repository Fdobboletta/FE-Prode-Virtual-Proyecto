import { Menu, MenuItem, MenuItemText } from '@/components/menu';
import { Delete, Edit, Publish } from '@mui/icons-material';

import { memo } from 'react';

export enum RoomTableRowMenuActions {
  EDIT = 'edit',
  PUBLISH = 'publish',
  DELETE = 'delete',
}

type RoomTableRowMenuProps = {
  menuAnchorElement: HTMLElement;
  open: boolean;
  onClose: () => void;
  onEdit?: (roomId: string) => void;
  onDelete?: (roomId: string) => void;
  onPublish?: (roomId: string) => void;
  roomId: string;
  allowedActionsSet: Set<RoomTableRowMenuActions>;
};

const RoomsTableActionRowMenuInternal = (props: RoomTableRowMenuProps) => {
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
      {props.allowedActionsSet.has(RoomTableRowMenuActions.PUBLISH) && (
        <MenuItem
          data-testid="rooms-table-publish-button"
          onClick={() => {
            if (props.onPublish) {
              props.onPublish(props.roomId);
            }
          }}
        >
          <Publish />
          <MenuItemText>Publicar</MenuItemText>
        </MenuItem>
      )}
      {props.allowedActionsSet.has(RoomTableRowMenuActions.EDIT) && (
        <MenuItem
          data-testid="rooms-table-edit-button"
          onClick={() => {
            if (props.onEdit) {
              props.onEdit(props.roomId);
            }
          }}
        >
          <Edit />
          <MenuItemText>Editar</MenuItemText>
        </MenuItem>
      )}
      {props.allowedActionsSet.has(RoomTableRowMenuActions.DELETE) && (
        <MenuItem
          data-testid="rooms-table-delete-button"
          onClick={() => {
            if (props.onDelete) {
              props.onDelete(props.roomId);
            }
          }}
        >
          <Delete />
          <MenuItemText>Eliminar</MenuItemText>
        </MenuItem>
      )}
    </Menu>
  );
};
export const RoomsTableActionRowMenu = memo(RoomsTableActionRowMenuInternal);
