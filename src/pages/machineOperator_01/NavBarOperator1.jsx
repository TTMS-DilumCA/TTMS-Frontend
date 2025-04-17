import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Link, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Replace with the path to your logo image

const NavBarOperator1 = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#e3f2fd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: 1300 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
        {/* Left side with logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Gislaved Gummi" style={{ height: '40px', marginRight: '10px' }} />
        </Box>

        {/* Center with navigation links */}
        <Box sx={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link
            component={RouterLink}
            to="/operator-home"
            underline="none"
            color="textPrimary"
            variant="body1"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': {
                color: '#1976d2',
                transform: 'scale(1.1)',
              },
            }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/operator-tasks"
            underline="none"
            color="textPrimary"
            variant="body1"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': {
                color: '#1976d2',
                transform: 'scale(1.1)',
              },
            }}
          >
            Machine processes
          </Link>
          <Link
            component={RouterLink}
            to="/operator-reports"
            underline="none"
            color="textPrimary"
            variant="body1"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': {
                color: '#1976d2',
                transform: 'scale(1.1)',
              },
            }}
          >
            Profile
          </Link>
        </Box>

        {/* Right side with user avatar and name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="John Doe" src="/path-to-avatar.jpg" sx={{ marginRight: '10px' }} />
          <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
           Machineoperator1
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ marginLeft: '9px' }} onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: '5px' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarOperator1;