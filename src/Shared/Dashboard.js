import React from "react";
import { Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid, Paper } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2F8D7B",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold", margin: "auto" }}>
            Employee MS
          </Typography>
        </Toolbar>
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Employees", icon: <PeopleIcon /> },
            { text: "Departments", icon: <BusinessIcon /> },
            { text: "Leaves", icon: <EventNoteIcon /> },
            { text: "Salary", icon: <MonetizationOnIcon /> },
            { text: "Attendance", icon: <PeopleIcon /> },
            { text: "Attendance Report", icon: <ReportIcon /> },
            { text: "Settings", icon: <SettingsIcon /> },
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: "#F1F3F6" }}>
        {/* Top Navbar */}
        <AppBar position="static" sx={{ background: "#2F8D7B", boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex", justifyContenssst: "space-between" }}>
            <Typography variant="h6">Welcome, Admin</Typography>
            <Button variant="contained" sx={{ bgcolor: "#1E524E", "&:hover": { bgcolor: "#154D45" } }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Dashboard Overview */}
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h5" fontWeight="bold" marginBottom={2}>
            Dashboard Overview
          </Typography>

          <Grid container spacing={2}>
            {[
              { title: "Total Employees", value: "5", icon: <PeopleIcon />, color: "#4CAF50" },
              { title: "Total Departments", value: "3", icon: <BusinessIcon />, color: "#FFC107" },
              
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper elevation={3} sx={{ padding: "20px", display: "flex", alignItems: "center", gap: "10px", background: "white" }}>
                  <Box sx={{ background: item.color, width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px" }}>
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

          {/* Leave Details */}
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
                <Paper elevation={3} sx={{ padding: "20px", display: "flex", alignItems: "center", gap: "10px", background: "white" }}>
                  <Box sx={{ background: item.color, width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px" }}>
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
      </Box>
    </Box>
  );
};

export default Dashboard;
