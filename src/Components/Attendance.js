import React, { useState, useEffect } from "react";
import {Container,TextField,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Select,MenuItem,Button,Box,} from "@mui/material";
import { styled } from "@mui/material/styles"; 
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(3),
  borderRadius: 10,
}));
const AttendanceTable = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [attendanceData, setAttendanceData] = useState({});
  const [search, setSearch] = useState(""); 
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
    setAttendanceData((prevData) => ({
      ...prevData,
      [selectedDate]: prevData[selectedDate]?.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      ) || [],
    }));
  };
  const filteredData = getAttendanceForDate(selectedDate).filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <StyledContainer maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search By Name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "250px" }}
        />
        <Box textAlign="center" flexGrow={1}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Manage Attendance
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mark Attendance for <b>{selectedDate}</b>
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#008066", color: "white", textTransform: "none" }}
          onClick={() => navigate("/attendancereport")}
        >
          Attendance Report
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#008066" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S No</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((emp, index) => (
              <TableRow key={emp.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Select
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                    fullWidth
                    size="small"
                  >
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
  );
};
export default AttendanceTable;