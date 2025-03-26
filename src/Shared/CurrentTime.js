import { useReducer, useEffect } from "react";

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
  successPage: '/dashboard',
};

export const employees = [
  { id: 1, name: "Bavya", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", department: "Backend Developer" },
  { id: 3, name: "Rajapriya", department: "Frontend Developer" },
  { id: 4, name: "Keerthana", department: "Frontend Developer" },
  { id: 5, name: "Prakash", department: "Frontend Developer" },
  { id: 6, name: "Tamilselvan", department: "Backend Developer" },
  { id: 7, name: "Vanmathi", department: "Backend Developer" },
  { id: 8, name: "Vinothini", department: "Frontend Developer" },
  { id: 9, name: "Venkat Rentala", department: "Frontend Developer" },
  { id: 10, name: "Agalya", department: "Frontend Developer" },
  { id: 11, name: "Amsavarthani", department: "Backend Developer" },
  { id: 12, name: "Priya", department: "Frontend Developer" },
  { id: 13, name: "Pavithra", department: "Frontend Developer" },
  { id: 14, name: "Gowthamraj", department: "Backend Developer" },
  { id: 15, name: "Minar Vengat", department: "Frontend Developer" },
  { id: 16, name: "Kanimozhi", department: "Frontend Developer" },
  { id: 17, name: "Parthiban", department: "Frontend Developer" },
  { id: 18, name: "Tamil Nila", department: "Backend Developer" },
  { id: 19, name: "Dhayanithi", department: "Backend Developer" },
];

export const tableHeaders = [
  { id: "sno", label: "S No" },
  { id: "name", label: "Employee Name" },
  { id: "department", label: "Department" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" }
];

export const PRIMARY_COLOR = "#EC155B";
