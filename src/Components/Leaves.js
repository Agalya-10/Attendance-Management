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
    <Container maxWidth="lg" sx={{ mt: 4, fontFamily: "Georgia, serif" }}> 
      <Typography 
        variant="h5" 
        align="center" 
        fontWeight="bold" 
        color="primary" 
        mb={3} 
        sx={{ fontFamily: "Georgia, serif" }} // Font apply pannurathu
      >
        Leave Report - {today}
      </Typography>

      <Button 
        variant="contained" 
        sx={{ backgroundColor: "#EC155B", fontFamily: "Georgia, serif" }} // Font apply pannurathu
        onClick={() => navigate("/attendance")}
      >
        Back to Attendance
      </Button>

      {absentEmployees.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3, fontFamily: "Georgia, serif" }}> 
          <Table>
            <TableHead sx={{ backgroundColor: "#EC155B" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center", fontFamily: "Georgia, serif" }}>
                  S No
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center", fontFamily: "Georgia, serif" }}>
                  Employee Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center", fontFamily: "Georgia, serif" }}>
                  Department
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absentEmployees.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ textAlign: "center", fontFamily: "Georgia, serif" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontFamily: "Georgia, serif" }}>
                    {emp.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontFamily: "Georgia, serif" }}>
                    {emp.department}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography 
          variant="body1" 
          color="textSecondary" 
          textAlign="center" 
          sx={{ mt: 2, fontFamily: "Georgia, serif" }} // Font apply pannurathu
        >
          No Absent Employees
        </Typography>
      )}
    </Container>
  );
};

export default Leaves;
