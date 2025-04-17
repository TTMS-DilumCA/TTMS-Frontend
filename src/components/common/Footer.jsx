import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#e3f2fd',
        textAlign: 'center',
        padding: 2,
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        bottom: 0,
        zIndex: 1300,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="https://yourwebsite.com/">
         Tool Time Management System
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;