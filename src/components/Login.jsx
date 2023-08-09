import React, { useContext, useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import backgroundImage from './assets/Background3.jpg'; // Replace with your image path
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import axios
import { ApiContext } from './ApiContextProvider';

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { setUserRole, setUserToken, setUserName, setUserId } = useContext(ApiContext);
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input

  const handleSignUpClick = () => {
    // Programmatically navigate to the SignUp page
    navigate('/signup');
  };

  const handleLogin = async () => {
    try {
      // Make the login API request
      const response = await axios.post('https://localhost:7290/api/Users/LogIN', {
        username,
        password,
      });

      // Assuming the response contains the user details after successful login
      const user = response.data;

      // Set the user details in the ApiContext
      setUserRole(user.role);
      setUserToken(user.token);
      setUserName(user.username);
      setUserId(user.id);


      sessionStorage.setItem('userRole', user.role);
      sessionStorage.setItem('userToken', user.token);
      sessionStorage.setItem('userName', user.username);
      sessionStorage.setItem('userId', user.id);


      // Navigate to the home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, e.g., show error message
      alert('Incorrect username or password. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '400px',
          width: '90%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Welcome to TravelVista!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button onClick={handleSignUpClick} sx={{ color: 'purple' }}>
                Sign up
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
