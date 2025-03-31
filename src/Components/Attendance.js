import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, useMediaQuery, useTheme} from "@mui/material";
import {EMPLOYEES, DEFAULT_TIMER,OFFICE_LOCATION, ALLOWED_RADIUS } from "../Shared/Constant";
import { calculateDistance} from "../Shared/Utils";
import SummaryHeader from "../Shared/SummaryHeader";
import EmployeeViews from "../Shared/EmployeeViews";

const AttendancePage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; 
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];
  const [withinRadius, setWithinRadius] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const mergedAttendance = EMPLOYEES.map((emp) => {
    const existingRecord = storedAttendance.find((record) => record.id === emp.id);
    return existingRecord || { ...emp, status: "", timer: { ...DEFAULT_TIMER } };
  });
  const [attendance, setAttendance] = useState(mergedAttendance);
  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            OFFICE_LOCATION.lat,
            OFFICE_LOCATION.lng
          );
          setWithinRadius(distance <= ALLOWED_RADIUS);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance(prev => prev.map(emp => {
        if (emp.timer?.isRunning && emp.timer?.startTime) {
          const now = new Date().getTime();
          const elapsed = now - emp.timer.startTime + (emp.timer.elapsedTime || 0);
          return { ...emp, timer: { ...emp.timer, elapsedTime: elapsed } };
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
      if (status !== "Present" && updated[index].timer) {
        updated[index].timer = { ...DEFAULT_TIMER };
      }
      return updated;
    });
  };
  const handleTimerAction = (index) => {
    setAttendance(prev => {
      const updated = [...prev];
      const now = new Date().getTime();
      const empTimer = updated[index].timer || { ...DEFAULT_TIMER };
      
      updated[index].timer = {
        ...empTimer,
        isRunning: !empTimer.isRunning,
        startTime: empTimer.isRunning ? null : now,
        lastSavedTime: empTimer.elapsedTime || 0
      };
      return updated;
    });
  };
  const saveAndNavigate = () => {
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendance));
    navigate("/attendancereport");
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" color="primary" fontFamily="Georgia, serif" mb={3}>Mark Attendance - {today}</Typography>
        <SummaryHeader attendance={attendance}  withinRadius={withinRadius}  isMobile={isMobile}  onSave={saveAndNavigate} />
    {isMobile ? (<EmployeeViews.Mobile  attendance={attendance} withinRadius={withinRadius} onStatusChange={handleStatusChange} onTimerAction={handleTimerAction}/>
    ) : (<EmployeeViews.Desktop  attendance={attendance} withinRadius={withinRadius} onStatusChange={handleStatusChange} onTimerAction={handleTimerAction}/>)} 
      </Container>
    </>
  );
};
export default AttendancePage;