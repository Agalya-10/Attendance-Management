import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [filterDate, setFilterDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    setAttendanceData(storedData);
    setDisplayData(storedData.slice(0, visibleCount));
  }, []);

  useEffect(() => {
    setDisplayData(attendanceData.slice(0, visibleCount));
  }, [visibleCount, attendanceData]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
    const filtered = attendanceData.filter(
      (data) => data.date === e.target.value
    );
    setDisplayData(filtered.slice(0, visibleCount));
  };

  return (
    <Container>
      <Typography variant="h5" fontWeight="bold" color="primary" align="center">
        Attendance Report
      </Typography>
      <TextField
        label="Filter by Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filterDate}
        onChange={handleDateChange}
        sx={{ my: 2, width: "200px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#8763CD" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S No</TableCell>
              <TableCell sx={{ color: "white" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((emp, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {visibleCount < attendanceData.length && (
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#8763CD", color: "white", width: "200px" }}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </Container>
  );
};

export default AttendanceReport;
