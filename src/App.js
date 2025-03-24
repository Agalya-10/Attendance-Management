import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import SideNav from "./Navbar/Sidenav";
import AttendanceManagement from './Components/Attendance';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} />  
        <Route path="/dashboard" element={<SideNav/>}/>
        <Route path="/attendance" element={<AttendanceManagement/>}/>
      </Routes>
    </Router>
  );
}
export default App;
