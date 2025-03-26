import React, { useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";

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
    storedAttendance.length > 0 ? storedAttendance : employees.map((emp) => ({ ...emp, status: "" }))
  );

  const handleChange = (index, status) => {
    setAttendance((prev) =>
      prev.map((emp, i) => (i === index ? { ...emp, status } : emp))
    );
  };

  const saveAttendanceAndGoToReport = () => {
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendance));
    console.log("Attendance Saved:", JSON.parse(localStorage.getItem(`attendance_${today}`))); // Debugging
    navigate("/attendancereport");
  };
   return (
     <>
    <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
    <Container maxWidth="lg" sx={{ mt: 4 }}>
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

        <Button variant="contained" sx={{ backgroundColor: "#EC155B", color: "white" }} onClick={saveAttendanceAndGoToReport}>
          Attendance Report
        </Button>
      </Box>
  <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EC155B" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign:"center" }}>S No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign:"center" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign:"center" }}>Department</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign:"center" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign:"center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((emp, index) => (
              <TableRow key={emp.id}>
                <TableCell sx={{textAlign:'center'}}>{index + 1}</TableCell>
                <TableCell sx={{textAlign:'center'}}>{emp.name}</TableCell>
                <TableCell sx={{textAlign:'center'}}>{emp.department}</TableCell>
                <TableCell sx={{textAlign:'center'}}>
                  {emp.status === "Present" ? (
                    <CloseIcon sx={{ color: "green", fontSize: 23 }} />
                  ) : emp.status === "Absent" ? (
                    <Typography sx={{ color: "red", fontWeight: "bold", fontSize: 22 }}>a</Typography>
                  ) : (
                    "--"
                  )}
                </TableCell>
                <TableCell sx={{textAlign:'center'}}>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<CloseIcon />}
                    sx={{ marginRight: 1 ,fontWeight: "bold",p:1}}
                    onClick={() => handleChange(index, "Present")}
                  >
                  
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ fontWeight: "bold", fontSize: 16 }}
                    onClick={() => handleChange(index, "Absent")}
                  >
                    a
                  </Button>
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