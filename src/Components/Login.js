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