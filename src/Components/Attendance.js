// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell } from "recharts";

// const Attendance = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [startTime, setStartTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setElapsedTime((prev) => prev + 1);
//       }, 60000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning]);

//   const handleStart = () => {
//     setStartTime(new Date());
//     setIsRunning(true);
//   };

//   const handleEnd = () => {
//     setIsRunning(false);
//     window.location.href = "/nextPage";
//   };

//   const data = [
//     { name: "Elapsed", value: elapsedTime },
//     { name: "Remaining", value: 1440 - elapsedTime },
//   ];
//   const COLORS = ["#0088FE", "#00C49F"];

//   return (
//     <div className="attendance-container">
//       <header className="header">
//         <div className="left">Vinothini | Frontend Developer</div>
//         <div className="right">{currentTime.toLocaleTimeString()}</div>
//       </header>
//       <div className="body">
//         <div className="calendar">
//           {[...Array(7)].map((_, i) => {
//             const date = new Date();
//             date.setDate(date.getDate() + i);
//             return (
//               <div key={i} className="day">
//                 {date.toLocaleDateString("en-GB", {
//                   weekday: "short",
//                   day: "2-digit",
//                 })}
//               </div>
//             );
//           })}
//         </div>
//         <button onClick={isRunning ? handleEnd : handleStart} className="start-btn">
//           {isRunning ? "End" : "Start"}
//         </button>
//         {isRunning && (
//           <div className="pie-chart">
//             <PieChart width={200} height={200}>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//             <p>
//               {Math.floor(elapsedTime / 60)}h {elapsedTime % 60}m
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Attendance;



import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { PieChart, Pie, Cell } from "recharts";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [weekStart, setWeekStart] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 60000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const allowedLatitude = 12.9716;
        const allowedLongitude = 77.5946;
        const R = 6371e3;
        const φ1 = (latitude * Math.PI) / 180;
        const φ2 = (allowedLatitude * Math.PI) / 180;
        const Δφ = ((allowedLatitude - latitude) * Math.PI) / 180;
        const Δλ = ((allowedLongitude - longitude) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) *
            Math.cos(φ2) *
            Math.sin(Δλ / 2) *
            Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        setLocationAllowed(distance < 200);
      },
      () => setLocationAllowed(false),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  }, []);

  const handleStart = () => {
    if (locationAllowed) {
      setStartTime(new Date());
      setIsRunning(true);
    } else {
      alert("You are not in the allowed location to start work.");
    }
  };

  const handleEnd = () => {
    setIsRunning(false);
    window.location.href = "/nextPage";
  };

  const handlePrevWeek = () => {
    setWeekStart((prev) => {
      const newStart = new Date(prev);
      newStart.setDate(newStart.getDate() - 7);
      return newStart;
    });
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => {
      const newStart = new Date(prev);
      newStart.setDate(newStart.getDate() + 7);
      return newStart;
    });
  };

  const data = [
    { name: "Elapsed", value: elapsedTime },
    { name: "Remaining", value: 1440 - elapsedTime },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <Container maxWidth={false} sx={{ padding: 0, overflow: "hidden" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1A237E", width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Vinothini | Frontend Developer
          </Typography>
          <Typography>{currentTime.toLocaleTimeString()}</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} mt={10} justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#E3F2FD", width: "100%" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={2}>
              <IconButton onClick={handlePrevWeek}>
                <ArrowBack />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  overflowX: "auto",
                  width: "80%",
                }}
              >
                {[...Array(7)].map((_, i) => {
                  const date = new Date(weekStart);
                  date.setDate(date.getDate() + i);
                  return (
                    <Box
                      key={i}
                      sx={{
                        padding: "10px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        backgroundColor: i === new Date().getDay() ? "#90CAF9" : "white",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        textAlign: "center",
                        minWidth: "80px",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {date.toLocaleDateString("en-GB", { weekday: "short" })}
                      </Typography>
                      <Typography variant="body2">{date.getDate()}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <IconButton onClick={handleNextWeek}>
                <ArrowForward />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1E88E5", color: "white", fontWeight: "bold", marginTop: 2 }}
              onClick={isRunning ? handleEnd : handleStart}
            >
              {isRunning ? "End" : "Start"}
            </Button>
          </Paper>
        </Grid>
        {isRunning && (
          <Grid item xs={12} textAlign="center">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {String(Math.floor(elapsedTime / 60)).padStart(2, "0")}:
              {String(elapsedTime % 60).padStart(2, "0")}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Attendance;
