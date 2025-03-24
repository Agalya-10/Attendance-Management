import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './Components/EmployeeTable'; 
import LoginForm from './Components/Login';
import Attendance from "./Components/Attendance";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} /> 
        <Route path="/etable" element={<EmployeeTable/>} /> 
        <Route path="/timer" element={<Attendance/>} /> 
      </Routes>
    </Router>
  );
}
export default App;