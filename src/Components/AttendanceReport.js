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
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";

const AttendanceReport = () => {
  const navigate = useNavigate();
  const todayDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const loadAttendanceData = (date) => {
    const data = JSON.parse(localStorage.getItem(`attendance_${date}`)) || [];
    setAttendanceRecords(data);
  };

  useEffect(() => {
    loadAttendanceData(todayDate);
  }, []);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    loadAttendanceData(newDate);
  };

  return (
    <Box sx={{ fontFamily: "Georgia, serif" }}> {/* ✅ Full component ku font apply */}
      <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
      <Container maxWidth="lg" sx={{ mt: 4, p: 3, borderRadius: 2, marginTop: "-10px" }}>
        <Typography variant="h5" align="center" fontWeight="bold" sx={{ fontFamily: "Georgia, serif" }} color="primary" mb={3}>Mark Attendance - {todayDate}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            type="date"
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true }}
            sx={{ fontFamily: "Georgia, serif" }}
          />
          <Button variant="contained" sx={{ backgroundColor: "#EC155B" }} onClick={() => navigate("/leaves")}>
            View Leave Report
          </Button>
        </Box>

        {attendanceRecords.length === 0 ? (
          <Typography align="center" sx={{ fontFamily: "Georgia, serif" }}>No records found for selected date.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EC155B" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center",  fontFamily: "Georgia, serif" }}>S No</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center",  fontFamily: "Georgia, serif" }}>Employee Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center",  fontFamily: "Georgia, serif" }}>Department</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center",  fontFamily: "Georgia, serif" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords.map((emp, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "center",  fontFamily: "Georgia, serif" }}>{idx + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center",  fontFamily: "Georgia, serif" }}>{emp.name}</TableCell>
                    <TableCell sx={{ textAlign: "center",  fontFamily: "Georgia, serif" }}>{emp.department}</TableCell>
                    <TableCell sx={{ textAlign: "center",  fontFamily: "Georgia, serif" }}>{emp.status || "Not Marked"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default AttendanceReport;
