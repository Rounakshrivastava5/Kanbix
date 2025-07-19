import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import SilkBackground from "./components/background/Silk";
import Iridescence from "./components/background/iri";
import Aurora  from "./components/background/dot-grid";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Divider,
  Tooltip,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from './assets/Kanbix-grey.png';


const drawerWidth = 240;
const collapsedWidth = 70;

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { text: 'Signup', path: '/' },
    { text: 'Home', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Kanban Board', icon: <ViewKanbanIcon />, path: '/kanban' },
    { text: 'Projects', icon: <WorkspacesIcon />, path: '/projects' },
    { text: 'Teams', icon: <GroupIcon />, path: '/teams' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/' },
  ];

  const drawer = (
    <Box
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        height: '100%',
        bgcolor: '#1e1e1e',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Toolbar sx={{ justifyContent: isCollapsed ? 'center' : 'space-between', px: 2 }}>
          {!isCollapsed && <Typography variant="h6">          <img src={logoImage} alt="Kanbix Logo" style={{ height: 40 }} />
          </Typography>}
          {isMobile && (
            <IconButton onClick={toggleMobileDrawer} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>

        <List>
          {menuItems.map(({ text, icon, path }) => (
            <Tooltip title={isCollapsed ? text : ''} placement="right" key={text}>
              <ListItem
                button
                onClick={() => {
                  navigate(path);
                  if (isMobile) toggleMobileDrawer();
                }}
                selected={location.pathname === path}
                sx={{
                  '&.Mui-selected': { bgcolor: '#333' },
                  '&:hover': { bgcolor: '#333' },
                  px: isCollapsed ? 2 : 3,
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: isCollapsed ? 'auto' : 2 }}>
                  {icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Collapse Button (Only on Desktop) */}
      {!isMobile && (
        <Box sx={{ py: 1, display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-end' }}>
          <IconButton onClick={toggleCollapse} sx={{ color: '#fff' }}>
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Aurora Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: isMobile ? 0 : (isCollapsed ? `${collapsedWidth}px` : `${drawerWidth}px`),
          right: 0,
          height: 200,
          zIndex: 0,
          transition: 'left 0.3s ease',
        }}
      >
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </Box>

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={toggleMobileDrawer} sx={{ mr: 2, color: '#fff' }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, mt: 2 }}>
            
          </Typography>
          <IconButton color="inherit">
            <Avatar alt="Rounak Shrivastava" src="/avatar.png" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer: Desktop vs Mobile */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? mobileOpen : true}
        onClose={toggleMobileDrawer}
        sx={{
          width: isCollapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isCollapsed ? collapsedWidth : drawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.3s ease',
            bgcolor: '#1e1e1e',
          },
        }}
      >
        {drawer}
      </Drawer>
      

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          p: 3,
          mt: 8,
          bgcolor: '#0f0f0f',
          ml: isMobile ? 0 : (isCollapsed ? `${collapsedWidth}px` : `${drawerWidth}px`),
          transition: 'margin 0.3s ease',
        }}
      >
        <KanbanBoard />
        
      </Box>
      
    </Box>
  );
};

export default App;
