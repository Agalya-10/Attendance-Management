import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Leaves from "./Components/Leaves";
import AttendanceTable from "./Components/Attendance";
import SettingsPage from "./Components/SettingPage";
import EmployeeTable from "./Components/EmployeeTable";
import Login from "./Components/Login";
import SideNav from "./Navbar/Sidenav";
import AttendanceReport from "./Components/AttendanceReport";


function App() {
  return (
    <Router>
      <Routes>
        {/* Show Login page without SideNav */}
        <Route path="/" element={<Login />} />

        {/* Wrap all other pages inside SideNav */}
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
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </SideNav>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
