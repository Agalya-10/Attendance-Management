import {Container,Select, FormControl, MenuItem,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Box,} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";
import CloseIcon from "@mui/icons-material/Close";
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
  const today = new Date().toISOString().split("T")[0]; 
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];

  const mergedAttendance = employees.map((emp) => {
    const existingRecord = storedAttendance.find((record) => record.id === emp.id);
    return existingRecord || { ...emp, status: "" };
  });

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
    navigate("/attendancereport");
  };
    return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" color="primary" mb={3}>Mark Attendance - {today}</Typography>
        <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
          <Button variant="contained" sx={{ backgroundColor: "#EC155B", color: "white" }} onClick={saveAttendanceAndGoToReport}>Attendance Report</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#EC155B" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>S No</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Employee Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Department</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{emp.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{emp.department}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {emp.status === "Present" ? (
                      <CloseIcon sx={{ color: "green", fontSize: 23 }} />
                    ) : emp.status === "Absent" ? (
                      <Typography sx={{ color: "red", fontWeight: "bold", fontSize: 22 }}>a</Typography>
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="outlined" color="success" sx={{ marginRight: "10px" }} onClick={() => handleChange(index, "Present")}>P</Button>
                    <Button variant="outlined" color="error" onClick={() => handleChange(index, "Absent")}>A</Button>
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