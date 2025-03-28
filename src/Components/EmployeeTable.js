import React, { useState, useEffect } from "react";
import {IconButton, Table, TableBody, TableCell,Container, TableContainer, Grid2, TableHead,TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,TextField, DialogActions, Typography,InputAdornment } from "@mui/material";
import {IconButton, Table, TableBody, TableCell,Container, TableContainer, Grid2, TableHead,TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,TextField, DialogActions, Typography} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";
import SearchIcon from "@mui/icons-material/Search";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    } else {
      const defaultEmployees = [
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
      setEmployees(defaultEmployees);
      localStorage.setItem("employees", JSON.stringify(defaultEmployees));
    }
  }, []);

  const updateEmployees = (newEmployees) => {
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsEdit(false);
    setOpen(true);
  };
  const handleEdit = (employee) => {
    setSelectedEmployee({ ...employee });
    setIsEdit(true);
    setIsAdd(false);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const filteredEmployees = employees.filter(emp => emp.id !== id);
    updateEmployees(filteredEmployees);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isEdit) {
      updateEmployees(
        employees.map(emp => (emp.id === selectedEmployee.id ? selectedEmployee : emp))
      );
    } else if (isAdd) {
      updateEmployees([...employees, { ...selectedEmployee, id: employees.length + 1 }]);
    }
    setOpen(false);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee({ name: "", dob: "", department: "" });
    setIsEdit(false);
    setIsAdd(true);
    setOpen(true);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    fontFamily: "Georgia, serif",
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid2 container spacing={2} sx={{mb:2, justifyContent: "space-between", ...styles }}>
       <Grid2 item xs={6}>
       <TextField fullWidth label="Search Employees"variant="outlined"value={search}onChange={(e) => setSearch(e.target.value)}
    sx={{fontFamily: "Georgia, serif","& label": { fontFamily: "Georgia, serif" },"& input": { fontFamily: "Georgia, serif" },"& .MuiOutlinedInput-root": { fontFamily: "Georgia, serif" },}}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start"><SearchIcon /></InputAdornment>
        ),
    }}/></Grid2>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_EMPLOYEES} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid2 container spacing={2} sx={{mb:2, justifyContent: "space-between", ...styles }}>
        <Grid2 item xs={6}><TextField fullWidth label="Search Employees"variant="outlined"value={search}onChange={(e) => setSearch(e.target.value)}sx={{fontFamily: "Georgia, serif","& label": { fontFamily: "Georgia, serif" },"& input": { fontFamily: "Georgia, serif" },"& .MuiOutlinedInput-root": { fontFamily: "Georgia, serif" },}}/></Grid2>
        <Grid2 item xs={3}><Button variant="contained"sx={{ backgroundColor: "#EC155B", padding: "15px", color: "white", ...styles }}onClick={handleAddEmployee}>Add New Employee</Button></Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table sx={styles}>
          <TableHead sx={{ backgroundColor: "#EC155B", ...styles }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff", ...styles }}>S. No</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff", ...styles }}>Employee Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff", ...styles }}>DOB</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff", ...styles }}>Department</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff", ...styles }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell align="center" sx={styles}>{index + 1}</TableCell>
                <TableCell align="center" sx={styles}>{employee.name}</TableCell>
                <TableCell align="center" sx={styles}>{employee.dob}</TableCell>
                <TableCell align="center" sx={styles}>{employee.department}</TableCell>
                <TableCell align="center">
                  <IconButton sx={{ color: "gray", ...styles }} onClick={() => handleView(employee)}><VisibilityIcon /></IconButton>
                  <IconButton sx={{ color: "green", margin: "0 5px", ...styles }} onClick={() => handleEdit(employee)}><EditIcon /></IconButton>
                  <IconButton sx={{ color: "red", ...styles }} onClick={() => handleDelete(employee.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={styles}>{isEdit || isAdd ? "Edit Employee" : "View Employee"}</DialogTitle>
        <DialogContent>
          <TextField label="Name"fullWidth margin="dense"value={selectedEmployee?.name || ""}onChange={(e) => (isEdit || isAdd) && setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}InputProps={{ readOnly: !(isEdit || isAdd) }}sx={styles}/>
          <TextField label="DOB"fullWidth margin="dense"value={selectedEmployee?.dob || ""}onChange={(e) => (isEdit || isAdd) && setSelectedEmployee({ ...selectedEmployee, dob: e.target.value })}InputProps={{ readOnly: !(isEdit || isAdd) }}sx={styles}/>
          <TextField label="Department"fullWidth margin="dense"value={selectedEmployee?.department || ""}onChange={(e) => (isEdit || isAdd) && setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}InputProps={{ readOnly: !(isEdit || isAdd) }}sx={styles}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ backgroundColor: "gray", color: "white", ...styles }}>Close</Button>
          {(isEdit || isAdd) && <Button onClick={handleSave} color="success" variant="contained" sx={styles}>Save</Button>}
        </DialogActions>
      </Dialog>
      </Container>
    </>
  );
};

export default EmployeeTable;
