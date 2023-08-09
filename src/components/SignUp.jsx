import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, FormControlLabel, Switch } from '@mui/material';
import backgroundImage from './assets/Background7.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios or your preferred HTTP client library

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    name: '',
    userPassword: '',
    role: 'user',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    phone: '',
    email: '',
    name: '',
    userPassword: '',
  });


  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      role: event.target.checked ? 'agent' : 'user',
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpClick = async () => {
    try {
      // Perform form validation before submitting the form
      const errors = {};

      // Validate username: At least 4 characters
      if (formData.username.trim().length < 4) {
        errors.username = 'Username must be at least 4 characters';
      }

      // Validate password: Letters, numbers, and symbols with a minimum length of 8
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordPattern.test(formData.userPassword)) {
        errors.userPassword =
          'Password must contain at least 8 characters, including letters, numbers, and symbols';
      }

      // Validate name: Only letters and spaces allowed
      const namePattern = /^[A-Za-z][A-Za-z\s]+$/;
      if (!namePattern.test(formData.name)) {
        errors.name = 'Name must contain only letters and spaces';
      }

      // Validate email: Email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = 'Invalid email format';
      }

      // Validate phone number: 10 numbers
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(formData.phone)) {
        errors.phone = 'Phone number must contain exactly 10 numbers';
      }

      // If there are any errors, update the formErrors state and stop the sign-up process
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      // Make the API POST request
      const response = await axios.post('https://localhost:7290/api/Users/Register', formData);
      if (formData.role === 'user') {
        alert('User registered successfully!');
        console.log('User registered successfully!', response.data);
        // You can display this message using a toast or any other notification method
      }
      if (formData.role === 'agent') {
        alert('Account waiting for approval from admin.');
        // You can display this message using a toast or any other notification method
      }
      // After successful sign up, you can navigate to another page, e.g., Home page
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle errors that occurred during sign up
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
      {/* ... other input fields ... */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!formErrors.username}
          helperText={formErrors.username}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          name="userPassword"
          value={formData.userPassword}
          onChange={handleChange}
          error={!!formErrors.userPassword}
          helperText={formErrors.userPassword}
        />
      </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.role === 'agent'}
                  onChange={handleRoleChange}
                  color="primary"
                />
              }
              label={formData.role === 'agent' ? 'Agent' : 'User'}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button onClick={() => navigate('/login')} sx={{ color: 'purple' }}>
                Login
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
