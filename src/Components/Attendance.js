import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // For date handling

const employees = [
  { id: 1, name: "Bavya", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", department: "Backend Developer" },
  { id: 3, name: "Rajapriya", department: "Frontend Developer" },
  { id: 4, name: "Keerthana", department: "Frontend Developer" },
  { id: 5, name: "Prakash", department: "Frontend Developer" },
  { id: 6, name: "Tamilselvan", department: "Backend Developer" },
  { id: 7, name: "Vanmathi", department: "Backend Developer" },
  { id: 8, name: "Vinothini", department: "Frontend Developer" },
  { id: 9, name: "Venkat Rentala", department: "Frontend Developer" },
  { id: 10, name: "Agalya", department: "Frontend Developer" },
  { id: 11, name: "Amsavarthani", department: "Backend Developer" },
  { id: 12, name: "Priya", department: "Frontend Developer" },
  { id: 13, name: "Pavithra", department: "Frontend Developer" },
  { id: 14, name: "Gowthamraj", department: "Backend Developer" },
  { id: 15, name: "Minar Vengat", department: "Frontend Developer" },
  { id: 16, name: "Kanimozhi", department: "Frontend Developer" },
  { id: 17, name: "Parthiban", department: "Frontend Developer" },
  { id: 18, name: "Tamil Nila", department: "Backend Developer" },
  { id: 19, name: "Dhayanithi", department: "Backend Developer" },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(3),
  borderRadius: 10,
}));

const AttendanceTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); // Default: Today

  // Load saved attendance data from local storage for selected date
  const getSavedData = () => {
    const savedData = JSON.parse(localStorage.getItem(`attendance_${selectedDate}`)) || employees.map(emp => ({ ...emp, status: "present" }));
    return savedData;
  };

  const [data, setData] = useState(getSavedData());
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance")) || NAMES.map((user, index) => ({
      id: user.id,
      name: user.name,
      empId: `EMP${user.id}`,
      department: user.department,
      action: "present"
    }));
    setAttendance(storedData);
  }, []);
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Menu, MenuItem, Box, IconButton, Button, TextField } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Role");

  useEffect(() => {
    localStorage.setItem(`attendance_${selectedDate}`, JSON.stringify(data));
  }, [data, selectedDate]);

  const handleStatusChange = (id, newStatus) => {
    setData(data.map(emp => (emp.id === id ? { ...emp, status: newStatus } : emp)));
  };

  const filteredData = data.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <StyledContainer maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          type="date"
          label="Select Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setData(getSavedData()); // Load attendance for the new date
          }}
        />

        <Box textAlign="center" flexGrow={1}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Manage Attendance
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mark Attendance for <b>{selectedDate}</b>
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#8763CD", color: "white", textTransform: "none" }}
          onClick={() => navigate("/attendancereport")}
        >
          Attendance Report
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#8763CD" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S No</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((emp, index) => (
              <TableRow key={emp.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Select
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="present">Present</MenuItem>
                    <MenuItem value="absent">Absent</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
    </div>
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= 28800) { // Max 8 hours (28800 sec)
            clearInterval(interval);
            return 28800;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (selectedRole === "Role") {
      toast.error("Please select a role before starting!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setShowChart(true);
    setIsRunning(true);
  };

  const handleEnd = () => {
    setIsRunning(false);
  };


import React from "react";

const Attendance = () => {
  return <h2>Attendance Page</h2>;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (role) => {
    if (role) {
      setSelectedRole(role);
    }
    setAnchorEl(null);
  };

  const data = [
    { name: "Elapsed", value: elapsedTime },
    { name: "Remaining", value: 28800 - elapsedTime },
  ];
  const COLORS = ["#FF6F61", "#90CAF9"];

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)", overflow: "hidden" }}>
      <AppBar position="fixed" sx={{ background: "linear-gradient(135deg, #283593, #1E88E5)", width: "100%", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
              Vinothini
            </Typography>
            <Typography variant="h6" sx={{ color: "#FFC107", fontWeight: "bold" }}>
              |
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF" }}>
                {selectedRole}
              </Typography>
              <IconButton size="small" sx={{ color: "#FFF", padding: 0 }}>
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
              <MenuItem onClick={() => handleClose("Frontend Developer")}>Frontend Developer</MenuItem>
              <MenuItem onClick={() => handleClose("Backend Developer")}>Backend Developer</MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6">{currentTime.toLocaleTimeString()}</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: "absolute", top: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TextField
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            width: "250px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
            "& .MuiInputBase-input": {
              fontSize: "18px",
              textAlign: "center",
              padding: "12px",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
             default Attendance;background: isRunning ? "linear-gradient(45deg, #D32F2F, #FF5252)" : "linear-gradient(45deg, #2E7D32, #66BB6A)",
            color: "white",
            fontWeight: "bold",
            padding: "14px 40px",
            fontSize: "18px",
            borderRadius: "30px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.07)",
              boxShadow: "0px 6px 15px rgba(0,0,0,0.4)",
            },
          }}
          onClick={isRunning ? handleEnd : handleStart}
        >
          {isRunning ? "End" : "Start"}
        </Button>
      </Box>

      {showChart && (
        <Box sx={{ position: "absolute", bottom: "100px" }}>
          <ResponsiveContainer width={350} height={350}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value" startAngle={90} endAngle={-270}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1A237E",
              textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            {String(Math.floor(elapsedTime / 3600)).padStart(2, "0")}:
            {String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0")}:
            {String(elapsedTime % 60).padStart(2, "0")}
          </Typography>
        </Box>
      )}

      <ToastContainer />
    </Box>
  );
};

export default AttendanceTable;
