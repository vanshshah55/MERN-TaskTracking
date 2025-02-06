import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Alert, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Lock } from '@mui/icons-material';

const Login = ({ setUserType }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); 
  const navigate = useNavigate();


  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0); // Reset progress
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 5)); // Increment progress smoothly
      }, 200);
    } else {
      setProgress(0); // Reset on completion
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    

    // Prepare login data
    const loginData = {
      username: credentials.username,
      password: credentials.password,
    };

    try {
      console.log("Sending login request...");
      const response = await fetch('https://mern-tasktracking-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login Successful:', data);
        setUserType(data.userType);
        setProgress(100); // Set progress to 100% on success
        setTimeout(() => navigate(data.userType === 'owner' ? '/owner-dashboard' : '/employee-dashboard'), 500);
      } else {
        console.error('Login Failed:', data.message);
        setError(data.message);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #02457A, #88CCF1)',
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: '100%',
          padding: 4,
          borderRadius: 4,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <CardContent>
          {/* Vipsee Infotech Branding */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight="bold" color="#02457A">
              Vipsee Infotech
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {/* Your Trusted Partner in Surveillance and Networking Solutions */}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <TextField
              label="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: (
                  <AccountCircle sx={{ color: 'gray', mr: 1 }} />
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: 'gray', mr: 1 }} />
                ),
              }}
            />
            {/* Button with Loader */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: '#02457A',
                '&:hover': { bgcolor: '#023E6A' },
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                position: 'relative',
                height: '50px',
              }}
            >
              {loading ? (
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={progress} 
                    size={30} 
                    sx={{ color: 'white', mr: 1 }} 
                  />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {progress}%
                  </Typography>
                </Box>
              ) : 'Login'}
            </Button>
          </Box>
        </CardContent>
        {/* Footer */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} Vipsee Infotech. All rights reserved.
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
