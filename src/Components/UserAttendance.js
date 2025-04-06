import { Container, Typography, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid2,Box,Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTime } from "../Shared/Constant";

const data = [
  { id: 1, name: "Agalya", date: "2024-03-19", role: "Developer", startTime: "12:00 AM", endTime: "05:00 PM", totalHours: 5 },
  { id: 2, name: "Priya", date: "2024-03-19", role: "Designer", startTime: "10:00 AM", endTime: "06:00 PM", totalHours: 8 },
  { id: 3, name: "Vino", date: "2024-03-19", role: "Designer", startTime: "11:00 AM", endTime: "06:00 PM", totalHours: 7 },
];

const UserAttendance = () => {

  const currentTime = useTime();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ paddingBotton:"20px"}}>
        <Button variant="contained">
          Agalya Muruganantham 
        </Button>
        <Button variant="contained" color="success"  startIcon={<AccessTimeIcon/>}>
          {currentTime.toLocaleTimeString()}
        </Button>
      </Box>

        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <MuiTable>
              <TableHead sx={{ backgroundColor: "#f5f5f5"}}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center"  }}>S/No</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center"  }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center"  }}>Start Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center"  }}>End Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center"  }}>Total Hours</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center"  }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{textAlign:"center" }}>{index + 1}</TableCell>  
                    <TableCell sx={{textAlign:"center" }}>{row.date}</TableCell>
                    <TableCell sx={{textAlign:"center" }}>{row.startTime}</TableCell>
                    <TableCell sx={{textAlign:"center" }}>{row.endTime}</TableCell>
                    <TableCell sx={{textAlign:"center" }}>{row.totalHours}h</TableCell>
                    <TableCell sx={{textAlign:"center" }}>
                      <IconButton color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </Grid2>
     </Container>
  );
};

export default UserAttendance;
