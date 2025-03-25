import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
} from "@mui/material";

const employeeNames = ["Yousaf", "Asif", "Arun", "Kumar"];

const initialLeavesData = [
  { id: 1, empId: "yousaf222", name: "Yousaf", type: "Sick Leave", dept: "Frontend", days: 4, status: "Approved" },
  { id: 2, empId: "asif113", name: "Asif", type: "Exam Leave", dept: "Backend", days: 2, status: "Pending" },
  { id: 3, empId: "arun114", name: "Arun", type: "Function Leave", dept: "Frontend", days: 1, status: "Rejected" },
  { id: 4, empId: "kumar119", name: "Kumar", type: "Sick Leave", dept: "Backend", days: 5, status: "Approved" },
];

const Leaves = () => {
  const [search, setSearch] = useState("");
  const [leaves, setLeaves] = useState(initialLeavesData);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setLeaves(leaves.map((leave) => (leave.id === id ? { ...leave, status: newStatus } : leave)));
  };

  const handleNameChange = (id, newName) => {
    setLeaves(leaves.map((leave) => (leave.id === id ? { ...leave, name: newName } : leave)));
  };

  const filteredLeaves = leaves.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      {/* Search Input */}
      <TextField
        fullWidth
        label="Search By Emp Name"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

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
          {filteredLeaves.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Select
                  value={row.name}
                  onChange={(e) => handleNameChange(row.id, e.target.value)}
                  size="small"
                >
                  {employeeNames.map((emp) => (
                    <MenuItem key={emp} value={emp}>
                      {emp}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.dept}</TableCell>
              <TableCell>{row.days}</TableCell>
              <TableCell>
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  size="small"
                  sx={{
                    color:
                      row.status === "Approved" ? "green" :
                      row.status === "Rejected" ? "red" :
                      "orange",
                    fontWeight: "bold",
                  }}
                >
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small" onClick={() => setSelectedLeave(row)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Popup Dialog with Form Inputs */}
      <Dialog open={Boolean(selectedLeave)} onClose={() => setSelectedLeave(null)}>
        <DialogTitle>Leave Details</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <form style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              <TextField label="Employee Name" value={selectedLeave.name} InputProps={{ readOnly: true }} />
              <TextField label="Department" value={selectedLeave.dept} InputProps={{ readOnly: true }} />
              <TextField label="Leave Type" value={selectedLeave.type} InputProps={{ readOnly: true }} />
              <TextField label="Days" value={selectedLeave.days} InputProps={{ readOnly: true }} />
              <TextField label="Status" value={selectedLeave.status} InputProps={{ readOnly: true }} />
            </form>
          )}
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
};

export default Leaves;
