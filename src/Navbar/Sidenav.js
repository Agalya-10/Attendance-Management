import React, { useState } from "react";
import { 
    Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, 
    Box, Button, IconButton, Menu, MenuItem, Container, CssBaseline 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Assessment";
import { Routes, Route } from "react-router-dom";

// Import Components
import Dashboard from "../Components/Dashboard";
import Employee from "../Components/EmployeeTable";
import Leaves from "../Components/Leaves";
import Attendance from "../Components/Attendance";
import SettingPage from "../Components/SettingPage";
import AttendanceReport from "../Components/Attendance Report";
import Menus from "./Menus"; 
import logo from '../Assets/logo.png';

// Constants
const drawerWidth = 240;
const navbarHeight = 64;

// Styled Components
const MainContainer = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0,
}));

const SideNav = ({ children }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = createTheme();

    // Menu Items for Sidebar
    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Employees", icon: <PeopleIcon />, path: "/employees" },
        { text: "Leaves", icon: <EventNoteIcon />, path: "/leaves" },
        { text: "Attendance", icon: <PeopleIcon />, path: "/attendance" },
        { text: "Attendance Report", icon: <ReportIcon />, path: "/attendancereport" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    // Drawer Toggle Function
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    // Menu Functions
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} onClick={() => navigate(item.path)}>
                                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <AppBar position="static" sx={{ background: "#2F8D7B", height: navbarHeight }}>
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">Welcome, Admin</Typography>
                            <div>
                                <IconButton color="inherit" onClick={handleMenu}>
                                    <AccountCircle />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>

                    {/* Page Content */}
                    <MainContainer open={open}>
                        <Container maxWidth="xl" sx={{ mt: 3 }}>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/employees" element={<Employee />} />
                                <Route path="/leaves" element={<Leaves />} />
                                <Route path="/attendance" element={<Attendance />} />
                                <Route path="/attendancereport" element={<AttendanceReport />} />
                                <Route path="/settings" element={<SettingPage />} />
                            </Routes>
                        </Container>
                    </MainContainer>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default SideNav;
