import { AccordionWithTable } from '@/routes/admin/components/accordion-table';
import { memo, useMemo, useState } from 'react';
import { MyRoomsTable } from '../components/my-rooms-table';
import { UserPage } from '../user-page';
import { Room } from '@/generated/graphql-types.generated';
import { useGetUserPayedRoomsQuery } from '@/graphql/rooms/getUserPayedRooms.generated';
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

const MyRoomsInternal = () => {
  const [payedRooms, setPayedRooms] = useState<Room[]>([]);

  const { loading } = useGetUserPayedRoomsQuery({
    onCompleted: (data) => {
      if (data.getUserPayedRooms) {
        setPayedRooms(data.getUserPayedRooms);
      }
    },
  });

  const activeRooms = useMemo(
    () => payedRooms.filter((room) => room.isActive),
    [payedRooms]
  );

  const inactiveRooms = useMemo(
    () => payedRooms.filter((room) => !room.isActive),
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
              title={'Mis salas activas'}
              dataLength={activeRooms.length}
            >
              <MyRoomsTable
                data={activeRooms}
                onDeleteRoom={() => {
                  console.log('delete');
                }}
                allowedActionsSet={new Set()}
              />
            </AccordionWithTable>
            <Spacer />
            <AccordionWithTable
              title={'Mis salas inactivas'}
              dataLength={inactiveRooms.length}
            >
              <MyRoomsTable
                data={inactiveRooms}
                onDeleteRoom={() => {
                  console.log('delete');
                }}
                allowedActionsSet={new Set()}
              />
            </AccordionWithTable>
          </AccordionGroupContainer>
        )}
      </PageContainer>
    </UserPage>
  );
};

export const MyRooms = memo(MyRoomsInternal);
