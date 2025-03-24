import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import SideNav from "./Navbar/Sidenav";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} />  
        <Route path="/dashboard" element={<SideNav/>}/>
      </Routes>
    </Router>
  );
}
export default App;
