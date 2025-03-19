import { AppBar, Toolbar, Typography, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TimerIcon from '@mui/icons-material/Timer';
import { useTime } from "../Shared/CurrentTime";
import Rating from "@mui/material/Rating";  

const data = [
  { id: 1, name: "Agalya", date: "2024-03-19", role: "Developer", startTime: "12:00 AM", endTime: "05:00 PM", totalHours: 5 },
  { id: 2, name: "Priya", date: "2024-03-19", role: "Designer", startTime: "10:00 AM", endTime: "06:00 PM", totalHours: 8 },
  { id: 3, name: "Vino", date: "2024-03-19", role: "Designer", startTime: "11:00 AM", endTime: "06:00 PM", totalHours: 7 },

];

// Function to calculate rating based on totalHours
const getRating = (hours) => {
  if (hours >= 8) return 5;
  if (hours >= 6) return 4;
  if (hours >= 4) return 3;
  if (hours >= 2) return 2;
  return 1;
};

const EmployeeTable = () => {
  const currentTime = useTime();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Agalya Muruganantham | Frontend Developer</Typography>
          <Typography> <TimerIcon /> {currentTime.toLocaleTimeString()}</Typography>
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={2} sx={{ p: 3 }}>
      <Grid2 size={12}>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <MuiTable>
          <TableHead sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <TableRow>
              <TableCell>S/No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell>{row.totalHours}h</TableCell>
                <TableCell>
                  <Rating name="half-rating-read" value={getRating(row.totalHours)} precision={0.5} readOnly />
                </TableCell>
                <TableCell>
                  <IconButton color="error"><DeleteIcon /></IconButton>
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
