import { Room } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Delete, Publish } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from 'mui-datatables';
import styled from 'styled-components';

type TableWithSortingAndSearchProps = {
  data: Room[];
  onActivateRoom?: (roomId: string) => void;
  onDeleteRoom: (roomId: string) => void;
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
  const columns: MUIDataTableColumnDef[] = [
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
    {
      name: 'id',
      label: 'Publicar Sala',
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
  ].filter((column) =>
    props.onActivateRoom ? column : column.label !== 'Publicar Sala'
  );

  return (
    <StyledTable
      title=""
      data={props.data}
      columns={columns}
      options={options}
    />
  );
};

export default TableWithSortingAndSearch;
