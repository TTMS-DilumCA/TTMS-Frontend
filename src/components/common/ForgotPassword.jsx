import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`http://localhost:8080/forgotPassword/verifyEmail/${email}`);
      setMessage(response.data);
      setError(''); // Clear any previous error message
      // Add a delay before navigating to the VerifyOtp page
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1000); // 2-second delay
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('Please provide a valid email'); // Set the error message from the backend
      } else {
        setError('An error occurred. Please try again.'); // Set a generic error message
      }
      setMessage(''); // Clear any previous success message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Forgot Password
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
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Send OTP'}
          </Button>
        </form>
        {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default ForgotPassword;