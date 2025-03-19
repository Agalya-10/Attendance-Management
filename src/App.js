import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './Components/EmployeeTable'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/etable" element={<EmployeeTable/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
