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
      return existingRecord || { ...emp, status: "", timer: { ...DEFAULT_TIMER } };
    });
  });

  const [locationState, setLocationState] = useState({
    withinRadius: false,
    accuracy: null,
    distance: null,
    error: null,
  });

  const [manualOverride, setManualOverride] = useState(false);

  const handleTimerAction = (index, action) => {
    setAttendance((prev) => {
      const updated = [...prev];
      const now = Date.now();
      const empTimer = updated[index].timer || { ...DEFAULT_TIMER };

      switch (action) {
        case "start":
          updated[index].timer = {
            ...empTimer,
            isRunning: true,
            startTime: now,
            lastSavedTime: empTimer.elapsedTime || 0,
          };
          console.log(`▶Timer Started for Employee ${index + 1}:`, updated[index].timer);
          break;
        case "pause":
          updated[index].timer = {
            ...empTimer,
            isRunning: false,
            elapsedTime: (empTimer.elapsedTime || 0) + (now - (empTimer.startTime || now)),
          };
          console.log(`⏹ Timer Stopped for Employee ${index + 1}:`, updated[index].timer);
          break;
        case "reset":
          updated[index].timer = { ...DEFAULT_TIMER };
          console.log(`🔄 Timer Reset for Employee ${index + 1}`);
          break;
        default:
          break;
      }
      return updated;
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance((prev) =>
        prev.map((emp, index) => {
          if (emp.timer?.isRunning && emp.timer?.startTime) {
            const now = Date.now();
            const elapsed = now - emp.timer.startTime + (emp.timer.elapsedTime || 0);
            return {
              ...emp,
              timer: {
                ...emp.timer,
                elapsedTime: elapsed,
                displayTime: formatTime(elapsed),
              },
            };
          }
          return emp;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (index, status) => {
    setAttendance((prev) => {
      const updated = [...prev];
      updated[index].status = status;
      if (status !== "Present") {
        updated[index].timer = { ...DEFAULT_TIMER };
      }
      return updated;
    });
  };

  const saveAndNavigate = () => {
    const attendanceWithLocation = attendance.map((emp) => ({
      ...emp,
      locationStatus: locationState.withinRadius || manualOverride,
      locationData: {
        distance: locationState.distance,
        accuracy: locationState.accuracy,
        timestamp: new Date().toISOString(),
      },
    }));

    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendanceWithLocation));
    navigate("/attendancereport");
  };

  const isLocationValid = locationState.withinRadius || manualOverride;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        color="primary"
        fontFamily="Georgia, serif"
        mb={3}
      >
        Mark Attendance - {today}
      </Typography>

      {locationState.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {locationState.error}
        </Alert>
      )}

      <Typography align="center" mb={2}>
        Location Status:{" "}
        {isLocationValid ? (
          <span style={{ color: "green" }}>Inside Office</span>
        ) : (
          <span style={{ color: "red" }}>
            Outside Office ({locationState.distance ? `${Math.round(locationState.distance)}m away` : "unknown distance"})
          </span>
        )}
      </Typography>

      {!locationState.withinRadius && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setManualOverride(!manualOverride)}
          sx={{ mb: 2, display: "block", mx: "auto" }}
        >
          {manualOverride ? "Cancel Manual Override" : "I am at Office (Override)"}
        </Button>
      )}

      <SummaryHeader
        attendance={attendance}
        withinRadius={isLocationValid}
        isMobile={isMobile}
        onSave={saveAndNavigate}
      />

      {isMobile ? (
        <EmployeeViews.Mobile
          attendance={attendance}
          withinRadius={isLocationValid}
          onStatusChange={handleStatusChange}
          onTimerAction={(index) =>
            handleTimerAction(index, attendance[index].timer?.isRunning ? "pause" : "start")
          }
        />
      ) : (
        <EmployeeViews.Desktop
          attendance={attendance}
          withinRadius={isLocationValid}
          onStatusChange={handleStatusChange}
          onTimerAction={(index) =>
            handleTimerAction(index, attendance[index].timer?.isRunning ? "pause" : "start")
          }
        />
      )}
    </Container>
  );
};

export default AttendancePage;
