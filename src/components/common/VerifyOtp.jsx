import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/forgotPassword/verifyOtp/${otp}/${email}`);
      setMessage(response.data);
      // Navigate to ResetPassword page after successful OTP verification
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`http://localhost:8080/forgotPassword/verifyEmail/${email}`);
      setMessage(response.data);
      setTimeLeft(120); // Reset timer
      setResendDisabled(true); // Disable resend button
    } catch (error) {
      setMessage('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false); // Set loading state to false
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Verify OTP
        </Typography>
        <Typography variant="body1" gutterBottom>
          An OTP has been sent to your email address: {email}. Please enter it within the next {formatTime(timeLeft)} minutes.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="OTP"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Verify OTP
          </Button>
        </form>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleResendOtp}
          disabled={resendDisabled || resendLoading}
        >
          {resendLoading ? <CircularProgress size={24} /> : 'Resend OTP'}
        </Button>
        {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default VerifyOtp;