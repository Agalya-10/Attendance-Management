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
