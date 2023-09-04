import { memo, ReactNode, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { toRem } from '../utils';
import { useWindowDimensions } from '@/utils/use-windows-dimensions';
import { AccountCircle, ArrowBack, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useLocalStorageState } from 'ahooks';
import { useDynamicMenu } from './modal-container/hooks';
import { MenuItemText } from './menu';

const DRAWER_WIDTH = 240;

export const NAV_BAR_HEIGHT = 49;

const MainLayoutContainer = styled.div`
  display: flex;
`;

type MainProps = {
  $drawerOpen: boolean;
};

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    box-sizing: border-box;
    margin-top: ${toRem(NAV_BAR_HEIGHT)};
    padding: ${toRem(6)} ${toRem(12)};
    width: ${toRem(DRAWER_WIDTH)};
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
      0px 16px 24px 2px rgba(0, 0, 0, 0.14),
      0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  }
`;

const StyledAppBar = styled(AppBar)`
  height: ${toRem(NAV_BAR_HEIGHT)} !important;
  min-height: ${toRem(NAV_BAR_HEIGHT)} !important;
  ${(props) => `
    z-index: ${props.theme.zIndex.drawer + 1};
    ${props.theme.breakpoints.up('md')} {
      width: calc(100% - ${toRem(DRAWER_WIDTH)});
      margin-left: ${toRem(DRAWER_WIDTH)};
    }
  `}
`;

const StyledToolbar = styled(Toolbar)`
  height: ${toRem(NAV_BAR_HEIGHT)};
  min-height: ${toRem(NAV_BAR_HEIGHT)} !important;
  ${(props) => `
    ${props.theme.breakpoints.down('sm')} {
      justify-content: space-between;
    }
  `}
`;

const StyledIconButton = styled(IconButton)`
  ${(props) => `
    ${props.theme.breakpoints.up('md')} {
      display: none;
    }
  `}
`;

const StyledToolbarBodyContainer = styled(Box)`
  display: flex;
  flex: 1;
  height: 100%;
`;

const StyledToolbarLeftContainer = styled(Box)`
  display: flex;
  max-height: fit-content;
`;

const Main = styled.main<MainProps>`
  flex-grow: 1;
  margin-left: ${toRem(DRAWER_WIDTH)};

  transition: ${({ theme }) =>
    theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })};
  ${({ $drawerOpen }) =>
    !$drawerOpen &&
    css`
      transition: ${(props) =>
        props.theme.transitions.create('margin', {
          easing: props.theme.transitions.easing.easeOut,
          duration: props.theme.transitions.duration.enteringScreen,
        })};

      margin-left: 0;
    `};
`;

const StyledTypography = styled(Typography)`
  align-self: center;
`;

const MainSubContainer = styled.div`
  box-shadow: 0 0 ${toRem(10)} 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const ChildrenContainer = styled(Box)`
  margin-top: ${toRem(NAV_BAR_HEIGHT)};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

type PrivateLayoutProps = {
  drawerTitle: string;
  drawerContent: JSX.Element;
  children: ReactNode;
  renderBackIcon?: boolean;
  backIconPath?: string;
};

const InternalPrivateLayout = (props: PrivateLayoutProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menuController = useDynamicMenu();

  const [authData] = useLocalStorageState<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }>('authData');

  const [windowDimensions] = useWindowDimensions();

  const handleDrawerToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBackButtonClick = useCallback(() => {
    if (props.backIconPath) {
      navigate(props.backIconPath);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate('/login');
  }, []);

  const theme = useTheme();

  const isSmallScreen = windowDimensions.width <= theme.breakpoints.values.sm;

  return (
    <MainLayoutContainer>
      <StyledDrawer
        onClose={handleDrawerClose}
        open={open}
        role="presentation"
        variant={isSmallScreen ? 'temporary' : 'persistent'}
      >
        {props.drawerContent}
      </StyledDrawer>
      <Main $drawerOpen={open}>
        <MainSubContainer data-testid="main-sub-container">
          <StyledAppBar position="fixed">
            <StyledToolbar>
              <StyledToolbarBodyContainer>
                {props.renderBackIcon && (
                  <StyledIconButton
                    color="inherit"
                    aria-label="back button"
                    onClick={handleBackButtonClick}
                    edge="start"
                  >
                    <ArrowBack />
                  </StyledIconButton>
                )}
                <StyledIconButton
                  color="inherit"
                  aria-label="toggle drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </StyledIconButton>
                <StyledTypography variant="h6" noWrap>
                  {props.drawerTitle}
                </StyledTypography>
              </StyledToolbarBodyContainer>
              <StyledToolbarLeftContainer>
                <StyledTypography variant="h6">{`${authData?.firstName} ${authData?.lastName}`}</StyledTypography>
                <StyledIconButton
                  color="inherit"
                  aria-label="user-icon"
                  sx={{
                    ':hover': {
                      backgroundColor: 'inherit',
                    },
                    ':focus': {
                      backgroundColor: 'inherit',
                    },
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    menuController.onOpenMenu(event);
                  }}
                >
                  <AccountCircle />
                </StyledIconButton>
              </StyledToolbarLeftContainer>
            </StyledToolbar>
          </StyledAppBar>
          <ChildrenContainer>{props.children}</ChildrenContainer>
        </MainSubContainer>
      </Main>
      <Menu
        anchorEl={menuController.menuAnchorRef.current}
        disableAutoFocus
        onClose={menuController.onCloseMenu}
        open={menuController.menuOpen}
      >
        <MenuItem
          data-testid="WorkbooksList-workbook-edit-button"
          onClick={handleLogout}
        >
          <Logout />
          <MenuItemText>Cerrar Sesion</MenuItemText>
        </MenuItem>
      </Menu>
    </MainLayoutContainer>
  );
};

export const PrivateLayout = memo(InternalPrivateLayout);
