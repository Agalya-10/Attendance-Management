import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import SettingPage from "./Components/SettingPage";
import Leaves from "./Shared/Leaves";
import Dashboard from "./Shared/Dashboard";
import EmployeeTable from './Components/EmployeeTable';
import AttendanceTable from './Components/Attendance';
import AttendanceReport from './Components/Attendance Report';
<<<<<<< HEAD

=======
import SideNav from "./Navbar/Sidenav";
import AttendanceManagement from './Components/Attendance';
import Attendance from "./Components/Attendance";
import Login from './Components/Login';
>>>>>>> c27da36c56a037b6d9bbf2dcee278645dd17d527

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} /> 
        <Route path="/employeetable" element={<EmployeeTable/>} /> 
        <Route path="/settings" element={<SettingPage/>} /> 
        <Route path="/dashboard" element={<Dashboard/>} /> 
        <Route path="/leaves" element={<Leaves/>} /> 
        <Route path="/attendance" element={<AttendanceTable/>} /> 
        <Route path="/attendancereport" element={<AttendanceReport/>} /> 
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
