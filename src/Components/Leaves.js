import React, { useState, useEffect } from "react";
import {Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Grid2,useMediaQuery,useTheme,Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { table_headers,cellStyles } from "../Shared/Constant";

const Leaves = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const today = new Date().toISOString().split("T")[0];
  const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${today}`)) || [];
  const storedLeaves = JSON.parse(localStorage.getItem(`leave_status_${today}`)) || {};
  const absentEmployees = storedAttendance.filter((emp) => emp.status === "Absent").map((emp) => ({...emp,leaveStatus: storedLeaves[emp.id] || "Pending", }));
  const [leaveData, setLeaveData] = useState(absentEmployees);
  useEffect(() => {
    localStorage.setItem(`leave_status_${today}`, JSON.stringify(
      leaveData.reduce((acc, emp) => ({ ...acc, [emp.id]: emp.leaveStatus }), {})
    ));
  }, [leaveData, today]);
  const updateLeaveStatus = (id, status) => {
    const updatedLeaves = leaveData.map((emp) =>
      emp.id === id ? { ...emp, leaveStatus: status } : emp
    );
    setLeaveData(updatedLeaves);
  };
  const StatusBadge = ({ status }) => (
    <Box sx={{display: 'inline-block',px: 1.5,py: 0.5,fontWeight: 'bold',fontSize: isMobile ? '0.75rem' : '0.875rem',textAlign: 'center',color:status === "Approved" ? '#2e7d32' :status === "Rejected" ? '#c62828' : '#f57f17',}}>{status}</Box>
  );
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary"sx={{ fontFamily: "Georgia, serif" }} mb={3}>Leave Report - {today}</Typography>
      <Button variant="contained" sx={{ backgroundColor: "#EC155B", mb: 3,fontFamily: "Georgia, serif",'&:hover': {backgroundColor: "#c51162"}}} onClick={() => navigate("/attendance")}>Back to Attendance</Button>
      {leaveData.length > 0 ? (
        isMobile ? (
          <Grid2 container spacing={2}>
            {leaveData.map((emp, index) => (
              <Grid2 item size={{ xs: 12, md: 6 }} key={emp.id}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" fontFamily="Georgia, serif">{index + 1}. {emp.name}</Typography>
                  <Typography color="text.secondary" mb={1.5} fontFamily="Georgia, serif">{emp.department}</Typography>                  <Box display="flex" alignItems="center" mb={2}>
                    <StatusBadge status={emp.leaveStatus} />
                  </Box>
              <Box display="flex" gap={1.5} mt={2}>
              <Button variant={emp.leaveStatus === "Approved" ? "contained" : "outlined"}color="success" size="small"fullWidthsx={{fontFamily: "Georgia, serif",fontWeight: 'bold',textTransform: 'none',borderRadius: 1}}onClick={() => updateLeaveStatus(emp.id, "Approved")}>Approve</Button>
                <Button variant={emp.leaveStatus === "Rejected" ? "contained" : "outlined"}color="error" size="small"fullWidthsx={{fontFamily: "Georgia, serif",fontWeight: 'bold',textTransform: 'none',borderRadius: 1}}onClick={() => updateLeaveStatus(emp.id, "Rejected")}>Reject</Button>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
            <TableHead sx={{ backgroundColor: "#EC155B" }}>
           <TableRow>{table_headers.map((header) => ( <TableCell key={header} sx={cellStyles}>{header}</TableCell>))}</TableRow>
        </TableHead>
              <TableBody>
                {leaveData.map((emp, index) => (
                  <TableRow key={emp.id} hover>
                    <TableCell sx={{ textAlign: "center", fontFamily: "Georgia, serif" }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: "center", fontFamily: "Georgia, serif" }}>{emp.name}</TableCell>
                    <TableCell sx={{ textAlign: "center", fontFamily: "Georgia, serif" }}>{emp.department}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <StatusBadge status={emp.leaveStatus} />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button variant={emp.leaveStatus === "Approved" ? "contained" : "outlined"}color="success" size="small"sx={{fontFamily: "Georgia, serif",fontWeight: 'bold',textTransform: 'none',borderRadius: 1,minWidth: 100}}onClick={() => updateLeaveStatus(emp.id, "Approved")}>Approve</Button>
                      <Button variant={emp.leaveStatus === "Rejected" ? "contained" : "outlined"}color="error" size="small"sx={{fontFamily: "Georgia, serif",fontWeight: 'bold',textTransform: 'none',borderRadius: 1,minWidth: 100}}onClick={() => updateLeaveStatus(emp.id, "Rejected")}>Reject</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ mt: 2, fontFamily: "Georgia, serif",p: 3,backgroundColor: '#f5f5f5',borderRadius: 2}}>No Absent Employees Today</Typography>
      )}
    </Container>
  );
};
export default Leaves;