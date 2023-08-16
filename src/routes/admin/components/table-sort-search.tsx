import { Room } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Delete, Launch } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from 'mui-datatables';
import styled from 'styled-components';

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

type TableWithSortingAndSearchProps = {
  data: Room[];
};

const TableWithSortingAndSearch = (props: TableWithSortingAndSearchProps) => {
  const columns: MUIDataTableColumnDef[] = [
    { name: 'name', label: 'Nombre' },
    {
      name: 'dueDate',
      label: 'Fecha de Cierre',
      options: {
        customBodyRender: (value) => {
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
        customBodyRender: (value) => {
          return `$${value}`;
        },
      },
    },
    {
      name: 'prizeMoney',
      label: 'Premio',
      options: {
        customBodyRender: (value) => {
          return `$${value}`;
        },
      },
    },
    {
      name: 'id',
      label: 'Eliminar',
      options: {
        customBodyRender: (value) => {
          return (
            <IconButton
              onClick={() => {
                console.log('delete', value);
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
      name: 'paymentLink',
      label: 'Link de Pago',
      options: {
        customBodyRender: (value) => {
          return (
            <IconButton
              onClick={() => {
                window.open(value, '_blank');
              }}
              aria-label="Delete"
              size="small"
            >
              <Launch />
            </IconButton>
          );
        },
      },
    },
  ];

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
