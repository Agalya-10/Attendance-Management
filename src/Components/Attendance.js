import React, { useState } from "react";
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
  Button,
  Box,
} from "@mui/material";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";

const employees = [
  { id: 1, name: "Bavya", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", department: "Backend Developer" },
  { id: 3, name: "Rajapriya", department: "Frontend Developer" },
];

const AttendancePage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
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
    navigate("/attendancereport");
  };

  return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" color="primary" mb={3}>
          Mark Attendance - {today}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
         <Button variant="contained" sx={{ backgroundColor: "#EC155B" }} onClick={() => navigate("/leaves")}>View Leave Report</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#EC155B", color: "white" }}
            onClick={saveAttendanceAndGoToReport}
          >
            Attendance Report
          </Button>
         
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
                      <Typography sx={{ color: "red", fontWeight: "bold", fontSize: 22 }}>A</Typography>
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{marginRight:"10px"}}
                      onClick={() => handleChange(index, "Present")}
                    >
                      X
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleChange(index, "Absent")}
                    >
                      A
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
