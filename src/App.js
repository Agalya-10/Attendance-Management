import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import SideNav from "./Navbar/Sidenav";
import AttendanceManagement from './Components/Attendance';
import Attendance from "./Components/Attendance";
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} />  
        <Route path="/dashboard" element={<SideNav/>}/>
        <Route path="/attendance" element={<AttendanceManagement/>}/>
        <Route path="/login" element={<LoginForm/>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/etable" element={<EmployeeTable/>} /> 
        <Route path="/timer" element={<Attendance/>} /> 
      </Routes>
    </Router>
  );
}
export default App;
