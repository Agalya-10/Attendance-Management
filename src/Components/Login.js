import React from 'react';  
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Grid2 } from '@mui/material';  
import bgImage from '../Assets/signin.png';  
import Toaster from '../Shared/Toaster'; 
import useLogin from '../Shared/Uselogin';  
const LoginForm = () => {  
  const { formData, open, setOpen, showPassword, setShowPassword, handleChange, handleSubmit } = useLogin();  
  return (  
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f3e8ff">  
      <Grid2 container size={{ width: '90%', maxWidth: '800px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>  
        <Grid2 item  size={{ xs: 12, md: 6 }} sx={{background: `url(${bgImage}) center/cover`,height: { xs: '200px', md: 'auto' }}} />  
        <Grid2 item  size={{ xs: 12, md: 6 }} sx={{ backgroundColor: '#fff', padding: '24px' }}>  
          <form onSubmit={handleSubmit} autoComplete="off">  
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">Sign In</Typography>  
            <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" autoComplete="off"/>  
            <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} margin="normal"/>  
            <FormControlLabel control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />} label="Show Password"sx={{ mt: 1, mb: 2 }}/>  
            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#00376A', '&:hover': { backgroundColor: '#00376A' }, mt: 1 }}>Sign In</Button>  
            <Typography mt={2} textAlign="center">New here? <Button sx={{ color: '#00376A', textTransform: 'none', padding: 0 }}>Create an account</Button></Typography>  
          </form>  
        </Grid2>  
      </Grid2> 
      <Toaster open={open} setOpen={setOpen} />  
    </Box>  
  );  
};  
export default LoginForm;
