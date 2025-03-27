import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Box, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu"; // ✅ Menu icon import

import { useNavigate } from "react-router-dom";
import logo from "../Assets/ebrain_image.png";

const drawerWidth = 240;
const navbarHeight = 64;

const SideNav = ({ children }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(""); // ✅ Initially empty (No content shown)
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
      {/* ✅ Sidebar with toggle option */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "white",
            color: "black",
            fontFamily: "Georgia, serif",
            display: open ? "block" : "none", // Hide when closed
          },
        }}
      >
        {/* ✅ Logo Section */}
        <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "10px" }}>
          <img src={logo} alt="Attendance Logo" style={{ width: "95%", height: "100px", marginTop: "10px" }} />
        </Toolbar>

        {/* ✅ Sidebar Menu Items */}
        <List sx={{ marginTop: "-7px" }}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                setSelectedItem(item.path); // ✅ Content will show only after clicking
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
  primaryTypographyProps={{ fontWeight: "bold" }} // ✅ Ensures bold text
  sx={{
    fontFamily: "Georgia, serif",
    fontSize: "18px",
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* ✅ Menu Icon for toggling sidebar */}
              <IconButton sx={{ color: "white", marginRight: "10px" }} onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography sx={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "white" }}>
                Welcome, Guys!
              </Typography>
            </Box>
            {/* ✅ Logout Button */}
            <IconButton sx={{ color: "white" }} onClick={() => navigate("/")}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* ✅ Content - Hidden initially */}
        {selectedItem && (
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
        )}
      </Box>
    </Box>
  );
};

export default SideNav;
