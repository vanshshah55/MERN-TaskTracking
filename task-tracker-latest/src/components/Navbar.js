import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userType, setUserType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Tracker
        </Typography>
        {userType === 'owner' && (
          <Button color="inherit" onClick={() => navigate('/owner')}>
            Owner Dashboard
          </Button>
        )}
        {userType === 'employee' && (
          <Button color="inherit" onClick={() => navigate('/employee')}>
            Employee Dashboard
          </Button>
        )}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
