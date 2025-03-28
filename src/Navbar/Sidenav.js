import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Box, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/ebrain_image.png";

const drawerWidth = 240;
const navbarHeight = 64;

const SideNav = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Track current route
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
            display: open ? "block" : "none",
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
              onClick={() => navigate(item.path)}
              sx={{
                background: location.pathname === item.path ? "#EC155B" : "transparent",
                color: location.pathname === item.path ? "white" : "black",
                padding: "12px 20px",
                marginBottom: "-3px",
                "&:hover": {
                  background: location.pathname === item.path ? "#EC155B" : "transparent",
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? "white" : "grey" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontFamily: "Georgia, serif",
                  fontSize: "17px",
                  color: location.pathname === item.path ? "white" : "black",
                  fontWeight: location.pathname === item.path ? "bold" : "normal",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar position="static" sx={{ background: "#124598", height: navbarHeight }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ color: "white", marginRight: "10px" }} onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography sx={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "white" }}>Welcome, Guys!</Typography>
            </Box>
            <IconButton sx={{ color: "white" }} onClick={() => navigate("/")}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* ✅ Preserve current screen even after refresh */}
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
