import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import SettingPage from "./Components/SettingPage";
import Leaves from "./Shared/Leaves";
import Dashboard from "./Shared/Dashboard";
import EmployeeTable from './Components/EmployeeTable';
import AttendanceTable from './Components/Attendance';
import AttendanceReport from './Components/Attendance Report';


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
      </Routes>
    </Router>
  );
}
export default App;
