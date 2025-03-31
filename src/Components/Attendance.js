import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Tooltip
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const employees = [
  { id: 1, name: "Bavya", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", department: "Backend Developer" },
  { id: 3, name: "Rajapriya", department: "Frontend Developer" },
  { id: 4, name: "Keerthana", department: "Frontend Developer" },
  { id: 5, name: "Prakash", department: "Frontend Developer" },
  { id: 6, name: "Tamilselvan", department: "Backend Developer" },
  { id: 7, name: "Vanmathi", department: "Backend Developer" },
  { id: 8, name: "Vinothini", department: "Frontend Developer" },
  { id: 9, name: "Venkat Rentala", department: "Frontend Developer" },
  { id: 10, name: "Agalya", department: "Frontend Developer" },
  { id: 11, name: "Amsavarthani", department: "Backend Developer" },
  { id: 12, name: "Priya", department: "Frontend Developer" },
  { id: 13, name: "Pavithra", department: "Frontend Developer" },
  { id: 14, name: "Gowthamraj", department: "Backend Developer" },
  { id: 15, name: "Minar Vengat", department: "Frontend Developer" },
  { id: 16, name: "Kanimozhi", department: "Frontend Developer" },
  { id: 17, name: "Parthiban", department: "Frontend Developer" },
  { id: 18, name: "Tamil Nila", department: "Backend Developer" },
  { id: 19, name: "Dhayanithi", department: "Backend Developer" },
];

const defaultTimer = {
  isRunning: false,
  startTime: null,
  elapsedTime: 0,
  lastSavedTime: 0
};

const AttendancePage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; 
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];

  const mergedAttendance = employees.map((emp) => {
    const existingRecord = storedAttendance.find((record) => record.id === emp.id);
    return existingRecord || { ...emp, status: "", timer: { ...defaultTimer } };
  });
  
  const [attendance, setAttendance] = useState(mergedAttendance);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance(prevAttendance => prevAttendance.map(emp => {
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

  const handleChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    
    // Reset timer if status changes from Present to something else
    if (status !== "Present" && updatedAttendance[index].timer) {
      updatedAttendance[index].timer = { ...defaultTimer };
    }
    
    setAttendance(updatedAttendance);
  };

  const handleTimerAction = (index) => {
    const updatedAttendance = [...attendance];
    const now = new Date().getTime();
    const empTimer = updatedAttendance[index].timer || { ...defaultTimer };
    
    if (empTimer.isRunning) {
      // Stop timer
      updatedAttendance[index].timer = {
        isRunning: false,
        startTime: null,
        elapsedTime: empTimer.elapsedTime,
        lastSavedTime: empTimer.elapsedTime
      };
    } else {
      // Start timer
      updatedAttendance[index].timer = {
        isRunning: true,
        startTime: now,
        elapsedTime: empTimer.elapsedTime || 0,
        lastSavedTime: empTimer.elapsedTime || 0
      };
    }
    setAttendance(updatedAttendance);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const saveAttendanceAndGoToReport = () => {
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendance));
    navigate("/attendancereport");
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" color="primary" fontFamily="Georgia, serif" mb={3}>
          Mark Attendance - {today}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography fontFamily="Georgia, serif" fontWeight="bold">Present: {attendance.filter(e => e.status === "Present").length}</Typography>
            <Typography fontFamily="Georgia, serif" fontWeight="bold">Absent: {attendance.filter(e => e.status === "Absent").length}</Typography>
          </Box>
          <Button variant="contained" sx={{backgroundColor:"#EC155B",fontFamily:'Georgia, serif'}} onClick={saveAttendanceAndGoToReport}>
            Attendance Report
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#EC155B" }}>
              <TableRow>
                <TableCell sx={{ color: "white", textAlign: "center",fontFamily:'Georgia, serif',fontWeight:'bold' }}>S.No</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center",fontFamily:'Georgia, serif',fontWeight:'bold' }}>Name</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center",fontFamily:'Georgia, serif',fontWeight:'bold' }}>Department</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center",fontFamily:'Georgia, serif',fontWeight:'bold' }}>Status</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center",fontFamily:'Georgia, serif',fontWeight:'bold' }}>Time Working</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center",fontFamily:'Georgia, serif',fontWeight:'bold'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ textAlign: "center",fontFamily:'Georgia, serif' }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: "center",fontFamily:'Georgia, serif' }}>{emp.name}</TableCell>
                  <TableCell sx={{ textAlign: "center",fontFamily:'Georgia, serif' }}>{emp.department}</TableCell>
                  <TableCell sx={{ textAlign: "center",fontFamily:'Georgia, serif' }}>
                    {emp.status === "Present" ? (
                      <Typography color="green" fontWeight="bold" fontFamily="Georgia, serif">Active</Typography>
                    ) : emp.status === "Absent" ? (
                      <Typography color="error" fontWeight="bold" fontFamily="Georgia, serif">Inactive</Typography>
                    ) : (
                      <Typography color="textSecondary" fontFamily="Georgia, serif">--</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center",fontFamily:'Georgia, serif' }}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <AccessTimeIcon sx={{ mr: 1 }} />
                      {formatTime(emp.timer?.elapsedTime || 0)}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center",fontFamily:'Georgia, serif' }}>
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button 
                        variant="outlined" 
                        color="success" 
                        onClick={() => handleChange(index, "Present")}
                        size="small"
                      >
                        P
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => handleChange(index, "Absent")}
                        size="small"
                      >
                        A
                      </Button>
                      <Tooltip title={emp.status !== "Present" ? "Mark as Present to enable timer" : 
                                     emp.timer?.isRunning ? "Stop Timer" : "Start Timer"}>
                        <span>
                          <Button
                            variant="outlined"
                            color={emp.timer?.isRunning ? "error" : "primary"}
                            onClick={() => handleTimerAction(index)}
                            size="small"
                            disabled={emp.status !== "Present"}
                          >
                            {emp.timer?.isRunning ? "End" : "Start"}
                          </Button>
                        </span>
                      </Tooltip>
                    </Box>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
export default AttendancePage;