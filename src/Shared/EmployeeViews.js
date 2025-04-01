import { Grid2, Paper, Typography, Box, Button, Tooltip, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { table_Headers,cellStyles } from "../Shared/Constant";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EmployeeViews = {
  Mobile: ({ attendance, withinRadius, onStatusChange, onTimerAction }) => (
    <Grid2 container spacing={2}>
      {attendance.map((emp, index) => (
        <Grid2 item  size={{ xs: 12, md: 6 }} key={emp.id}>
          <Paper elevation={3} sx={{ p: 2}}>
            <Typography variant="subtitle1" fontWeight="bold" fontFamily="Georgia, serif" sx={{ mb: 1 }}>{index + 1}. {emp.name}</Typography>
            <Typography fontFamily="Georgia, serif" color="text.secondary" sx={{ mb: 1 }}>{emp.department}</Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography fontFamily="Georgia, serif">Status: {emp.status === "Present" ? (
               <Typography component="span" color="green" fontWeight="bold">Active</Typography>) : emp.status === "Absent" ? (
                <Typography component="span" color="error" fontWeight="bold">Inactive</Typography>
                ) : (<Typography component="span" color="textSecondary">--</Typography>)}
              </Typography>
              <Box display="flex" alignItems="center">
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography fontFamily="Georgia, serif">
                  {formatTime(emp.timer?.elapsedTime || 0)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" gap={1} justifyContent="space-between">
              <Button variant={emp.status === "Present" ? "contained" : "outlined"} color="success" onClick={() => onStatusChange(index, "Present")}size="small" sx={{ fontFamily: 'Georgia, serif', flex: 1 }}> Present</Button>
              <Button variant={emp.status === "Absent" ? "contained" : "outlined"}color="error"onClick={() => onStatusChange(index, "Absent")}size="small"sx={{ fontFamily: 'Georgia, serif', flex: 1 }}>Absent</Button>
              <Tooltip title={emp.status !== "Present" ? "Mark as Present to enable timer" :!withinRadius ? "You must be within office to start timer" :emp.timer?.isRunning ? "Stop Timer" : "Start Timer"}>
                <span style={{ flex: 1 }}><Button variant={emp.timer?.isRunning ? "contained" : "outlined"}color={emp.timer?.isRunning ? "error" : "primary"}onClick={() => onTimerAction(index)}size="small"disabled={emp.status !== "Present" || !withinRadius}sx={{ fontFamily: 'Georgia, serif', width: '100%' }}>{emp.timer?.isRunning ? "Stop" : "Start"}</Button></span>
              </Tooltip>
            </Box>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  ),
  Desktop: ({ attendance, withinRadius, onStatusChange, onTimerAction }) => (
    <TableContainer component={Paper} sx={{ width: { xs: '100%', sm: 'auto' }}}>
      <Table>
      <TableHead sx={{ bgcolor: "#EC155B" }}>
      <TableRow>{table_Headers.map((header) => (<TableCell key={header} sx={cellStyles}>{header}</TableCell>))}</TableRow>
     </TableHead>
        <TableBody>
          {attendance.map((emp, index) => (
            <TableRow key={emp.id} hover>
              <TableCell sx={{ textAlign: "center", fontFamily: 'Georgia, serif' }}>{index + 1}</TableCell>
              <TableCell sx={{ textAlign: "center", fontFamily: 'Georgia, serif' }}>{emp.name}</TableCell>
              <TableCell sx={{ textAlign: "center", fontFamily: 'Georgia, serif' }}>{emp.department}</TableCell>
              <TableCell sx={{ textAlign: "center", fontFamily: 'Georgia, serif' }}>
                {emp.status === "Present" ? (
                  <Typography color="green" fontWeight="bold">Active</Typography>
                ) : emp.status === "Absent" ? (
                  <Typography color="error" fontWeight="bold">Inactive</Typography>
                ) : (
                  <Typography color="textSecondary">--</Typography>
                )}
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontFamily: 'Georgia, serif'}}><Box display="flex" alignItems="center" justifyContent="center"><AccessTimeIcon sx={{ mr: 1 }} />{formatTime(emp.timer?.elapsedTime || 0)}</Box></TableCell>
              <TableCell sx={{ textAlign: "center", fontFamily: 'Georgia, serif' }}>
                <Box display="flex" gap={1} justifyContent="center">
                  <Button variant={emp.status === "Present" ? "contained" : "outlined"}color="success" onClick={() => onStatusChange(index, "Present")}size="small">Present</Button>
                  <Button variant={emp.status === "Absent" ? "contained" : "outlined"}color="error" onClick={() => onStatusChange(index, "Absent")}size="small">Absent</Button>
                  <Tooltip title={emp.status !== "Present" ? "Mark as Present to enable timer" :!withinRadius ? "You must be within office to start timer" :emp.timer?.isRunning ? "Stop Timer" : "Start Timer"}>
                    <span><Button variant={emp.timer?.isRunning ? "contained" : "outlined"}color={emp.timer?.isRunning ? "error" : "primary"}onClick={() => onTimerAction(index)}size="small"disabled={emp.status !== "Present" || !withinRadius}>{emp.timer?.isRunning ? "Stop" : "Start"}</Button></span>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};
export default EmployeeViews;
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}