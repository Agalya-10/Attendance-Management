import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid2, useMediaQuery, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TABLE_HEADERS } from "./Constant";

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
const StatusBox = ({ status }) => (
    <Typography fontFamily="Georgia, serif" color={status === "Present" ? "green" : status === "Absent" ? "error.main" : "text.secondary" }>
      {status || "Not Marked"}
    </Typography>
  );
const TimeBox = ({ elapsedTime }) => (
  <Box display="flex" alignItems="center">
    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
    <Typography color="primary">{formatTime(elapsedTime || 0)}</Typography>
  </Box>
);
const AttendanceTable = ({ records }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Grid2 container spacing={2}>
      {records.map((emp, idx) => (
        <Grid2  item  size={{ xs: 12, md: 6 }} key={idx}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: 'Georgia, serif' }}>{idx + 1}. {emp.name}</Typography>
            <Typography color="text.secondary" sx={{ fontFamily: 'Georgia, serif' }}>{emp.department}</Typography>
            <Box display="flex" alignItems="center" mt={1} mb={1} flexWrap="wrap" gap={1} justifyContent="space-between">
              <StatusBox status={emp.status} />
              <TimeBox elapsedTime={emp.timer?.elapsedTime} />
            </Box>
            <Typography sx={{ fontFamily: 'Georgia, serif' }}>
              Timer: <Typography component="span" color={emp.timer?.isRunning ? "primary" : "textSecondary"} fontWeight={emp.timer?.isRunning ? "bold" : "normal"}>{emp.timer?.isRunning ? "Running" : "Stopped"}</Typography>
            </Typography>
          </Paper>
        </Grid2>
      ))}
    </Grid2>) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: "#EC155B" }}>
          <TableRow>{TABLE_HEADERS.map((header, index) => <TableCell key={index} sx={{ color: "white", fontWeight: "bold", fontFamily: "Georgia, serif" }}>{header}</TableCell>)}</TableRow>
        </TableHead>
        <TableBody>
          {records.map(({ name, department, status, timer }, idx) => (
            <TableRow key={idx} hover>
              {[idx + 1, name, department, <StatusBox status={status} />, <TimeBox elapsedTime={timer?.elapsedTime} />, 
                <Typography sx={{ fontFamily: "Georgia, serif" }} color={timer?.isRunning ? "primary" : "textSecondary"} fontWeight={timer?.isRunning ? "bold" : "normal"}>{timer?.isRunning ? "Running" : "Stopped"}</Typography>
              ].map((content, i) => <TableCell key={i} sx={{ fontFamily: "Georgia, serif" }}>{content}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AttendanceTable;