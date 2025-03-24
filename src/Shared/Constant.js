import { useReducer, useEffect } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const MenuList = [
  {
    title: "Dashboard",
    navLink: "/admin",
    icon: <DashboardIcon />
  },
  {
    title: "Employee",
    navLink: "/employee",
    icon: <PersonIcon />
  },
  {
    title: "Leaves",
    navLink: "/leaves",
    icon: <EventNoteIcon />
  },
  {
    title: "Attendance",
    navLink: "/attendance",
    icon: <AccessTimeIcon />
  },
  {
    title: "Attendance Report",
    navLink: "/attendancereport",
    icon: <AssessmentIcon />
  },
  {
    title: "Settings",
    navLink: "/settings",
    icon: <SettingsIcon />,
  },
];



const initialState = { currentTime: new Date() };

const timeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIME":
      return { ...state, currentTime: new Date() };
    default:
      return state;
  }
};

export const useTime = () => {
  const [state, dispatch] = useReducer(timeReducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "UPDATE_TIME" });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return state.currentTime;
};

export const VALID_PASSWORD = 'ebrain141';

export const TOASTER_MESSAGES = {  
  success: 'Login successful!',  
  error: 'Invalid Password',  
};

export const ROUTES = {
  successPage: '/timer',
};

