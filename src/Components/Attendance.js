import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Paper, TextField } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTime } from "../Shared/CurrentTime";
import TimerIcon from "@mui/icons-material/Timer";

const officeLocation = { lat: 10.7867, lon: 79.1378 }; // eBrain Technologies Location

const Attendance = () => {
  const currentTime = useTime();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);

      // Location Check Every 5 Seconds
      const locationCheck = setInterval(checkUserDistance, 5000);
      return () => {
        clearInterval(interval);
        clearInterval(locationCheck);
      };
    } else {
      clearInterval(interval);
    }
  }, [isRunning]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const toRad = (deg) => (deg * Math.PI) / 180;
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const checkUserDistance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let userLat = position.coords.latitude;
          let userLon = position.coords.longitude;
          let dist = getDistance(userLat, userLon, officeLocation.lat, officeLocation.lon);
          setDistance(dist);

          if (dist > 200) {
            alert("You moved out of the 200m range! Timer stopped.");
            setIsRunning(false);
          }
        },
        () => {
          alert("Location access denied!");
        }
      );
    }
  };

  const handleStart = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let userLat = position.coords.latitude;
          let userLon = position.coords.longitude;
          let dist = getDistance(userLat, userLon, officeLocation.lat, officeLocation.lon);
          setDistance(dist);

          if (dist <= 200) {
            setStartTime(new Date());
            setIsRunning(true);
          } else {
            alert("You are outside the 200-meter range!");
          }
        },
        () => {
          alert("Location access denied!");
        }
      );
    }
  };

  const handleEnd = () => {
    setIsRunning(false);
    setEndTime(new Date());
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const data = [
    { name: "Elapsed", value: elapsedTime },
    { name: "Remaining", value: 3600 - elapsedTime },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#7b2cbf" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Agalya Muruganantham | Frontend Developer</Typography>
          <Typography> <TimerIcon /> {currentTime.toLocaleTimeString()}</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} mt={10} justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#E3F2FD", width: "100%" }}>
            <Box display="flex" alignItems="center" justifyContent="center" width="100%" mb={2}>
              <TextField
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ width: "200px", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#1E88E5", color: "white", fontWeight: "bold", marginTop: 2 }}
              onClick={isRunning ? handleEnd : handleStart}>
              {isRunning ? "End" : "Start"}
            </Button>
            <Typography mt={2} color="error">
              {distance !== null ? `You are ${Math.round(distance)} meters away.` : ""}
            </Typography>
          </Paper>
        </Grid>

        {isRunning && (
          <Grid item xs={12} textAlign="center">
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <PieChart width={250} height={250}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  animationDuration={500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1A237E",
                }}
              >
                {String(Math.floor(elapsedTime / 60)).padStart(2, "0")}:
                {String(elapsedTime % 60).padStart(2, "0")}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Attendance;
