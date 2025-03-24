// import React, { useState, useEffect } from "react";
// import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper, IconButton, TextField } from "@mui/material";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// const Attendance = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(60); // Starts at 01:00
//   const [isRunning, setIsRunning] = useState(false);
//   const [weekStart, setWeekStart] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Calendar Input

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

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


//   const handleStart = () => {
//     setStartTime(new Date());
//     setIsRunning(true);
//   };

//   const handleEnd = () => {
//     setIsRunning(false);
//     setEndTime(new Date());
//   };

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

export default Attendance;
