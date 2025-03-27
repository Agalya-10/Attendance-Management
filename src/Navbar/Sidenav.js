import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Box, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/ebrain_image.png";

const drawerWidth = 240;
const navbarHeight = 64;

const SideNav = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Employees", icon: <PeopleIcon />, path: "/employeetable" },
    { text: "Leaves", icon: <EventNoteIcon />, path: "/leaves" },
    { text: "Attendance", icon: <PeopleIcon />, path: "/attendance" },
    { text: "Attendance Report", icon: <ReportIcon />, path: "/attendancereport" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* ✅ Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        {/* ✅ Logo Section (Reduced Space Below) */}
        <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px" }}>
          <img src={logo} alt="Attendance Logo" style={{ width: "95%", height: "110px" , marginTop: "10px"}} />
        </Toolbar>

        {/* ✅ Sidebar Menu Items (Moved Up) */}
        <List sx={{ marginTop: "-2px" }}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                setSelectedItem(item.path);
                navigate(item.path);
              }}
              sx={{
                background: selectedItem === item.path ? "#EC155B" : "transparent",
                color: selectedItem === item.path ? "white" : "grey",
                padding: "12px 20px",
                marginBottom: "-3px",
                borderRadius: "8px",
                "&:hover": {
                  background: selectedItem === item.path ? "#EC155B" : "transparent",
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedItem === item.path ? "white" : "grey" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "18px",
                  fontWeight: selectedItem === item.path ? "bold" : "normal",
                  color: selectedItem === item.path ? "white" : "black",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ✅ Main Layout (Navbar + Content) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* ✅ Navbar */}
        <AppBar position="static" sx={{ background: "#124598", height: navbarHeight }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "white" }}>
              Welcome, Guys!
            </Typography>
            <IconButton sx={{ color: "white" }} onClick={() => navigate("/")}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* ✅ Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "20px",
            bgcolor: "#F1F3F6",
            height: `calc(100vh - ${navbarHeight}px)`,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
