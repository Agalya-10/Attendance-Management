import React, { useState, useEffect } from "react";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";

export const NAMES = ([
  { id: 1, name: "Bavya", dob: "2003-05-12", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", dob: "2002-11-14",department: "Backend Developer" },
  { id: 3, name: "Rajapriya", dob: "2002-12-14", department: "Frontend Developer" },
  { id: 4, name: "Keerthana", dob: "2002-04-06", department: "Frontend Developer" },
  { id: 5, name: "Prakash", dob: "2000-07-06", department: "Frontend Developer" },
  { id: 6, name: "Tamilselvan", dob: "1995-06-15", department: "Backend Developer" },
  { id: 7, name: "Vanmathi", dob: "2000-08-13", department: "Backend Developer" },
  { id: 8, name: "Vinothini", dob: "2002-12-18", department: "Frontend Developer" },
  { id: 9, name: "Venkat Rentala", dob: "1995-06-15", department: "Frontend Developer" },
  { id: 10, name: "Agalya", dob: "2004-05-10", department: "Frontend Developer" },
  { id: 11, name: "Amsavarthani", dob: "2003-08-18", department: "Backend Developer" },
  { id: 12, name: "Priya", dob: "2003-11-26", department: "Frontend Developer" },
  { id: 13, name: "Pavithra", dob: "2003-09-26", department: "Frontend Developer" },
  { id: 14, name: "Gowthamraj", dob: "2001-06-20", department: "Backend Developer" },
  { id: 15, name: "Minar Vengat", dob: "2005-01-17", department: "Frontend Developer" },
  { id: 16, name: "Kanimozhi", dob: "2003-07-21", department: "Frontend Developer" },
  { id: 17, name: "Parthiban", dob: "2003-01-29", department: "Frontend Developer" },
  { id: 18, name: "Tamil nila", dob: "1996-06-05", department: "Backend Developer" },
  { id: 19, name: "Dhayanithi", dob: "1995-06-15", department: "Backend Developer" },
]);

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  
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
//   useEffect(() => {
//     let interval;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setElapsedTime((prev) => prev + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning]);
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
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const handleAttendanceChange = (id, value) => {
    setAttendance(prev => prev.map(user => user.id === id ? { ...user, action: value } : user));
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Attendance</h2>
      <p>Mark Attendance for 2025-01-24</p>
      <TextField
        label="Search By Employee ID"
        variant="outlined"
        size="small"
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button variant="contained" color="success" style={{ float: "right" }}>
        Attendance Report
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Emp Id</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance
              .filter((row) => row.empId.includes(search))
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.empId}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    <Select
                      value={row.action}
                      onChange={(e) => handleAttendanceChange(row.id, e.target.value)}
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
    </div>
//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const data = [
//     { name: "Elapsed", value: elapsedTime },
//     { name: "Remaining", value: 3600 - elapsedTime },
//   ];
//   const COLORS = ["#0088FE", "#00C49F"];
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

//   return (
//     <Container maxWidth={false} sx={{ padding: 0, overflow: "hidden" }}>
//       <AppBar position="fixed" sx={{ backgroundColor: "#1A237E", width: "100%" }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>Vinothini | Frontend Developer</Typography>
//           <Typography>{currentTime.toLocaleTimeString()}</Typography>
//         </Toolbar>
//       </AppBar>
//       <Grid container spacing={3} mt={10} justifyContent="center">
//         <Grid item xs={12} textAlign="center">
//           <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#E3F2FD", width: "100%" }}>
//             <Box display="flex" alignItems="center" justifyContent="center" width="100%" mb={2}>
//               <TextField
//                 type="date"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 sx={{ width: "200px", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
//               />
//             </Box>

//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "#1E88E5", color: "white", fontWeight: "bold", marginTop: 2 }}
//               onClick={isRunning ? handleEnd : handleStart}>
//               {isRunning ? "End" : "Start"}
//             </Button>
//           </Paper>
//         </Grid>

//         {isRunning && (
//           <Grid item xs={12} textAlign="center">
//             <Box sx={{ position: "relative", display: "inline-block" }}>
//               <PieChart width={250} height={250}>
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   fill="#8884d8"
//                   dataKey="value"
//                   startAngle={90}
//                   endAngle={-270}
//                   animationDuration={500}
//                 >
//                   {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//               <Typography
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   fontSize: "24px",
//                   fontWeight: "bold",
//                   color: "#1A237E",
//                 }}
//               >
//                 {String(Math.floor(elapsedTime / 60)).padStart(2, "0")}:
//                 {String(elapsedTime % 60).padStart(2, "0")}
//               </Typography>
//             </Box>
//           </Grid>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default Attendance;

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
            background: isRunning ? "linear-gradient(45deg, #D32F2F, #FF5252)" : "linear-gradient(45deg, #2E7D32, #66BB6A)",
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
