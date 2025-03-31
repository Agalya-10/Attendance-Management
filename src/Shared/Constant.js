export const VALID_PASSWORD = 'ebrain141';

export const TOASTER_MESSAGES = {  
  success: 'Login successful!',  
  error: 'Invalid Password',  
};

export const ROUTES = {
  successPage: '/dashboard',
};

export const COMPONENT_LABEL = {
  LABEL_DASHBOARD: 'Dashboard',
  LABEL_EMPLOYEES: 'Employee Table',
  LABEL_LEAVES: 'Leave Table',
  LABEL_ATTENDANCE: 'Attendance Page',  
  LABEL_ATTENDANCEREPORT: 'Attendance Report',
  LABEL_SETTINGS: 'Settings',
}



export const OFFICE_LOCATION = {
  lat: 10.6329891,
  lng: 79.2481621
};

export const ALLOWED_RADIUS = 200; // meters

export const EMPLOYEES = [
  { id: 1, name: "Bavya", department: "Frontend Developer" },
  { id: 2, name: "Dhivya Bharathi", department: "Backend Developer" },
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

export const DEFAULT_TIMER = {
  isRunning: false,
  startTime: null,
  elapsedTime: 0,
  lastSavedTime: 0
};

export const cellStyles = { color: "white", textAlign: "center", fontFamily: "Georgia, serif", fontWeight: "bold" };

export const table_Headers = ["S.No", "Name", "Department", "Status", "Time Working", "Actions"];

export const TABLE_HEADERS = [
  "S.No", "Name", "Department", "Status", "Time Worked", "Timer Status"
];
export const table_headers = ["S No", "Employee Name", "Department", "Status", "Action"];
export const defaultEmployees = [
  { id: 1, name: "Bavya", dob: "2003-05-12", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", dob: "2002-11-14", department: "Backend Developer" },
  { id: 3, name: "Rajapriya", dob: "2002-12-14", department: "Frontend Developer" },
  { id: 4, name: "Keerthana", dob: "2002-04-06", department: "Frontend Developer" },
  { id: 5, name: "Prakash", dob: "2000-07-06", department: "Frontend Developer" },
  { id: 6, name: "Tamilselvan", dob: "1995-06-15", department: "Backend Developer" },
  { id: 7, name: "Vanmathi", dob: "2000-08-13", department: "Backend Developer" },
  { id: 8, name: "Vinothini", dob: "2002-12-18", department: "Frontend Developer" },
  { id: 9, name: "Venkat Rentala", dob: "1995-06-15", department: "Frontend Developer" },
  { id: 10, name: "Agalya", dob: "2004-05-10", department: "Frontend Developer" },
  { id: 11, name: "Amsavarthani", dob: "2003-08-18", department: "Backend Developer" },
  { id: 12, name: "Priya", dob: "2003-11-26", department: "Frontend Developer" },
  { id: 13, name: "Pavithra", dob: "2003-09-26", department: "Frontend Developer" },
  { id: 14, name: "Gowthamraj", dob: "2001-06-20", department: "Backend Developer" },
  { id: 15, name: "Minar Vengat", dob: "2005-01-17", department: "Frontend Developer" },
  { id: 16, name: "Kanimozhi", dob: "2003-07-21", department: "Frontend Developer" },
  { id: 17, name: "Parthiban", dob: "2003-01-29", department: "Frontend Developer" },
  { id: 18, name: "Tamil nila", dob: "1996-06-05", department: "Backend Developer" },
  { id: 19, name: "Dhayanithi", dob: "1995-06-15", department: "Backend Developer" },
];
export const table_headers = ["S No", "Employee Name", "Department", "Status", "Action"];
