import React from 'react';  
import { Snackbar, Alert } from '@mui/material';  

const Toaster = ({ open, setOpen }) => {  
  const handleClose = () => {  
    setOpen({ status: false, message: '', type: '' });  
  };  

  return (  
    <Snackbar open={open.status}autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>  
      <Alert onClose={handleClose} severity={open.type} sx={{ width: '100%', backgroundColor: open.type === 'success' ? 'green' : 'red', color: 'white' }}  >  
        {open.message}  
      </Alert>  
    </Snackbar>  
  );  
};  
export default Toaster;

