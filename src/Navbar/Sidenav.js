import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
// import BusinessIcon from "@mui/icons-material/Business";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navbarHeight = 64; // **Navbar fixed height**

const SideNav = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Employees", icon: <PeopleIcon />, path: "/employees" },
    // { text: "Departments", icon: <BusinessIcon />, path: "/departments" },
    { text: "Leaves", icon: <EventNoteIcon />, path: "/leaves" },
    // { text: "Salary", icon: <MonetizationOnIcon />, path: "/salary" },
    { text: "Attendance", icon: <PeopleIcon />, path: "/attendance" },
    { text: "Attendance Report", icon: <ReportIcon />, path: "/attendancereport" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* ✅ Static Sidebar */}
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
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ✅ Main Layout (Navbar + Scrollable Content) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* ✅ Static Navbar */}
        <AppBar position="static" sx={{ background: "#2F8D7B", height: navbarHeight }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Welcome, Admin</Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "#1E524E", "&:hover": { bgcolor: "#154D45" } }}
              onClick={() => navigate("/")}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* ✅ Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // ✅ Only content scrolls
            padding: "20px",
            bgcolor: "#F1F3F6",
            height: `calc(100vh - ${navbarHeight}px)`, // Navbar height removed
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
