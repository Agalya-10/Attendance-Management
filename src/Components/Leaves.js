import React from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Leaves = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];

  const absentEmployees = storedAttendance.filter((emp) => emp.status === "Absent");

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary" mb={3}>
        Leave Report - {today}
      </Typography>

      <Button variant="contained" sx={{ backgroundColor: "#EC155B" }} onClick={() => navigate("/attendance")}>
        Back to Attendance
      </Button>

      {absentEmployees.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#EC155B" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>S No</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Employee Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absentEmployees.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{emp.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{emp.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
          No Absent Employees
        </Typography>
      )}
    </Container>
  );
};

export default Leaves;
