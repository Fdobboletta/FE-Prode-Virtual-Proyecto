import { memo, ReactNode } from 'react';
import { PrivateLayout } from '@/components/private-layout';

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
import { MercadoPagoIcon } from '@/components/svg-icon/mercado-pago';

import { People, Assessment, Settings, MeetingRoom } from '@mui/icons-material';

type AdminPageProps = {
  children: ReactNode;
};
const StyledList = styled(List)`
  width: 100%;
`;

const StyledBox = styled(Box)`
  margin-top: auto !important;
`;

const DrawerContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 36px;
`;

const AdminDrawerContent = (): JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (path: string) => () => {
      navigate(`/admin${path}`);
    },
    []
  );

  const isActive = (path: string) => location.pathname === `/admin${path}`;

  return (
    <DrawerContentContainer>
      <StyledList>
        <ListItemButton
          onClick={handleNavigation('/rooms')}
          selected={isActive('/rooms')}
        >
          <StyledListItemIcon>
            <MeetingRoom />
          </StyledListItemIcon>
          <ListItemText primary="Mis salas" />
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
        <ListItemButton
          onClick={handleNavigation('/integrations')}
          selected={isActive('/integrations')}
        >
          <StyledListItemIcon>
            <MercadoPagoIcon />
          </StyledListItemIcon>
          <ListItemText primary="Mercado Pago" />
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

const InternalAdminPage = (props: AdminPageProps) => {
  return (
    <PrivateLayout
      drawerTitle="Admin Panel"
      drawerContent={<AdminDrawerContent />}
    >
      {props.children}
    </PrivateLayout>
  );
};

export const AdminPage = memo(InternalAdminPage);
