import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Alert, useMediaQuery, useTheme } from "@mui/material";
import { EMPLOYEES, DEFAULT_TIMER, OFFICE_LOCATION, ALLOWED_RADIUS } from "../Shared/Constant";
import { calculateDistance } from "../Shared/Utils";
import SummaryHeader from "../Shared/SummaryHeader";
import EmployeeViews from "../Shared/EmployeeViews";

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const AttendancePage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [attendance, setAttendance] = useState(() => {
    const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];
    return EMPLOYEES.map((emp) => {
      const existingRecord = storedAttendance.find((record) => record.id === emp.id);
      return existingRecord || { ...emp, status: "", timer: { ...DEFAULT_TIMER, displayTime: formatTime(0) } };
    });
  });

  const [locationState, setLocationState] = useState({
    withinRadius: false,
    accuracy: null,
    distance: null,
    error: null,
  });
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    let watchId;
    const handleSuccess = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const distance = calculateDistance(latitude, longitude, OFFICE_LOCATION.lat, OFFICE_LOCATION.lng);
      setLocationState({
        withinRadius: distance <= (ALLOWED_RADIUS + accuracy),
        accuracy,
        distance,
        error: null,
      });
    };

    const handleError = () => {
      setLocationState((prev) => ({ ...prev, error: "Location access unavailable. Using manual mode." }));
    };

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      });
    } else {
      setLocationState((prev) => ({ ...prev, error: "Geolocation not supported by your browser" }));
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance((prev) =>
        prev.map((emp) => {
          if (emp.timer?.isRunning && emp.timer?.startTime) {
            const now = Date.now();
            const elapsed = now - emp.timer.startTime + (emp.timer.lastSavedTime || 0);
            return { ...emp, timer: { ...emp.timer, elapsedTime: elapsed, displayTime: formatTime(elapsed) } };
          }
          return emp;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimerAction = (index, action) => {
    setAttendance((prev) => {
      const updated = [...prev];
      const now = Date.now();
      const empTimer = updated[index].timer || { ...DEFAULT_TIMER };

      switch (action) {
        case "start":
          updated[index].timer = { ...empTimer, isRunning: true, startTime: now, lastSavedTime: empTimer.elapsedTime || 0 };
          break;
        case "pause":
          updated[index].timer = { ...empTimer, isRunning: false, elapsedTime: (empTimer.elapsedTime || 0) + (now - (empTimer.startTime || now)) };
          break;
        case "reset":
          updated[index].timer = { ...DEFAULT_TIMER, displayTime: formatTime(0) };
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const handleStatusChange = (index, status) => {
    setAttendance((prev) => {
      const updated = [...prev];
      updated[index].status = status;
      if (status !== "Present") {
        updated[index].timer = { ...DEFAULT_TIMER, displayTime: formatTime(0) };
      }
      return updated;
    });
  };

  const saveAndNavigate = () => {
    const attendanceWithLocation = attendance.map((emp) => ({
      ...emp,
      locationStatus: locationState.withinRadius || manualOverride,
      locationData: { distance: locationState.distance, accuracy: locationState.accuracy, timestamp: new Date().toISOString() },
    }));
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendanceWithLocation));
    navigate("/attendancereport");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary" fontFamily="Georgia, serif" mb={3}>
        Mark Attendance - {today}
      </Typography>
      {locationState.error && <Alert severity="error" sx={{ mb: 2 }}>{locationState.error}</Alert>}
      <SummaryHeader attendance={attendance} withinRadius={locationState.withinRadius || manualOverride} isMobile={isMobile} onSave={saveAndNavigate} />
      {isMobile ? (
        <EmployeeViews.Mobile attendance={attendance} withinRadius={locationState.withinRadius || manualOverride} onStatusChange={handleStatusChange} onTimerAction={handleTimerAction} />
      ) : (
        <EmployeeViews.Desktop attendance={attendance} withinRadius={locationState.withinRadius || manualOverride} onStatusChange={handleStatusChange} onTimerAction={handleTimerAction} />
      )}
    </Container>
  );
};

export default AttendancePage;
