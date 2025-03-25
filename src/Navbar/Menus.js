import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const Menus = () => {
    const navigate = useNavigate(); // Navigation function

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/admin" },
        { text: "Employees", icon: <PeopleIcon />, path: "/dashboard/employee" },
        { text: "Leaves", icon: <EventNoteIcon />, path: "/dashboard/leaves" },
        { text: "Attendance", icon: <CheckCircleIcon />, path: "/dashboard/attendance" },
        { text: "Attendance Report", icon: <AssessmentIcon />, path: "/dashboard/attendancereport" },
        { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
    ];

    return (
        <List>
            {menuItems.map((item) => (
                <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );
};

export default Menus;
