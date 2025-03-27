import React, { useState, useEffect } from "react";
import { Grid2, Paper, Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";

const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const storedLeaves = JSON.parse(localStorage.getItem(`leave_status_${today}`)) || {};
  
  const totalLeaves = Object.keys(storedLeaves).length;
  const approvedLeaves = Object.values(storedLeaves).filter(status => status === "Approved").length;
  const pendingLeaves = totalLeaves - approvedLeaves;

  return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_DASHBOARD} />
      <Box>
        <Grid2 container spacing={2} sx={{ marginLeft: "20px" }}>
          {[{ title: "Total Employees", value: "19", icon: <PeopleIcon />, color: "#4CAF50" },
            { title: "Total Departments", value: "2", icon: <BusinessIcon />, color: "#FFC107" }
          ].map((item, index) => (
            <Grid2 item size={3} sm={4} md={3} key={index}>
              <Paper elevation={3} sx={{ padding: "20px", display: "flex", alignItems: "center", gap: "10px", background: "white" }}>
                <Box sx={{ background: item.color, width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50px" }}>
                  {React.cloneElement(item.icon, { sx: { color: "white", fontSize: "30px" } })}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                  <Typography>{item.title}</Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>

        <Typography variant="h5" fontWeight="bold" marginTop={3} marginBottom={2} marginLeft={2}>Leave Details</Typography>
        <Grid2 container spacing={2}>
          {[{ title: "Leave Applied", value: totalLeaves, icon: <EventNoteIcon />, color: "#26A69A" },
            { title: "Leave Approved", value: approvedLeaves, icon: <CheckCircleIcon />, color: "#4CAF50" },
            { title: "Leave Pending", value: pendingLeaves, icon: <HourglassEmptyIcon />, color: "#FFC107" }
          ].map((item, index) => (
            <Grid2 item size={3} sm={4} md={3} key={index} sx={{ marginLeft: "20px" }}>
              <Paper elevation={3} sx={{ padding: "20px", display: "flex", alignItems: "center", gap: "10px", background: "white" }}>
                <Box sx={{ background: item.color, width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50px" }}>
                  {React.cloneElement(item.icon, { sx: { color: "white", fontSize: "30px" } })}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                  <Typography>{item.title}</Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default Dashboard;
