import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import SilkBackground from "./components/background/Silk";
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
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const App = () => {
  const navigate = useNavigate();
  // Define your menu items with route paths
  // Define your menu items with route paths
  const menuItems = [
    { text: 'Home', icon: <DashboardIcon />, path: '/' },
    { text: 'Kanban Board', icon: <ViewKanbanIcon />, path: '/kanban' },
    { text: 'Projects', icon: <WorkspacesIcon />, path: '/projects' },
    { text: 'Teams', icon: <GroupIcon />, path: '/teams' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/logout' }, // implement logout logic as needed
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top Silk Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: drawerWidth,
          right: 0,
          height: 200,
          zIndex: 0,
        }}
      >
        <SilkBackground color="#4b8bbe" speed={5} noiseIntensity={1.5} />
      </Box>

      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ zIndex: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🧠 Kanbix
          </Typography>
          <IconButton color="inherit">
            <Avatar alt="User" src="/avatar.png" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#1e1e1e',
            color: '#fff',
          },
        }}
      >
        <Toolbar />
<Box sx={{ overflow: 'auto' }}>
  <List>
    {menuItems.map(({ text, icon, path }) => (
      <ListItem
        button
        key={text}
        onClick={() => navigate(path)}
      >
        <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
</Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#0f0f0f',
          minHeight: '100vh',
          p: 3,
          ml: `${drawerWidth}px`,
          mt: 8, // spacing under AppBar
          position: 'relative',
          zIndex: 1,
        }}
      >
        <KanbanBoard />
      </Box>
    </Box>
  );
};

export default App;
