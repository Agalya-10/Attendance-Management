// src/Components/Attendance.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Alert, useMediaQuery, useTheme } from "@mui/material";
import { EMPLOYEES, DEFAULT_TIMER, OFFICE_LOCATION, ALLOWED_RADIUS } from "../Shared/Constant";
import { calculateDistance, formatTime } from "../Shared/Utils";
import SummaryHeader from "../Shared/SummaryHeader";
import EmployeeViews from "../Shared/EmployeeViews";
const AttendancePage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [attendance, setAttendance] = useState(() => {
    const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];
    return EMPLOYEES.map(emp => {
      const existingRecord = storedAttendance.find(record => record.id === emp.id);
      return existingRecord || { 
        ...emp, 
        status: "", 
        timer: { 
          ...DEFAULT_TIMER,
          displayTime: formatTime(0)
        } 
      };
    });
  });
  const [locationState, setLocationState] = useState({
    withinRadius: false,
    accuracy: null,
    distance: null,
    error: null
  });
  const [manualOverride, setManualOverride] = useState(false);
  useEffect(() => {
    let watchId;
    let retryCount = 0;
    const maxRetries = 3;
    const handleSuccess = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const distance = calculateDistance(
        latitude,
        longitude,
        OFFICE_LOCATION.lat,
        OFFICE_LOCATION.lng
      );
      setLocationState({
        withinRadius: distance <= (ALLOWED_RADIUS + accuracy),
        accuracy,
        distance,
        error: null
      });
      retryCount = 0;
    };
    const handleError = (error) => {
      console.error("Location error:", error);
      retryCount++;
      
      if (retryCount <= maxRetries) {
        setTimeout(() => {
          watchId = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
          );
        }, 2000);
      } else {
        setLocationState(prev => ({
          ...prev,
          error: "Location access unavailable. Using manual mode."
        }));
      }
    };
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      setLocationState(prev => ({
        ...prev,
        error: "Geolocation not supported by your browser"
      }));
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance(prev => prev.map(emp => {
        if (emp.timer?.isRunning && emp.timer?.startTime) {
          const now = Date.now();
          const elapsed = now - emp.timer.startTime + (emp.timer.lastSavedTime || 0);
          return {
            ...emp,
            timer: {
              ...emp.timer,
              elapsedTime: elapsed,
              displayTime: formatTime(elapsed)
            }
          };
        }
        return emp;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (index, status) => {
    setAttendance(prev => {
      const updated = [...prev];
      updated[index].status = status;
      if (status !== "Present") {
        updated[index].timer = { 
          ...DEFAULT_TIMER,
          displayTime: formatTime(0)
        };
      }
      return updated;
    });
  };
  const handleTimerAction = (index) => {
    setAttendance(prev => {
      const updated = [...prev];
      const now = Date.now();
      const emp = updated[index];
      
      // Initialize timer if not exists
      if (!emp.timer) {
        emp.timer = { ...DEFAULT_TIMER };
      }
  
      if (emp.timer.isRunning) {
        // Stop the timer
        const elapsed = (emp.timer.elapsedTime || 0) + (now - (emp.timer.startTime || now));
        emp.timer = {
          ...emp.timer,
          isRunning: false,
          elapsedTime: elapsed,
          displayTime: formatTime(elapsed),
          lastSavedTime: elapsed,
          startTime: null
        };
      } else {
        // Start the timer
        emp.timer = {
          ...emp.timer,
          isRunning: true,
          startTime: now,
          elapsedTime: emp.timer.elapsedTime || 0,
          displayTime: formatTime(emp.timer.elapsedTime || 0)
        };
      }
      
      return updated;
    });
  };

 
  const saveAndNavigate = () => {
    const attendanceWithLocation = attendance.map(emp => ({
      ...emp,
      locationStatus: locationState.withinRadius || manualOverride,
      locationData: {
        distance: locationState.distance,
        accuracy: locationState.accuracy,
        timestamp: new Date().toISOString()
      }
    }));
    
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendanceWithLocation));
    navigate("/attendancereport");
  };
  const isLocationValid = locationState.withinRadius || manualOverride;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary" fontFamily="Georgia, serif" mb={3}>
        Mark Attendance - {today}
      </Typography>
      {locationState.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {locationState.error}
        </Alert>
      )}
      <Typography align="center" mb={2}>
        Location Status: {isLocationValid ? (
          <span style={{ color: 'green' }}>Inside Office</span>
        ) : (
          <span style={{ color: 'red' }}>
            Outside Office ({locationState.distance ? `${Math.round(locationState.distance)}m away` : 'unknown distance'})
          </span>
        )}
      </Typography>
      {!locationState.withinRadius && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => setManualOverride(!manualOverride)}
          sx={{ mb: 2, display: 'block', mx: 'auto' }}
        >
          {manualOverride ? 'Cancel Manual Override' : 'I am at Office (Override)'}
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
          onTimerAction={handleTimerAction}
        />
      ) : (
        <EmployeeViews.Desktop
          attendance={attendance}
          withinRadius={isLocationValid}
          onStatusChange={handleStatusChange}
          onTimerAction={handleTimerAction}
        />
      )}
    </Container>
  );
};

export default AttendancePage;