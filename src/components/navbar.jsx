import React, { useContext, useState } from 'react';
import { Box, AppBar, Toolbar, Button, useMediaQuery, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './../components/assets/logo1.png';
import { ApiContext } from './ApiContextProvider';
import "./css/navbar.css";
import { useHistory } from 'react-router-dom';


const Navbar = () => {
  const isWideScreen = useMediaQuery('(min-width: 510px)');

  // Simulate user roles (you can get this from your authentication system)
  const { userRole, userToken, userName, setUserName, setUserRole, setUserToken, userId, setUserId } = useContext(ApiContext);
  const handleLogout = () => {
    // Perform logout actions here, e.g., clear local storage or session
    setUserRole('');
    setUserName('');
    setUserToken('');
    setUserId('');

    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
  };

  return (
    <AppBar position='relative' sx={{ backgroundColor: 'rgba(30, 50, 80,  1)', width: '100%' }}>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          sx={{
            alignItems: "center",
            position: 'relative', // Add relative positioning for the parent Box
            maxWidth: '1600px', // Set the maximum width for the content
            margin: '0 auto', // Center the content horizontally
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              flexGrow: 1, // Let this Box grow to fill the available space
            }}
          >
            {/* Your logo or brand */}
            <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '5px' }} />
            {isWideScreen && <h2>Travel<span>Vista</span></h2>}
          </Box>
          <Box>
            <Button color="inherit" component={Link} to="/" className="custom-button">Home</Button>
            {/* <Button color="inherit" component={Link} to="/postgallery" className="custom-button">Gallery</Button> */}
            {userRole === 'admin' && <Button color="inherit" component={Link} to="/admin" className="custom-button">Admin</Button>}
            {userRole === 'agent' && <Button color="inherit" component={Link} to="/agent" className="custom-button">Agent</Button>}
            {(userRole === 'admin' || userRole === 'agent' || userRole === 'user') ? (
              <>
              {console.log(userRole)}
                <Button color="inherit" onClick={handleLogout} className="custom-button" component={Link} to= "/">Logout</Button>
                <Button color="inherit" component={Link} to="/user" className="custom-button"><Typography variant='h6'>X</Typography>plore</Button>
                <Button color="inherit" component={Link} to="/mypackages" className="custom-button">MyPackages</Button>
              </>
            ) : (
              <>
                            {console.log(userRole)}
                {/* <Button color="inherit" component={Link} to="/login" className="custom-button">Login</Button> */}
              </>
            )}
            <Button color="inherit" component={Link} to="/contactus" className="custom-button">Contact</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
