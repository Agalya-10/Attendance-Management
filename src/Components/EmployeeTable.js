import React, { useState, useEffect } from "react";
import {IconButton, Table, TableBody, TableCell, Container, TableContainer,TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,TextField, DialogActions, Typography, InputAdornment, Grid2,useMediaQuery, useTheme, Box, Card, CardContent, CardActions} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { defaultEmployees } from "../Shared/Constant";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees && storedEmployees.length > 0) {
      setEmployees(storedEmployees);
    } else {
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
    setIsAdd(false);
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
      updateEmployees([...employees, { 
        ...selectedEmployee, 
        id: Math.max(...employees.map(e => e.id)) + 1 
      }]);
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
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: "space-between", flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        <TextField fullWidth label="Search Employees"variant="outlined"value={search}onChange={(e) => setSearch(e.target.value)}
          InputProps={{startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),}}size="small"sx={{maxWidth: isMobile ? '100%' : '250px',fontFamily: "Georgia, serif"}}/>
        <Button variant="contained"sx={{ backgroundColor: "#EC155B", color: "white",fontFamily: "Georgia, serif",minWidth: isMobile ? '100%' : '200px',}}onClick={handleAddEmployee}>Add New Employee</Button>
      </Box>
      {isMobile ? (
        <Grid2 container spacing={2}>
          {filteredEmployees.map((employee) => (
            <Grid2 item xs={12} key={employee.id}sx={{width:"100%"}}>
              <Card elevation={3} >
                <CardContent >
                  <Typography sx={{fontFamily: "Georgia, serif"}} variant="h6" fontWeight="bold">{employee.name}</Typography>
                  <Typography sx={{fontFamily: "Georgia, serif"}} color="text.secondary">{employee.department}</Typography>
                  <Typography sx={{ mt: 1,fontFamily: "Georgia, serif" }}>DOB: {employee.dob}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end',fontFamily: "Georgia, serif" }}>
                  <IconButton onClick={() => handleView(employee)}><VisibilityIcon color="action" /></IconButton>
                  <IconButton onClick={() => handleEdit(employee)}><EditIcon color="success" /></IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)}><DeleteIcon color="error" /></IconButton>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#EC155B" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff",fontFamily: "Georgia, serif" }}>S.No</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff",fontFamily: "Georgia, serif" }}>Employee Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff",fontFamily: "Georgia, serif" }}>DOB</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff",fontFamily: "Georgia, serif" }}>Department</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#fff",fontFamily: "Georgia, serif" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee, index) => (
                <TableRow key={employee.id} hover>
                  <TableCell align="center"sx={{fontFamily: "Georgia, serif"}}>{index + 1}</TableCell>
                  <TableCell align="center"sx={{fontFamily: "Georgia, serif"}}>{employee.name}</TableCell>
                  <TableCell align="center"sx={{fontFamily: "Georgia, serif"}}>{employee.dob}</TableCell>
                  <TableCell align="center"sx={{fontFamily: "Georgia, serif"}}>{employee.department}</TableCell>
                  <TableCell align="center"sx={{fontFamily: "Georgia, serif"}}>
                    <IconButton onClick={() => handleView(employee)}><VisibilityIcon color="action" /></IconButton>
                    <IconButton onClick={() => handleEdit(employee)}><EditIcon color="success" /></IconButton>
                    <IconButton onClick={() => handleDelete(employee.id)}><DeleteIcon color="error" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center', fontWeight: "bold", fontSize: "1.5rem" }}>{isAdd ? "Add Employee" : isEdit ? "Edit Employee" : "Employee Details"}</DialogTitle>
        <DialogContent>{isEdit || isAdd ? (
            <>
              <TextField label="Name"fullWidth margin="normal"value={selectedEmployee?.name || ""}onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}/>
              <TextField label="Date of Birth"type="date"fullWidth margin="normal"InputLabelProps={{ shrink: true }}value={selectedEmployee?.dob || ""}onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dob: e.target.value })}/>
              <TextField label="Department"fullWidth margin="normal"value={selectedEmployee?.department || ""}onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}/>
            </>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}><Box component="span" fontWeight="fontWeightBold">Name:</Box> {selectedEmployee?.name}</Typography>
              <Typography variant="h6" sx={{ mb: 2 }}><Box component="span" fontWeight="fontWeightBold">Date of Birth:</Box> {selectedEmployee?.dob}</Typography>
              <Typography variant="h6" sx={{ mb: 2 }}><Box component="span" fontWeight="fontWeightBold">Department:</Box> {selectedEmployee?.department}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ backgroundColor: "grey.500", color: "white", '&:hover': { backgroundColor: 'grey.600' }}}>Close</Button>
          {(isEdit || isAdd) && (
            <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#EC155B", '&:hover': { backgroundColor: '#c51162' }}}>{isEdit ? "Update" : "Save"}</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeeTable;