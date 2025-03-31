// AttendanceReport.js
import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";
import AttendanceTable from "../Shared/AttendanceReportTable";

const AttendanceReport = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [records, setRecords] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setRecords(JSON.parse(localStorage.getItem(`attendance_${date}`)) || []);
  }, [date]);

  return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_ATTENDANCEREPORT} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" align="center" gutterBottom color="primary" fontWeight="bold" sx={{ fontFamily: 'Georgia, serif' }}>Attendance Report - {date}</Typography>
        <Box display="flex" justifyContent="space-between" mb={3} flexDirection={isMobile ? "column" : "row"} gap={2}>
          <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} size="small" fullWidth={isMobile} sx={{ fontFamily: 'Georgia, serif' }} />
          <Button variant="contained" sx={{ backgroundColor: "#EC155B", width: isMobile ? '100%' : 'auto', fontFamily: 'Georgia, serif' }} onClick={() => navigate("/leaves")}>View Leave Report</Button>
        </Box>
        <AttendanceTable records={records} />
      </Container>
    </>
  );
};

export default AttendanceReport;
