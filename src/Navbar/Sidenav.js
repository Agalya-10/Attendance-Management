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
    { text: "AttendanceReport", icon: <ReportIcon />, path: "/attendancereport" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
            fontFamily: "Georgia, serif",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px" }}>
          <img src={logo} alt="Attendance Logo" style={{ width: "95%", height: "100px", marginTop: "10px" }} />
        </Toolbar>
        <List sx={{ marginTop: "-7px" }}>
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
                color: selectedItem === item.path ? "white" : "black",
                padding: "12px 20px",
                marginBottom: "-3px",
                "&:hover": {
                  background: selectedItem === item.path ? "#EC155B" : "transparent",
                },
              }}
            >
              <ListItemIcon sx={{color: selectedItem === item.path ? "white" : "grey",}} >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                  primaryTypographyProps={{
                  fontFamily: "Georgia, serif",
                  fontSize: "17px",
                  fontWeight: selectedItem === item.path ? "bold" : "normal",
              
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
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