import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const TARGET_LAT = 10.633381821557283;
const TARGET_LNG = 79.24839941317336;
const DISTANCE_THRESHOLD = 200;
const drawerWidth = 240;

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const UserDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && elapsedTime < 8 * 60 * 60) {
      interval = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, elapsedTime]);

  const handleStart = () => {
    if (!navigator.geolocation) {
      showToast("❌ Geolocation not supported in this browser.", "error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistanceFromLatLonInMeters(
          latitude,
          longitude,
          TARGET_LAT,
          TARGET_LNG
        );

        console.log("📍 Your Location:", latitude, longitude);
        console.log("🎯 Target:", TARGET_LAT, TARGET_LNG);
        console.log("📏 Distance:", distance, "meters");

        if (distance <= DISTANCE_THRESHOLD) {
          showToast("✅ You're within the target location!", "success");
          setShowChart(true);
          setIsRunning(true);
        } else {
          showToast("❌ You're outside the target location.", "error");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        showToast("⚠️ Location access denied or unavailable.", "warning");
      }
    );
  };

  const handleEnd = () => {
    setIsRunning(false);
  };

  const data = [
    { name: "Progress", value: elapsedTime },
    { name: "Remaining", value: 8 * 60 * 60 - elapsedTime },
  ];

  const COLORS = ["#3F51B5", "#C5CAE9"];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          background: "linear-gradient(135deg, #283593, #1E88E5)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Ebrain | User Dashboard
          </Typography>
          <Typography variant="h6">
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Date Picker */}
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{
            width: 250,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            "& .MuiInputBase-input": {
              fontSize: 16,
              textAlign: "center",
              padding: "15px",
            },
          }}
        />

        {/* Start/End Button */}
        <Button
          variant="contained"
          onClick={isRunning ? handleEnd : handleStart}
          sx={{
            background: isRunning
              ? "linear-gradient(45deg, #D32F2F, #FF5252)"
              : "linear-gradient(45deg, #2E7D32, #66BB6A)",
            color: "white",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            fontSize: "16px",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {isRunning ? "End" : "Start"}
        </Button>

        {/* Pie Chart */}
        {showChart && (
          <Box sx={{ position: "relative", width: 300, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Time Text */}
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: "bold",
                color: "black",
                textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {String(Math.floor(elapsedTime / 3600)).padStart(2, "0")}:
              {String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0")}:
              {String(elapsedTime % 60).padStart(2, "0")}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Toast Snackbar */}
      <Snackbar
  open={toast.open}
  autoHideDuration={4000}
  onClose={() => setToast({ ...toast, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{
    mt: "50px",
    ml: "117px" // Push it below the AppBar
  }}
>
  <Alert
    onClose={() => setToast({ ...toast, open: false })}
    severity={toast.severity}
    sx={{ width: "100%" }}
    variant="filled"
  >
    {toast.message}
  </Alert>
</Snackbar>

    </Box>
  );
};

export default UserDashboard;
