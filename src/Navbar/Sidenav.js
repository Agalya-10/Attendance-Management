import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import logo from '../Assets/logo.png';
import { 
    createTheme, 
    ThemeProvider, 
    CssBaseline, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Drawer, 
    Menu, 
    MenuItem, 
    Container 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Routes, Route } from "react-router-dom";

// Import Components
import Dashboard from "../Components/Dashboard";
import Employee from "../Components/EmployeeTable";
import Leaves from "../Components/Leaves";
import Attendance from "../Components/Attendance";
import Settings from "../Components/SettingPage";
import AttendanceReport from "../Components/Attendance Report";
import Menus from "./Menus"; 

const drawerWidth = 240;
const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        background: {
            default: "#ffffff",
        },
    },
});

const MainContainer = styled("div")(({ open }) => ({
    flexGrow: 1,
    marginLeft: open ? drawerWidth : 0,
    transition: "margin 0.3s",
    marginTop: "5%",
    marginBottom: "5%",
}));

const Logo = styled("img")({
    width: "100%",
    height: "150px",
    padding: "16px 0",
});

function SideNav() {
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

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
            <div style={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
                        transition: "width 0.3s ease",
                    }}
                >
                    <Toolbar
                        sx={{
                            paddingLeft: open ? `${drawerWidth}px` : "16px",
                            transition: "padding-left 0.3s ease",
                        }}
                    >
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Welcome, Admin
                        </Typography>
                        <div style={{ marginLeft: "auto" }}>
                            <IconButton color="inherit" onClick={handleMenu}>
                                <AccountCircle />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer
                    sx={{
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <Logo src={logo} alt="Logo" />
                    <Menus />
                </Drawer>
                <MainContainer open={open}>
                    <Container maxWidth="xl" sx={{ mt: 3 }}>
                        <Routes>
                            <Route path="/dashboard/admin" element={<Dashboard />} />
                            <Route path="/dashboard/employee" element={<Employee />} />
                            <Route path="/dashboard/leaves" element={<Leaves />} />
                            <Route path="/dashboard/attendance" element={<Attendance />} />
                            <Route path="/dashboard/attendancereport" element={<AttendanceReport />} />
                            <Route path="/dashboard/settings" element={<SettingPage/>} />
                        </Routes>
                    </Container>
                </MainContainer>
            </div>
        </ThemeProvider>
    );
}

export default SideNav;
