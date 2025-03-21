import React from 'react';  
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';  
import bgImage from '../Assets/loged.jpg';  
import Toaster from '../Shared/Toaster'; 
import useLogin from '../Shared/Uselogin';  

const LoginForm = () => {  
  const {formData,open,setOpen,showPassword,setShowPassword,handleChange,handleSubmit} = useLogin();  

  return (  
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f3e8ff">  
      <Box display="flex" width="800px" borderRadius="12px" boxShadow="0 4px 12px rgba(0,0,0,0.1)" overflow="hidden">  
        <Box width="60%" sx={{ background: `url(${bgImage}) center/cover` }} />  
        <Box width="50%" p={3} bgcolor="#fff">  
          <form onSubmit={handleSubmit} autoComplete="off">  
            <Typography variant="h5" fontWeight="bold" mb={2}>Sign In</Typography>  
            <TextField fullWidth label="Username or Email" name="username" value={formData.username} onChange={handleChange} margin="normal" autoComplete="off"  />  
            <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} margin="normal"/>  
            <FormControlLabel control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)}/>}label="Show Password" sx={{ mt: 1, mb: 2 }}/>  
            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#7B2CBF', '&:hover': { backgroundColor: '#5a1d8e' }, mt: 1 }}>Sign In</Button>  
            <Typography mt={2} textAlign="center"> New here? <Button sx={{ color: '#7B2CBF', textTransform: 'none', padding: 0 }}>Create an account</Button> </Typography>  
          </form>  
        </Box>  
      </Box>  
      <Toaster open={open} setOpen={setOpen} />  
    </Box>  
  );  
};  
export default LoginForm;

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

