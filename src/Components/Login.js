import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Static username and password for demo
    const validUsername = 'admin';
    const validPassword = 'password123';

    if (formData.username === validUsername && formData.password === validPassword) {
      localStorage.setItem('user', JSON.stringify(formData));
      alert('Login Successful!');
      setError(null);
      navigate('/etable'); // ✅ Redirect to EmployeeTable
    } else {
      setError('401 - Unauthorized: Invalid username or password');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%', // ✅ Dynamic width
        maxWidth: '500px', // ✅ Max width set for large screens
        margin: '50px auto',
        padding: '40px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        '&:hover': {
          boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
        },
      }}
    >
      {/* Title */}
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 700, 
          color: '#1a73e8',
          marginBottom: '10px'
        }}
      >
        Login
      </Typography>
      
      {/* Username Field */}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        sx={{
          '& label.Mui-focused': {
            color: '#1a73e8',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#1a73e8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a73e8',
            },
          },
        }}
      />
      
      {/* Password Field */}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        sx={{
          '& label.Mui-focused': {
            color: '#1a73e8',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#1a73e8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a73e8',
            },
          },
        }}
      />

      {/* Error Message */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            backgroundColor: '#ffebee',
            color: '#c62828',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {error}
        </Alert>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth
        sx={{
          backgroundColor: '#1a73e8',
          padding: '14px',
          fontWeight: '600',
          fontSize: '16px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#1565c0',
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
