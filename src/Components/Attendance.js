import React, { useState, useEffect } from "react";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";

export const NAMES = ([
  { id: 1, name: "Bavya", dob: "2003-05-12", department: "Frontend Developer" },
  { id: 2, name: "DhivyaBharathi", dob: "2002-11-14",department: "Backend Developer" },
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
]);

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance")) || NAMES.map((user, index) => ({
      id: user.id,
      name: user.name,
      empId: `EMP${user.id}`,
      department: user.department,
      action: "present"
    }));
    setAttendance(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const handleAttendanceChange = (id, value) => {
    setAttendance(prev => prev.map(user => user.id === id ? { ...user, action: value } : user));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Attendance</h2>
      <p>Mark Attendance for 2025-01-24</p>
      <TextField
        label="Search By Employee ID"
        variant="outlined"
        size="small"
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button variant="contained" color="success" style={{ float: "right" }}>
        Attendance Report
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Emp Id</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance
              .filter((row) => row.empId.includes(search))
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.empId}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    <Select
                      value={row.action}
                      onChange={(e) => handleAttendanceChange(row.id, e.target.value)}
                      size="small"
                    >
                      <MenuItem value="present">Present</MenuItem>
                      <MenuItem value="absent">Absent</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceTable;
