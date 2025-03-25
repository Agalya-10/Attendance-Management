// src/components/AttendanceReport.js
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
} from "@mui/material";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
    setAttendanceData(storedData);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="primary" align="center" mb={3}>
        Attendance Report
      </Typography>

      {Object.keys(attendanceData).length === 0 ? (
        <Typography align="center">No attendance records found.</Typography>
      ) : (
        Object.entries(attendanceData).map(([date, records]) => (
          <TableContainer component={Paper} key={date} sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ bgcolor: "#EC155B", color: "white", p: 1 }}
            >
              Date: {date}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S No</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(records) ? (
                  records.map((emp, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.status || "Not Marked"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No records available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ))
      )}
    </Container>
  );
};

export default AttendanceReport;
