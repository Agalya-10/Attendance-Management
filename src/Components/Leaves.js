import React, { useState, useEffect } from "react";
import {Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Leaves = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];
  const storedLeaves = JSON.parse(localStorage.getItem(`leave_status_${today}`)) || {};
  const absentEmployees = storedAttendance.filter((emp) => emp.status === "Absent").map((emp) => ({
    ...emp,
    leaveStatus: storedLeaves[emp.id] || "Pending",
  }));
  const [leaveData, setLeaveData] = useState(absentEmployees);
  useEffect(() => {
    localStorage.setItem(`leave_status_${today}`, JSON.stringify(
      leaveData.reduce((acc, emp) => ({ ...acc, [emp.id]: emp.leaveStatus }), {})
    ));
  }, [leaveData]);
  const updateLeaveStatus = (id, status) => {
    const updatedLeaves = leaveData.map((emp) =>
      emp.id === id ? { ...emp, leaveStatus: status } : emp
    );
    setLeaveData(updatedLeaves);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary"sx={{ fontFamily: "Georgia, serif" }} mb={3}>Leave Report - {today}</Typography>
      <Button variant="contained" sx={{ backgroundColor: "#EC155B", mr: 2 }} onClick={() => navigate("/attendance")}>Back to Attendance</Button>
      {leaveData.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
              {leaveData.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{emp.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{emp.department}</TableCell>
                  <TableCell sx={{ textAlign: "center", color: emp.leaveStatus === "Approved" ? "green" : "orange" }}>
                    {emp.leaveStatus}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => updateLeaveStatus(emp.id, "Approved")}>Approved</Button>
                    <Button variant="contained" color="warning" onClick={() => updateLeaveStatus(emp.id, "Pending")}>Pending</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ mt: 2 }}> No Absent Employees</Typography>
      )}
    </Container>
  );
};
export default Leaves;