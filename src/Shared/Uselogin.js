import { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { VALID_PASSWORD, TOASTER_MESSAGES, ROUTES } from '../Shared/Constant';  
const useLogin = () => {  
  const [formData, setFormData] = useState({ username: '', password: '' });  
  const [open, setOpen] = useState({ status: false, message: '', type: '' });  
  const [showPassword, setShowPassword] = useState(false);  
  const navigate = useNavigate();  
  const handleChange = ({ target: { name, value } }) =>  
    setFormData((prev) => ({ ...prev, [name]: value }));  
  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (!formData.username || !formData.password) {  
      return showToast('Please fill all the fields', 'error');  
    }  
    if (formData.password === VALID_PASSWORD) {  
      localStorage.setItem('user', JSON.stringify(formData));  
      showToast(TOASTER_MESSAGES.success, 'success');  
      setFormData({ username: '', password: '' });  
      setTimeout(() => navigate(ROUTES.successPage), 1000);  
    } else {  
      showToast(TOASTER_MESSAGES.error, 'error');  
    }  
  };  
  const showToast = (message, type) =>  
    setOpen({ status: true, message, type });  
  return {formData,open,setOpen,showPassword,setShowPassword,handleChange,handleSubmit };  
};  
export default useLogin;