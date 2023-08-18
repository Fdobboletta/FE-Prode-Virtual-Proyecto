import { memo, ReactNode } from 'react';
import { NAV_BAR_HEIGHT, PrivateLayout } from '@/components/private-layout';

import { useCallback } from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Stack,
} from '@mui/material';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';

import { People, Settings, SportsSoccer } from '@mui/icons-material';

import { useGetRoomByIdQuery } from '@/graphql/getRoomById.generated';
import { toRem } from '@/utils';
import { RoomPageContextProvider } from './context/room-page-context';

type RoomPageProps = {
  children: ReactNode;
};
const StyledList = styled(List)`
  width: 100%;
`;

const StyledContainer = styled(Stack)`
  height: calc(100% - ${toRem(NAV_BAR_HEIGHT)});
  max-height: calc(100% - ${toRem(NAV_BAR_HEIGHT)});
  overflow-y: hidden;
`;

const StyledBodyContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

const StyledFooterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  max-height: fit-content;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;

const RoomPageDrawerContent = (props: {
  roomId: string;
}): JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (path: string) => () => {
      navigate(
        generatePath(`/admin/room/${props.roomId}${path}`, {
          roomId: props.roomId,
        })
      );
    },
    []
  );

  const isActive = (path: string) =>
    location.pathname === `/admin/room/${props.roomId}${path}`;

  return (
    <StyledContainer>
      <StyledBodyContainer>
        <StyledList>
          <ListItemButton
            onClick={handleNavigation('/participants')}
            selected={isActive('/participants')}
          >
            <StyledListItemIcon>
              <People />
            </StyledListItemIcon>
            <ListItemText primary="Participantes" />
          </ListItemButton>
          <ListItemButton
            onClick={handleNavigation('/matches')}
            selected={isActive('/matches')}
          >
            <StyledListItemIcon>
              <SportsSoccer />
            </StyledListItemIcon>
            <ListItemText primary="Partidos" />
          </ListItemButton>
        </StyledList>
      </StyledBodyContainer>
      <StyledFooterContainer>
        <Divider />
        <ListItemButton
          onClick={handleNavigation('/configuracion')}
          selected={isActive('/configuracion')}
          style={{ marginTop: 'auto' }}
        >
          <StyledListItemIcon>
            <Settings />
          </StyledListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItemButton>
      </StyledFooterContainer>
    </StyledContainer>
  );
};

const RoomPageInternal = (props: RoomPageProps) => {
  const params = useParams<{ roomId: string }>();

  const { data, loading } = useGetRoomByIdQuery({
    variables: {
      roomId: params.roomId || '',
    },
  });

  if (loading || !data) return null;

  return (
    <PrivateLayout
      drawerTitle={data.getRoomById.name}
      drawerContent={<RoomPageDrawerContent roomId={params.roomId || ''} />}
      renderBackIcon
      backIconPath={'/admin/rooms'}
    >
      <RoomPageContextProvider value={{ room: data.getRoomById }}>
        {props.children}
      </RoomPageContextProvider>
    </PrivateLayout>
  );
};

export const RoomPage = memo(RoomPageInternal);