import React, { useState, useEffect } from "react";
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
  TextField,
  Box,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AttendanceReport = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`attendance_${date}`)) || [];
    setRecords(data);
  }, [date]);

  return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
      <Container maxWidth="lg" sx={{ mt: 4, }}>
        <Typography variant="h5" align="center" gutterBottom color="primary" fontWeight="bold"  fontFamily="Georgia, serif">
          Attendance Report - {date}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={3}>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            size="small"
          />
          <Button variant="contained" sx={{backgroundColor:'#EC155B',fontFamily:"Georgia, serif"}}  onClick={() => navigate("/leaves")}>
           View Leave Report
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#EC155B" }}>
              <TableRow>
                <TableCell sx={{ color: "white",fontFamily:"Georgia, serif",fontWeight:'bold' }}>S.No</TableCell>
                <TableCell sx={{ color: "white",fontFamily:"Georgia, serif",fontWeight:'bold' }}>Name</TableCell>
                <TableCell sx={{ color: "white",fontFamily:"Georgia, serif",fontWeight:'bold' }}>Department</TableCell>
                <TableCell sx={{ color: "white",fontFamily:"Georgia, serif",fontWeight:'bold' }}>Status</TableCell>
                <TableCell sx={{ color: "white",fontFamily:"Georgia, serif",fontWeight:'bold' }}>Time Worked</TableCell>
                <TableCell sx={{ color: "white",fontFamily:"Georgia, serif",fontWeight:'bold' }}>Timer Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((emp, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{fontFamily:"Georgia, serif"}}>{idx + 1}</TableCell>
                  <TableCell sx={{fontFamily:"Georgia, serif"}}>{emp.name}</TableCell>
                  <TableCell sx={{fontFamily:"Georgia, serif"}}>{emp.department}</TableCell>
                  <TableCell sx={{fontFamily:"Georgia, serif"}}>
                    {emp.status === "Present" ? "Present" : 
                     emp.status === "Absent" ? "Absent" : "Not Marked"}
                  </TableCell>
                  <TableCell sx={{fontFamily:"Georgia, serif"}}>
                    <Box display="flex" alignItems="center">
                      <AccessTimeIcon sx={{ mr: 1 }} />
                      {formatTime(emp.timer?.elapsedTime || 0)}
                    </Box>
                  </TableCell>
                  <TableCell sx={{fontFamily:"Georgia, serif"}}>
                    {emp.timer?.isRunning ? "Running" : "Stopped"}
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
export default AttendanceReport;