import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 256;

const MainLayoutContainer = styled.div`
  display: flex;
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
  }
`;

const StyledAppBar = styled(AppBar)`
  ${(props) => `
    z-index: ${props.theme.zIndex.drawer + 1};
    ${props.theme.breakpoints.up('md')} {
      width: calc(100% - ${drawerWidth}px);
      margin-left: ${drawerWidth}px;
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

const PrivateLayout: React.FC = () => {
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
            Cuerpo Tecnico
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
        drawer content
      </StyledDrawer>
    </MainLayoutContainer>
  );
};

export default PrivateLayout;
