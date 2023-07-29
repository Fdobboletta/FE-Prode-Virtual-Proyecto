import { memo, ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toRem } from '../utils';

const DRAWER_WIDTH = 256;

const NAV_BAR_HEIGHT = 64;

const MainLayoutContainer = styled.div`
  display: flex;
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${DRAWER_WIDTH}px;
  }
`;

const StyledAppBar = styled(AppBar)`
  ${(props) => `
    z-index: ${props.theme.zIndex.drawer + 1};
    ${props.theme.breakpoints.up('md')} {
      width: calc(100% - ${DRAWER_WIDTH}px);
      margin-left: ${DRAWER_WIDTH}px;
    }
  `}
`;

const StyledToolbar = styled(Toolbar)`
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

const PageContentContainer = styled.div`
  margin-left: ${toRem(DRAWER_WIDTH)};
  margin-top: ${toRem(NAV_BAR_HEIGHT)};
`;

type PrivateLayoutProps = {
  drawerTitle: string;
  drawerContent: JSX.Element;
  children: ReactNode;
};

const InternalPrivateLayout = (props: PrivateLayoutProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <MainLayoutContainer>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <StyledIconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </StyledIconButton>
          <Typography variant="h6" noWrap component="div">
            {props.drawerTitle}
          </Typography>
        </StyledToolbar>
      </StyledAppBar>
      <StyledDrawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {props.drawerContent}
      </StyledDrawer>
      <PageContentContainer>{props.children}</PageContentContainer>
    </MainLayoutContainer>
  );
};

export const PrivateLayout = memo(InternalPrivateLayout);
