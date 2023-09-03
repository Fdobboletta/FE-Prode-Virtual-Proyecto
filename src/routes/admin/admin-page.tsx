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
import { MercadoPagoIcon } from '@/components/svg-icon/mercado-pago';

import { Assessment, Settings, MeetingRoom } from '@mui/icons-material';
import { toRem } from '@/utils';

type AdminPageProps = {
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
            <ListItemText primary="Mis salas" />
          </ListItemButton>
          <ListItemButton
            disabled
            onClick={handleNavigation('/reports')}
            selected={isActive('/reports')}
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
