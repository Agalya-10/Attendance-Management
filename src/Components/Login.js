import React from "react";  
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Grid } from "@mui/material";  
import { useNavigate } from "react-router-dom";
import bgImage from "../Assets/loged.jpg";  
import Toaster from "../Shared/Toaster"; 
import useLogin from "../Shared/Uselogin";  

const LoginForm = () => {  
  const navigate = useNavigate();  
  const { formData, open, setOpen, showPassword, setShowPassword, handleChange } = useLogin();  

  const handleSubmit = (e) => {  
    e.preventDefault();
    
    // Temporary Authentication Logic
    if (formData.username === "admin" && formData.password === "password") {  
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      setOpen(true); // Show error toaster
    }
  };  

  return (  
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f3e8ff">  
      <Grid container sx={{ width: '90%', maxWidth: '800px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>  
        <Grid item xs={12} md={6} sx={{ background: `url(${bgImage}) center/cover`, height: { xs: '200px', md: 'auto' } }} />  
        <Grid item xs={12} md={6} sx={{ backgroundColor: "#fff", padding: "24px" }}>  
          <form onSubmit={handleSubmit} autoComplete="off">  
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">Sign In</Typography>  
            <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" autoComplete="off"/>  
            <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} margin="normal"/>  
            <FormControlLabel control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />} label="Show Password" sx={{ mt: 1, mb: 2 }}/>  
            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: "#7B2CBF", "&:hover": { backgroundColor: "#5a1d8e" }, mt: 1 }}>Sign In</Button>  
          </form>  
        </Grid>  
      </Grid> 
      <Toaster open={open} setOpen={setOpen} />  
    </Box>  
  );  
};  

export default LoginForm;
