import React, { useState, useEffect } from "react";
import {Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Box,} from "@mui/material";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";

const AttendanceReport = () => {
  const todayDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const loadAttendanceData = (date) => {
    const data = JSON.parse(localStorage.getItem(`attendance_${date}`)) || [];
    setAttendanceRecords(data);
  };

  useEffect(() => {
    loadAttendanceData(selectedDate);  
  }, [selectedDate]); 

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };

  return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
      <Container maxWidth="lg" sx={{ mt: 4, p: 3, borderRadius: 2, marginTop: "-10px" }}>
        <Typography variant="h5" fontWeight="bold" color="primary" align="center" mb={1}>
          Attendance Report - {selectedDate} 
        </Typography>

        <Box display="flex" justifyContent="flex-start" mb={2}>
          <TextField
            type="date"
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {attendanceRecords.length === 0 ? (
          <Typography align="center">No records found for selected date.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EC155B" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>S No</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Employee Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Department</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords.map((emp, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "center" }}>{idx + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{emp.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{emp.department}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{emp.status || "Not Marked"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};
export default AttendanceReport;