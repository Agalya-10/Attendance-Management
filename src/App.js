import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './Components/EmployeeTable'; 
import Attendance from "./Components/Attendance";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/etable" element={<EmployeeTable/>} /> 
        <Route path="/Attendance" element={<Attendance/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

