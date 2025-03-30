import React, { useState, useEffect } from "react";
import {
  IconButton, Table, TableBody, TableCell, Container, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Typography, InputAdornment, Grid2,
  useMediaQuery, useTheme, Box, Card, CardContent, CardActions
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

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
    if (storedEmployees) {
      setEmployees(storedEmployees);
    } else {
      const defaultEmployees = [
        { id: 1, name: "Bavya", dob: "2003-05-12", department: "Frontend Developer" },
        { id: 2, name: "DhivyaBharathi", dob: "2002-11-14", department: "Backend Developer" },
        { id: 3, name: "Rajapriya", dob: "2002-12-14", department: "Frontend Developer" },
        { id: 4, name: "Keerthana", dob: "2002-04-06", department: "Frontend Developer" },
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex',justifyContent:"space-between", flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
       <TextField
          fullWidth
          label="Search Employees"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            fontFamily: "Georgia, serif",
            "& label": { fontFamily: "Georgia, serif" },
            "& input": { fontFamily: "Georgia, serif" },
            maxWidth: isMobile ? '100%' : '250px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          size="small"
        />
        <Button
          variant="contained"
          sx={{ 
            backgroundColor: "#EC155B", 
            color: "white", 
            fontFamily: "Georgia, serif",
            minWidth: isMobile ? '100%' : '200px',
           
          }}
          onClick={handleAddEmployee}
        >
          Add New Employee
        </Button>
      </Box>

      {isMobile ? (
        <Grid2 container spacing={2} sx={{justifyContent:"center"}}>
          {filteredEmployees.map((employee) => (
            <Grid2 item xs={12} sx={{width:"100%" }} key={employee.id}>
              <Card elevation={3} sx={{ borderRadius: 2}}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={styles}>
                    {employee.name}
                  </Typography>
                  <Typography color="text.secondary" sx={styles}>
                    {employee.department}
                  </Typography>
                  <Typography sx={{ mt: 1, ...styles }}>
                    DOB: {employee.dob}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handleView(employee)} sx={styles}>
                    <VisibilityIcon color="action" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(employee)} sx={styles}>
                    <EditIcon color="success" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)} sx={styles}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
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
                <TableRow key={employee.id} hover>
                  <TableCell align="center" sx={styles}>{index + 1}</TableCell>
                  <TableCell align="center" sx={styles}>{employee.name}</TableCell>
                  <TableCell align="center" sx={styles}>{employee.dob}</TableCell>
                  <TableCell align="center" sx={styles}>{employee.department}</TableCell>
                  <TableCell align="center">
                    <IconButton sx={styles} onClick={() => handleView(employee)}>
                      <VisibilityIcon color="action" />
                    </IconButton>
                    <IconButton sx={{ margin: "0 5px", ...styles }} onClick={() => handleEdit(employee)}>
                      <EditIcon color="success" />
                    </IconButton>
                    <IconButton sx={styles} onClick={() => handleDelete(employee.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
  <DialogTitle sx={{ 
    ...styles, 
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: "1.5rem"
  }}>
    {isAdd ? "Add Employee" : isEdit ? "Edit Employee" : "Employee Details"}
  </DialogTitle>
  <DialogContent>
    {isEdit || isAdd ? (
      <>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={selectedEmployee?.name || ""}
          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
          sx={styles}
        />
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={selectedEmployee?.dob || ""}
          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dob: e.target.value })}
          sx={styles}
        />
        <TextField
          label="Department"
          fullWidth
          margin="normal"
          value={selectedEmployee?.department || ""}
          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
          sx={styles}
        />
      </>
    ) : (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, ...styles }}>
          <Box component="span" fontWeight="fontWeightBold">Name:</Box> {selectedEmployee?.name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, ...styles }}>
          <Box component="span" fontWeight="fontWeightBold">Date of Birth:</Box> {selectedEmployee?.dob}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, ...styles }}>
          <Box component="span" fontWeight="fontWeightBold">Department:</Box> {selectedEmployee?.department}
        </Typography>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button 
      onClick={handleClose} 
      sx={{ 
        backgroundColor: "grey.500", 
        color: "white", 
        '&:hover': { backgroundColor: 'grey.600' },
        ...styles 
      }}
    >
      Close
    </Button>
    {(isEdit || isAdd) && (
      <Button 
        onClick={handleSave} 
        variant="contained" 
        sx={{ 
          backgroundColor: "#EC155B", 
          '&:hover': { backgroundColor: '#c51162' },
          ...styles 
        }}
      >
        {isEdit ? "Update" : "Save"}
      </Button>
    )}
  </DialogActions>
</Dialog>
    </Container>
  );
};

export default EmployeeTable;