import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/forgotPassword/changePassword/${email}`, {
        password,
        repeatPassword,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <Container maxWidth="sm">
        {/* need implement change password functionality here */}
      {/* <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Repeat Password"
            type="password"
            fullWidth
            margin="normal"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Change Password
          </Button>
        </form>
        {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
      </Box> */}
    </Container>
  );
};

export default ChangePassword;