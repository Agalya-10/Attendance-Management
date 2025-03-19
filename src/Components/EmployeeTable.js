import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,Grid2
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const data = [
  { id: 1, name: "John Doe", date: "2024-03-19", role: "Developer", startTime: "09:00 AM", endTime: "05:00 PM", totalHours: "8h" },
  { id: 2, name: "Jane Smith", date: "2024-03-19", role: "Designer", startTime: "10:00 AM", endTime: "06:00 PM", totalHours: "8h" },
];

const EmployeeTable = () =>{
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Records
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={2} sx={{ p: 3 }}>
        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <MuiTable> 
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Total Hours</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>{row.endTime}</TableCell>
                    <TableCell>{row.totalHours}</TableCell>
                    <TableCell>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </Grid2>
      </Grid2>
      </>
  );
};

export default EmployeeTable;
