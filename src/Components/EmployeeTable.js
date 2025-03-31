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