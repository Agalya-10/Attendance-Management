import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import SideNav from "./Navbar/Sidenav";
import AttendanceManagement from './Components/Attendance';
import Login from './Components/Login';
import EmployeeTable from './Components/EmployeeTable';
import Leaves from './Components/Leaves';
import Dashboard from './Components/Dashboard';
import SettingsPage from './Components/SettingPage';

function App() {
  return (
    <Router>
       <SideNav>
      <Routes>
      <Route path="/" element={<LoginForm/>} /> 
        <Route path="/sidenav" element={<SideNav/>}/>
        <Route path="/attendance" element={<AttendanceManagement/>}/>
        <Route path="/login" element={<LoginForm/>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/employeetable" element={<EmployeeTable/>} /> 
        <Route path="/dashboard" element={<Dashboard/>} /> 
        <Route path="/leaves" element={<Leaves/>} /> 
        <Route path="/settings" element={<SettingsPage/>} /> 
      </Routes>
      </SideNav>
    </Router>
  );
}
export default App;
