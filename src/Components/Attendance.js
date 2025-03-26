import React from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AttendancePage from "../Shared/AttendancePage";

const Attendance = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const navigateToReport = () => {
    navigate("/attendancereport");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary" mb={3}>
        Mark Attendance - {today}
      </Typography>
      <Attendance onSave={navigateToReport} /> 
    </Container>
  );
};

export default Attendance;
