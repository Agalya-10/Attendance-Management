import React from "react";
import { Grid2, Paper, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const today = new Date().toISOString().split("T")[0];
  const storedLeaves = JSON.parse(localStorage.getItem(`leave_status_${today}`)) || {};
  
  const totalLeaves = Object.keys(storedLeaves).length;
  const approvedLeaves = Object.values(storedLeaves).filter(status => status === "Approved").length;
  const rejectedLeaves = Object.values(storedLeaves).filter(status => status === "Rejected").length;
  const pendingLeaves = totalLeaves - approvedLeaves - rejectedLeaves;

  const employeeCards = [
    { title: "Total Employees", value: "19", icon: <PeopleIcon />, color: "#4CAF50", bgColor: "#E8F5E9" },
    { title: "Total Departments", value: "2", icon: <BusinessIcon />, color: "#FF9800", bgColor: "#FFF3E0" }
  ];

  const leaveCards = [
    { title: "Leave Applied", value: totalLeaves, icon: <EventNoteIcon />, color: "#00ACC1", bgColor: "#E0F7FA" },
    { title: "Leave Pending", value: pendingLeaves, icon: <HourglassEmptyIcon />, color: "#FFB300", bgColor: "#FFF8E1" },
    { title: "Leave Approved", value: approvedLeaves, icon: <CheckCircleIcon />, color: "#66BB6A", bgColor: "#E8F5E9" },
    { title: "Leave Rejected", value: rejectedLeaves, icon: <CancelIcon />, color: "#EF5350", bgColor: "#FFEBEE" }
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>Dashboard</Typography>
      <Grid2 container spacing={2}>
        {employeeCards.map((card, index) => (
          <Grid2 item xs={12} sm={6} md={6} key={index}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, borderRadius: 2, backgroundColor: card.bgColor }}>
              <Box sx={{ background: card.color, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "12px", boxShadow: 2 }}>
                {React.cloneElement(card.icon, { sx: { color: "white", fontSize: 24 } })}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ color: "#555", mb: 0.5 }}>{card.title}</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: card.color }}>{card.value}</Typography>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 3, color: "#333" }}>Leave Details</Typography>
      <Grid2 container spacing={2}>
        {leaveCards.map((card, index) => (
          <Grid2 item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ 
              p: 2, 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              textAlign: "center", 
              borderRadius: 2, 
              backgroundColor: card.bgColor,
              height: "100%"
            }}>
              <Box sx={{ background: card.color, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "12px", boxShadow: 2, mb: 2 }}>
                {React.cloneElement(card.icon, { sx: { color: "white", fontSize: 24 } })}
              </Box>
              <Typography variant="subtitle1" sx={{ color: "#555", mb: 1 }}>{card.title}</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ color: card.color }}>{card.value}</Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Dashboard;