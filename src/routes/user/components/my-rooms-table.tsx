/* eslint-disable @typescript-eslint/no-explicit-any */

import { RoomTableRowMenuActions } from '@/routes/admin/components/rooms-table-action-row-menu';
import { toRem } from '@/utils';

import { format, isAfter } from 'date-fns';
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from 'mui-datatables';
import { memo, useState } from 'react';
import { useNavigate, generatePath } from 'react-router';
import styled from 'styled-components';
import { UserMyRoomInternalRoom } from '../rooms/my-rooms';

type TableWithSortingAndSearchProps = {
  data: UserMyRoomInternalRoom[];
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

const MyRoomsTableInternal = (props: TableWithSortingAndSearchProps) => {
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
      generatePath(`/user/room/:roomId/matches`, {
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
          const dueDate = new Date(value);

          const dueRoom = isAfter(new Date(), dueDate);

          const formattedDate = format(dueDate, 'dd/MM/yyyy HH:mm');
          return `${formattedDate} ${dueRoom ? '(vencida)' : ''}`;
        },
      },
    },
    {
      name: 'entryPrice',
      label: 'Precio de Entrada',
      options: {
        customBodyRender: (value: any) => {
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
        customBodyRender: (value: any) => {
          return `$${value.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
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
    </>
  );
};

export const MyRoomsTable = memo(MyRoomsTableInternal);
