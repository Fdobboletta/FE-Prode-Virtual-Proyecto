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
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Settings, List as ListIcon, MeetingRoom } from '@mui/icons-material';
import { toRem } from '@/utils';

type UserPageProps = {
  children: ReactNode;
};

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

const StyledList = styled(List)`
  width: 100%;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;

const UserDrawerContent = (): JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (path: string) => () => {
      navigate(`/user${path}`);
    },
    []
  );

  const isActive = (path: string) => location.pathname === `/user${path}`;

  return (
    <StyledContainer>
      <StyledBodyContainer>
        <StyledList>
          <ListItemButton
            onClick={handleNavigation('/rooms')}
            selected={isActive('/rooms')}
          >
            <StyledListItemIcon>
              <MeetingRoom />
            </StyledListItemIcon>
            <ListItemText primary="Salas" />
          </ListItemButton>
          <ListItemButton
            onClick={handleNavigation('/myrooms')}
            selected={isActive('/myrooms')}
          >
            <StyledListItemIcon>
              <ListIcon />
            </StyledListItemIcon>
            <ListItemText primary="Mis prodes" />
          </ListItemButton>
        </StyledList>
      </StyledBodyContainer>
      <StyledFooterContainer>
        <Divider />
        <ListItemButton
          onClick={handleNavigation('/config')}
          selected={isActive('/config')}
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

const InternalUserPage = (props: UserPageProps) => {
  return (
    <PrivateLayout
      drawerTitle="Menu de jugador"
      drawerContent={<UserDrawerContent />}
    >
      {props.children}
    </PrivateLayout>
  );
};

export const UserPage = memo(InternalUserPage);
