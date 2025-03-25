import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const Dashboard = () => {
  return (
    <Box>
      {/* Dashboard Overview Section */}
      <Typography variant="h5" fontWeight="bold" marginBottom={2}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2}>
        {[
          { title: "Total Employees", value: "5", icon: <PeopleIcon />, color: "#4CAF50" },
          { title: "Total Departments", value: "3", icon: <BusinessIcon />, color: "#FFC107" },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "white",
              }}
            >
              <Box
                sx={{
                  background: item.color,
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                {React.cloneElement(item.icon, { sx: { color: "white", fontSize: "30px" } })}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography>{item.title}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Leave Details Section */}
      <Typography variant="h5" fontWeight="bold" marginTop={3} marginBottom={2}>
        Leave Details
      </Typography>
      <Grid container spacing={2}>
        {[
          { title: "Leave Applied", value: "2", icon: <EventNoteIcon />, color: "#26A69A" },
          { title: "Leave Approved", value: "2", icon: <CheckCircleIcon />, color: "#4CAF50" },
          { title: "Leave Pending", value: "1", icon: <HourglassEmptyIcon />, color: "#FFC107" },
        ].map((item, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "white",
              }}
            >
              <Box
                sx={{
                  background: item.color,
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                {React.cloneElement(item.icon, { sx: { color: "white", fontSize: "30px" } })}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography>{item.title}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
