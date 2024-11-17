// src/machineOperator_01/NavBarOperator1.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Link } from '@mui/material';
import logo from '../../assets/logo.png'; // Replace with the path to your logo image

const NavBarOperator1 = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#e3f2fd', boxShadow: 'none', zIndex: 1300 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side with logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Gislaved Gummi" style={{ height: '40px', marginRight: '10px' }} />
        </Box>

        {/* Center with navigation links */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link href="#" underline="none" color="textPrimary" variant="body1">
            Home
          </Link>
          <Link href="#" underline="none" color="textPrimary" variant="body1">
            Tasks
          </Link>
          <Link href="#" underline="none" color="textPrimary" variant="body1">
            Reports
          </Link>
        </Box>

        {/* Right side with user avatar and name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="John Doe" src="/path-to-avatar.jpg" sx={{ marginRight: '10px' }} />
          <Typography variant="body1" color="textPrimary">
            John Doe
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarOperator1;