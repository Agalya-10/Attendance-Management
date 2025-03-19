import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './Components/EmployeeTable'; 
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/etable" element={<EmployeeTable/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
