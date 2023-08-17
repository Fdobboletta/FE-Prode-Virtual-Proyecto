/* eslint-disable @typescript-eslint/no-explicit-any */
import { Room } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Delete, Edit, Publish } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from 'mui-datatables';
import { useState } from 'react';
import { useNavigate, generatePath } from 'react-router';
import styled from 'styled-components';

type TableWithSortingAndSearchProps = {
  data: Room[];
  onActivateRoom?: (roomId: string) => void;
  onEditRoom?: (roomId: string) => void;
  onDeleteRoom: (roomId: string) => void;
  inactiveRooms: boolean;
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

const inactiveRoomsColumns = new Set(['Editar', 'Publicar']);

const TableWithSortingAndSearch = (props: TableWithSortingAndSearchProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

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
  const columns = [
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
        customBodyRender: (value: any) => {
          return `$${value}`;
        },
      },
    },
    {
      name: 'prizeMoney',
      label: 'Premio',
      options: {
        customBodyRender: (value: any) => {
          return `$${value}`;
        },
      },
    },
    {
      name: 'id',
      label: 'Editar',
      options: {
        customBodyRender: (value: any) => {
          return (
            <IconButton
              onClick={() => {
                if (props.onEditRoom) {
                  props.onEditRoom(value);
                }
              }}
              aria-label="Publish"
              size="small"
            >
              <Edit />
            </IconButton>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Publicar',
      options: {
        customBodyRender: (value: any) => {
          return (
            <IconButton
              onClick={() => {
                if (props.onActivateRoom) {
                  props.onActivateRoom(value);
                }
              }}
              aria-label="Publish"
              size="small"
            >
              <Publish />
            </IconButton>
          );
        },
      },
    },

    {
      name: 'id',
      label: 'Eliminar',
      options: {
        customBodyRender: (value: any) => {
          return (
            <IconButton
              onClick={() => {
                props.onDeleteRoom(value);
              }}
              aria-label="Delete"
              size="small"
            >
              <Delete />
            </IconButton>
          );
        },
      },
    },
  ].filter((column) =>
    props.inactiveRooms ? column : !inactiveRoomsColumns.has(column.label)
  ) as MUIDataTableColumnDef[];

  return (
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
  );
};

export default TableWithSortingAndSearch;
