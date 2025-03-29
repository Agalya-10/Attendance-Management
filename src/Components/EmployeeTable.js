import React, { useState, useEffect } from "react";
import { IconButton, Table, TableBody, TableCell, Container, TableContainer, Grid2, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ id: "", name: "", dob: "", department: "" });

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  const handleOpen = (employee = null) => {
    setEditMode(!!employee);
    setForm(employee || { id: Date.now(), name: "", dob: "", department: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleSave = () => {
    if (editMode) {
      const updatedEmployees = employees.map(emp => (emp.id === form.id ? form : emp));
      setEmployees(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    } else {
      const updatedEmployees = [...employees, form];
      setEmployees(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const filteredEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(filteredEmployees);
    localStorage.setItem("employees", JSON.stringify(filteredEmployees));
  };

  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid2 container spacing={2} sx={{ mb: 2, justifyContent: "space-between" }}>
        <Grid2 item size={3}>
          <TextField fullWidth label="Search Employees" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          />
        </Grid2>
        <Grid2 item xs={3}>
          <Button variant="contained" sx={{ backgroundColor: "#EC155B", color: "white",padding:"15px" }} onClick={() => handleOpen()}>Add New Employee</Button>
        </Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EC155B" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "#fff" }}>S. No</TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>Employee Name</TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>DOB</TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>Department</TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{employee.name}</TableCell>
                <TableCell align="center">{employee.dob}</TableCell>
                <TableCell align="center">{employee.department}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => setSelectedEmployee(employee) || setOpen(true)}><VisibilityIcon /></IconButton>
                  <IconButton sx={{ color: "green", mx: 1 }} onClick={() => handleOpen(employee)}><EditIcon /></IconButton>
                  <IconButton sx={{ color: "red" }} onClick={() => handleDelete(employee.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        {selectedEmployee ? (
          <>
            <DialogTitle  sx={{padding:2}}>Employee Details</DialogTitle>
            <DialogContent  sx={{padding:10}}>
              <Typography variant="h6">Name: {selectedEmployee?.name}</Typography>
              <Typography variant="h6">DOB: {selectedEmployee?.dob}</Typography>
              <Typography variant="h6">Department: {selectedEmployee?.department}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ backgroundColor: "gray", color: "white" }}>Close</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>{editMode ? "Update Employee" : "Add Employee"}</DialogTitle>
            <DialogContent>
              <TextField fullWidth margin="dense" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <TextField fullWidth margin="dense" label="DOB" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} InputLabelProps={{ shrink: true }} />
              <TextField fullWidth margin="dense" label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ backgroundColor: "gray", color: "white" }}>Cancel</Button>
              <Button onClick={handleSave} sx={{ backgroundColor: "#EC155B", color: "white" }}>{editMode ? "Update" : "Add"}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default EmployeeTable;
