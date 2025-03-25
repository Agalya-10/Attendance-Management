import React from "react";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const leavesData = [
  { id: 1, empId: "yousaf222", name: "yousaf", type: "Sick Leave", dept: "Logistic", days: 4, status: "Approved" },
  { id: 2, empId: "yousaf222", name: "yousaf", type: "Casual Leave", dept: "Logistic", days: 1, status: "Approved" },
  { id: 3, empId: "asif113", name: "asif", type: "Sick Leave", dept: "Database", days: 1, status: "Rejected" },
  { id: 4, empId: "asif113", name: "asif", type: "Annual Leave", dept: "Database", days: 2, status: "Rejected" },
  { id: 5, empId: "asif113", name: "asif", type: "Casual Leave", dept: "Database", days: 2, status: "Pending" },
];

const Leaves = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Manage Leaves</h2>
      <TextField fullWidth label="Search By Emp Name" variant="outlined" size="small" style={{ marginBottom: "20px" }} />
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "10px" }}>
       <Button variant="contained" color="success">Approved</Button>
        <Button variant="contained" color="warning">Pending</Button>
       </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leavesData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>
                  <span style={{ color: row.status === "Approved" ? "green" : row.status === "Rejected" ? "red" : "orange" }}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaves;

