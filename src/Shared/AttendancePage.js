import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box, Button, Typography, FormControl } from "@mui/material";
import { employees, tableHeaders, PRIMARY_COLOR } from "../Shared/CurrentTime";

const StatusSelect = ({ value, onChange }) => (
  <FormControl fullWidth>
    <Select value={value} onChange={onChange}>{["Present", "Absent"].map((status) => (<MenuItem key={status} value={status}>{status}</MenuItem>))}</Select>
  </FormControl>
);
const AttendancePage = ({ onSave }) => {
  const today = new Date().toISOString().split("T")[0];
  const [attendance, setAttendance] = useState(
    JSON.parse(localStorage.getItem(`attendance_${today}`)) || employees.map(emp => ({ ...emp, status: "" }))
  );
  const handleChange = (index, status) => {
    const updated = [...attendance];
    updated[index].status = status;
    setAttendance(updated);
  };
  const saveAttendance = () => {
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendance));
    onSave();
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {["Present", "Absent"].map(type => (
          <Typography key={type}>Total {type}: {attendance.filter(emp => emp.status === type).length}</Typography>
        ))}
        <Button variant="contained" sx={{ backgroundColor: PRIMARY_COLOR }} onClick={saveAttendance}>Attendance Report</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
            <TableRow>{tableHeaders.map(({ id, label }) => <TableCell key={id} sx={{ color: "white" }}>{label}</TableCell>)}</TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((emp, index) => (
              <TableRow key={emp.id}>
                {[index + 1, emp.name, emp.department, emp.status || "--"].map((val, i) => <TableCell key={i}>{val}</TableCell>)}
                <TableCell><StatusSelect value={emp.status} onChange={e => handleChange(index, e.target.value)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AttendancePage;