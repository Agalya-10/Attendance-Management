import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './Components/EmployeeTable'; 
import LoginForm from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginForm/>} /> 
        <Route path="/etable" element={<EmployeeTable/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
