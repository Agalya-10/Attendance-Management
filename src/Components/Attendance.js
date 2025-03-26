import React, { useState} from "react";
import {Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Select,MenuItem,FormControl,Box,Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const AttendancePage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];

  const [attendance, setAttendance] = useState(
    storedAttendance.length > 0
      ? storedAttendance
      : employees.map((emp) => ({ ...emp, status: "" }))
  );

  const handleChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);
  };

  const saveAttendanceAndGoToReport = () => {
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendance));
    navigate("/attendancereport"); // 🔹 Directly Navigate After Saving
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 ,marginTop:'-5px' }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary" mb={3}>
        Mark Attendance - {today}
      </Typography>

      {/* Total Present / Absent & Attendance Report Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="body1">
            Total Present: {attendance.filter((emp) => emp.status === "Present").length}
          </Typography>
          <Typography variant="body1">
            Total Absent: {attendance.filter((emp) => emp.status === "Absent").length}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#EC155B" }}
          onClick={saveAttendanceAndGoToReport}
        >
          Attendance Report
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EC155B", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>S No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((emp, index) => (
              <TableRow key={emp.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.status || "--"}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select value={emp.status} onChange={(e) => handleChange(index, e.target.value)}>
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AttendancePage;
