import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Dashboard as DashboardIcon,People as PeopleIcon,EventNote as EventNoteIcon, ContactMail as ContactMailIcon, Assessment as ReportIcon, Logout as LogoutIcon, Menu as MenuIcon} from "@mui/icons-material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/ebrain_image.png";

const drawerWidth = 240;
const navbarHeight = 64;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Employees", icon: <PeopleIcon />, path: "/employeetable" },
  { text: "Leaves", icon: <EventNoteIcon />, path: "/leaves" },
  { text: "Attendance", icon: <PeopleIcon />, path: "/attendance" },
  { text: "AttendanceReport", icon: <ReportIcon />, path: "/attendancereport" },
  { text: "Contact", icon: <ContactMailIcon />, path: "/contact" },
  { text: "UserAttendance", icon: <ReportIcon  />, path: "/userattendance" },
  { text: "UserDashboard", icon: <DashboardIcon />, path: "/userdashboard" },

];
const DrawerContent = ({ selectedItem, handleItemClick }) => (
  <>
    <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", pb: 2 }}>
      <img src={logo} alt="Logo" style={{ width: "95%", height: 100, marginTop: "10px" }} />
    </Toolbar>
    <List sx={{ mt: -1 }}>
      {menuItems.map((item) => (
        <ListItem button key={item.path} onClick={() => handleItemClick(item.path)} selected={selectedItem === item.path}sx={{bgcolor: selectedItem === item.path ? "#EC155B" : "transparent",color: selectedItem === item.path ? "white" : "black",py: 1.5,px: 2.5,mb: -0.5,"&:hover": {bgcolor: selectedItem === item.path ? "#EC155B" : "#f5f5f5",},}}>
          <ListItemIcon sx={{ color: selectedItem === item.path ? "white" : "grey" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text}primaryTypographyProps={{fontFamily: "Georgia, serif",fontSize: "17px",fontWeight: selectedItem === item.path ? "bold" : "normal",ml: -2,}}/>
        </ListItem>
      ))}
    </List>
  </>
);

const SideNav = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const exactMatch = menuItems.find(item => pathname === item.path);
    if (exactMatch) {
      setSelectedItem(exactMatch.path);
      return;
    }
    
    const activeItem = menuItems.find(item => pathname.startsWith(item.path));
    setSelectedItem(activeItem?.path || "");
  }, [pathname]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleItemClick = useCallback(
    (path) => {
      navigate(path);
      if (isMobile) setMobileOpen(false);
    },
    [isMobile, navigate]
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Drawer variant={isMobile ? "temporary" : "permanent"} open={!isMobile || mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}sx={{width: drawerWidth,flexShrink: 0,[`& .MuiDrawer-paper`]: {width: drawerWidth,bgcolor: "white",position: "relative",},display: { xs: "none", md: "block" },}}>
        <DrawerContent selectedItem={selectedItem} handleItemClick={handleItemClick} />
      </Drawer>
      <Drawer variant="temporary"open={mobileOpen}onClose={handleDrawerToggle}sx={{display: { xs: "block", md: "none" },[`& .MuiDrawer-paper`]: { width: drawerWidth },}}>
        <DrawerContent selectedItem={selectedItem} handleItemClick={handleItemClick} />
      </Drawer>

      <Box component="main"sx={{flexGrow: 1,width: { md: `calc(100% - ${drawerWidth}px)` },display: "flex",flexDirection: "column",}}>
        <AppBar position="fixed" sx={{width: { md: `calc(100% - ${drawerWidth}px)` },left: { md: drawerWidth },height: navbarHeight,bgcolor: "#124598",}}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}sx={{ mr: 2, display: { md: "none" } }}aria-label="Toggle menu"> <MenuIcon /> </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "Georgia" }}>Welcome, Guys!</Typography>
            <IconButton color="inherit" onClick={() => navigate("/")} aria-label="Logout"><LogoutIcon /></IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{mt: `${navbarHeight}px`,p: 3,bgcolor: "#F1F3F6",flexGrow: 1,overflow: "auto",}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default SideNav;