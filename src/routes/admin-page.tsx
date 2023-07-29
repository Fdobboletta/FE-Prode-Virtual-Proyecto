import { memo } from 'react';
import { PrivateLayout } from '../components/private-layout';

import { useCallback } from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Dashboard, People, Assessment, Settings } from '@mui/icons-material';

const StyledList = styled(List)`
  width: 100%;
`;

const StyledBox = styled(Box)`
  margin-top: auto !important;
`;

const DrawerContentContainer = styled(Box)`
  margin-top: 64px !important;
  padding: 16px !important;
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-top: 80px;
    padding: 24px;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;

const StyledContent = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
`;

const AdminDrawerContent = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    []
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <DrawerContentContainer>
      <StyledList>
        <ListItemButton
          onClick={handleNavigation('/prodes')}
          selected={isActive('/prode')}
        >
          <StyledListItemIcon>
            <Dashboard />
          </StyledListItemIcon>
          <ListItemText primary="Prodes" />
        </ListItemButton>
        <ListItemButton
          onClick={handleNavigation('/equipos')}
          selected={isActive('/equipos')}
        >
          <StyledListItemIcon>
            <People />
          </StyledListItemIcon>
          <ListItemText primary="Participantes" />
        </ListItemButton>
        <ListItemButton
          onClick={handleNavigation('/participantes')}
          selected={isActive('/participantes')}
        >
          <StyledListItemIcon>
            <Assessment />
          </StyledListItemIcon>
          <ListItemText primary="Reportes" />
        </ListItemButton>
      </StyledList>
      <StyledBox>
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
      </StyledBox>
    </DrawerContentContainer>
  );
};

const InternalAdminPage = () => {
  return (
    <PrivateLayout
      drawerTitle="Admin Panel"
      drawerContent={<AdminDrawerContent />}
    >
      <StyledContent>HelloWorld</StyledContent>
    </PrivateLayout>
  );
};

export const AdminPage = memo(InternalAdminPage);
