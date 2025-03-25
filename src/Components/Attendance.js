import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; 
const employees = [
  { id: 1, name: "Bavya", empId: "EMP001", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", empId: "EMP002", department: "Backend Developer" },
  { id: 3, name: "Rajapriya", empId: "EMP003", department: "Frontend Developer" },
  { id: 4, name: "Keerthana", empId: "EMP004", department: "Frontend Developer" },
  { id: 5, name: "Prakash", empId: "EMP005", department: "Frontend Developer" },
  { id: 6, name: "Tamilselvan", empId: "EMP006", department: "Backend Developer" },
  { id: 7, name: "Vanmathi", empId: "EMP007", department: "Backend Developer" },
  { id: 8, name: "Vinothini", empId: "EMP008", department: "Frontend Developer" },
  { id: 9, name: "Venkat Rentala", empId: "EMP009", department: "Frontend Developer" },
  { id: 10, name: "Agalya", empId: "EMP010", department: "Frontend Developer" },
  { id: 11, name: "Amsavarthani", empId: "EMP011", department: "Backend Developer" },
  { id: 12, name: "Priya", empId: "EMP012", department: "Frontend Developer" },
  { id: 13, name: "Pavithra", empId: "EMP013", department: "Frontend Developer" },
  { id: 14, name: "Gowthamraj", empId: "EMP014", department: "Backend Developer" },
  { id: 15, name: "Minar Vengat", empId: "EMP015", department: "Frontend Developer" },
  { id: 16, name: "Kanimozhi", empId: "EMP016", department: "Frontend Developer" },
  { id: 17, name: "Parthiban", empId: "EMP017", department: "Frontend Developer" },
  { id: 18, name: "Tamil Nila", empId: "EMP018", department: "Backend Developer" },
  { id: 19, name: "Dhayanithi", empId: "EMP019", department: "Backend Developer" },
];

const AttendanceTable = () => {
  const navigate = useNavigate();    
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); 
  const getSavedData = () => {
    const savedData = JSON.parse(localStorage.getItem(`attendance_${selectedDate}`)) || employees.map(emp => ({ ...emp, status: "present" }));
    return savedData;
  };

  const [data, setData] = useState(getSavedData());
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance_records")) || {};
    setAttendanceData(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("attendance_records", JSON.stringify(attendanceData));
  }, [attendanceData]);

  const getAttendanceForDate = (date) => {
    return employees.map((emp) => {
      const existingRecord = attendanceData[date]?.find((entry) => entry.id === emp.id);
      return existingRecord || { ...emp, status: "" };
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setAttendanceData((prev) => ({
      ...prev,
      [selectedDate]: getAttendanceForDate(selectedDate).map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      ),
    }));
  };
  const filteredData = data.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3,  borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          type="date"
          label="Select Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <Typography variant="h5" fontWeight="bold" color="primary">
          Attendance Management
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate("/attendancereport")}>
          View Report
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#8763CD" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S No</TableCell>
              <TableCell sx={{ color: "white" }}>Employee ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAttendanceForDate(selectedDate).map((emp, index) => (
              <TableRow key={emp.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.empId}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Select
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                    fullWidth
                    size="small"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value="present">Present</MenuItem>
                    <MenuItem value="absent">Absent</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
    </Container>

  );
};

export default AttendanceTable;
