import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ userType, setUserType }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#02457A' }}>
      <Toolbar>
        {/* Logo or Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            '&:hover': { color: '#FFC107' },
          }}
          onClick={() => navigate('/')}
        >
          Task Tracker
        </Typography>

        {/* Conditional Navigation Buttons */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {userType === 'owner' && (
            <Button
              color="inherit"
              onClick={() => navigate('/owner-dashboard')}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Owner Dashboard
            </Button>
          )}
          {userType === 'employee' && (
            <Button
              color="inherit"
              onClick={() => navigate('/employee-dashboard')}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Employee Dashboard
            </Button>
          )}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Hamburger Menu for Small Screens */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleMenuOpen}
            sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {userType === 'owner' && (
              <MenuItem onClick={() => { handleMenuClose(); navigate('/owner-dashboard'); }}>
                Owner Dashboard
              </MenuItem>
            )}
            {userType === 'employee' && (
              <MenuItem onClick={() => { handleMenuClose(); navigate('/employee-dashboard'); }}>
                Employee Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
