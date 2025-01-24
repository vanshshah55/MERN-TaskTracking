import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserType }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated login logic
    if (credentials.username === 'owner' && credentials.password === 'owner123') {
      setUserType('owner');
      navigate('/owner-dashboard');
    } else if (credentials.username === 'employee' && credentials.password === 'employee123') {
      setUserType('employee');
      navigate('/employee-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 8 }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default Login;
