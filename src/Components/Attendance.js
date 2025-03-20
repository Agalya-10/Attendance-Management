import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper, IconButton, TextField } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(60); // Starts at 01:00
  const [isRunning, setIsRunning] = useState(false);
  const [weekStart, setWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Calendar Input

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setStartTime(new Date());
    setIsRunning(true);
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
    <Container maxWidth={false} sx={{ padding: 0, overflow: "hidden" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1A237E", width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Vinothini | Frontend Developer</Typography>
          <Typography>{currentTime.toLocaleTimeString()}</Typography>
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
    </Container>
  );
};

export default Attendance;
