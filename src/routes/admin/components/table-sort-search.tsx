/* eslint-disable @typescript-eslint/no-explicit-any */
import { toRem } from '@/utils';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from 'mui-datatables';
import { useState } from 'react';
import { useNavigate, generatePath } from 'react-router';
import styled from 'styled-components';
import {
  RoomTableRowMenuActions,
  RoomsTableActionRowMenu,
} from './rooms-table-action-row-menu';
import { RoomPageInternalRoom } from '../rooms/rooms';

type TableWithSortingAndSearchProps = {
  data: RoomPageInternalRoom[];
  onPublishRoom?: (roomId: string) => void;
  onEditRoom?: (roomId: string) => void;
  onDeleteRoom: (roomId: string) => void;
  allowedActionsSet: Set<RoomTableRowMenuActions>;
};

const StyledTable = styled(MUIDataTable)`
  .MuiToolbar-root {
    min-height: ${toRem(50)};
  }
  .MuiTableBody-root {
    .MuiTableCell-root {
      text-align: center;
    }
  }
  .MuiTableHead-root {
    .MuiTableCell-root {
      padding: 0;
      span {
        justify-content: center;
      }
      button {
        width: ${toRem(120)};
      }
    }
  }
  .MuiTableFooter-root {
    .MuiTableCell-root {
      padding: 0;
    }
  }
`;

const options: MUIDataTableOptions = {
  search: true,
  filter: false,
  download: false,
  print: false,
  viewColumns: false,
  selectableRows: 'none',
  rowsPerPageOptions: [1, 5, 10],
  textLabels: {
    body: {
      noMatch: 'No se encontraron registros',
      toolTip: 'Ordenar',
    },
    pagination: {
      next: 'Siguiente',
      previous: 'Anterior',
      rowsPerPage: 'Filas por página',
    },
    filter: {
      all: 'Todos',
      title: 'FILTROS',
      reset: 'RESET',
    },
  },
};

const TableWithSortingAndSearch = (props: TableWithSortingAndSearchProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRowClick = (rowData: string[]) => {
    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime < 300) {
      handleRowDoubleClick(rowData);
    } else {
      setClickCount(clickCount + 1);
    }

    setLastClickTime(currentTime);
  };

  const handleRowDoubleClick = (rowData: string[]) => {
    setClickCount(0);
    setLastClickTime(0);

    navigate(
      generatePath(`/admin/room/:roomId/matches`, {
        roomId: rowData[0],
      })
    );
  };
  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', label: 'id', options: { display: 'excluded' } },
    { name: 'name', label: 'Nombre' },
    {
      name: 'dueDate',
      label: 'Fecha de Cierre',
      options: {
        customBodyRender: (value: any) => {
          const date = new Date(value);

          const formattedDate = format(date, 'dd/MM/yyyy HH:mm');
          return formattedDate;
        },
      },
    },
    {
      name: 'entryPrice',
      label: 'Precio de Entrada',
      options: {
        customBodyRender: (value: number) => {
          return `$${value.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        },
      },
    },
    {
      name: 'prizeMoney',
      label: 'Premio',
      options: {
        customBodyRender: (value: number) => {
          return `$${value.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        },
      },
    },
    {
      name: 'id',
      label: 'Acciones',
      options: {
        customBodyRender: (value: string) => {
          return (
            <IconButton
              onClick={(event) => {
                setMenuAnchorElement(event.currentTarget);
                setSelectedRowId(value);
              }}
              aria-label="More actions"
              size="small"
            >
              <MoreHoriz />
            </IconButton>
          );
        },
      },
    },
  ];

  return (
    <>
      <StyledTable
        title=""
        data={props.data}
        columns={columns}
        options={{
          ...options,
          onRowClick: (rowData) => {
            handleRowClick(rowData);
          },
        }}
      />
      {menuAnchorElement && selectedRowId && (
        <RoomsTableActionRowMenu
          menuAnchorElement={menuAnchorElement}
          open={Boolean(menuAnchorElement) && Boolean(selectedRowId)}
          onClose={() => {
            setMenuAnchorElement(null);
            setSelectedRowId(null);
          }}
          onEdit={(roomId) => {
            if (props.onEditRoom) {
              props.onEditRoom(roomId);
              setMenuAnchorElement(null);
              setSelectedRowId(null);
            }
          }}
          onDelete={(roomId) => {
            if (props.onDeleteRoom) {
              props.onDeleteRoom(roomId);
              setMenuAnchorElement(null);
              setSelectedRowId(null);
            }
          }}
          onPublish={(roomId) => {
            if (props.onPublishRoom) {
              props.onPublishRoom(roomId);
              setMenuAnchorElement(null);
              setSelectedRowId(null);
            }
          }}
          roomId={selectedRowId}
          allowedActionsSet={props.allowedActionsSet}
        />
      )}
    </>
  );
};

export default TableWithSortingAndSearch;
