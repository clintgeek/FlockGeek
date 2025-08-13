import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';
import theme from './theme.js';
import BirdsPage from './pages/BirdsPage.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import EggLogPage from './pages/EggLogPage.jsx';

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, flexGrow: 1 }}>
            <AgricultureIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>FlockGeek</Typography>
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>&lt;/&gt;</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { top: '60px', height: 'calc(100% - 60px)', borderRadius: 0 } }}
      >
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            <ListItemButton component={NavLink} to="/birds">
              <ListItemText primary="Birds" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/groups">
              <ListItemText primary="Groups" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/egg-log">
              <ListItemText primary="Egg Log" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<BirdsPage />} />
          <Route path="/birds" element={<BirdsPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/egg-log" element={<EggLogPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
