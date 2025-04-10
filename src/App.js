import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Leaves from "./Components/Leaves";
import AttendanceTable from "./Components/Attendance";
import ContactPage from "./Components/ContactPage";
import EmployeeTable from "./Components/EmployeeTable";
import Login from "./Components/Login";
import SideNav from "./Navbar/Sidenav";
import AttendanceReport from "./Components/AttendanceReport";
import LeaveReport from "./Components/LeaveReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <SideNav>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employeetable" element={<EmployeeTable />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/attendance" element={<AttendanceTable/>} />
                <Route path="/attendancereport" element={<AttendanceReport/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/leavereport" element={<LeaveReport/>} />
              </Routes>
            </SideNav>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
