import { AccordionWithTable } from '@/routes/admin/components/accordion-table';
import { memo, useMemo, useState } from 'react';
import { MyRoomsTable } from '../components/my-rooms-table';
import { UserPage } from '../user-page';

import {
  GetUserPayedRoomsQuery,
  useGetUserPayedRoomsQuery,
} from '@/graphql/rooms/getUserPayedRooms.generated';
import { CircularProgress } from '@mui/material';
import { toRem } from '@/utils';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${toRem(16)};
`;

const AccordionGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Spacer = styled.div`
  margin-top: ${toRem(6)};
`;

export type UserMyRoomInternalRoom =
  GetUserPayedRoomsQuery['getUserPayedRooms'][0];

const MyRoomsInternal = () => {
  const [payedRooms, setPayedRooms] = useState<UserMyRoomInternalRoom[]>([]);

  const { loading } = useGetUserPayedRoomsQuery({
    onCompleted: (data) => {
      if (data.getUserPayedRooms) {
        setPayedRooms(data.getUserPayedRooms);
      }
    },
  });

  const activeRooms = useMemo(
    () => payedRooms.filter((room) => room.isActive && !room.isClosed),
    [payedRooms]
  );

  const closedRooms = useMemo(
    () => payedRooms.filter((room) => room.isClosed),
    [payedRooms]
  );

  return (
    <UserPage>
      <PageContainer>
        {loading ? (
          <CircularProgress />
        ) : (
          <AccordionGroupContainer>
            <AccordionWithTable
              title={'PRODES EN CURSO'}
              dataLength={activeRooms.length}
            >
              <MyRoomsTable data={activeRooms} allowedActionsSet={new Set()} />
            </AccordionWithTable>
            <Spacer />
            <AccordionWithTable
              title={'PRODES FINALIZADOS'}
              dataLength={closedRooms.length}
            >
              <MyRoomsTable data={closedRooms} allowedActionsSet={new Set()} />
            </AccordionWithTable>
          </AccordionGroupContainer>
        )}
      </PageContainer>
    </UserPage>
  );
};

export const MyRooms = memo(MyRoomsInternal);
