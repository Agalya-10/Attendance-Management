import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './Components/EmployeeTable'; 
import LoginForm from './Components/Login';
import Attendance from "./Components/Attendance";
import Settings from "./Components/Settings";
import Leaves from "./Shared/Leaves";
import Dashboard from "./Shared/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} /> 
        <Route path="/etable" element={<EmployeeTable/>} /> 
        <Route path="/timer" element={<Attendance/>} /> 
        <Route path="/settings" element={<Settings/>} /> 
        <Route path="/dashboard" element={<Dashboard/>} /> 
        <Route path="/leaves" element={<Leaves/>} /> 
      </Routes>
    </Router>
  );
}
export default App;