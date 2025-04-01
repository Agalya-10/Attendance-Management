import { Box, Typography, Button } from "@mui/material";

const SummaryHeader = ({ attendance, withinRadius, isMobile, onSave }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexDirection={isMobile ? "column" : "row"} gap={2}>
    <Box textAlign={isMobile ? "center" : "left"}>
      <Typography fontFamily="Georgia, serif" fontWeight="bold">Present: {attendance.filter(e => e.status === "Present").length}</Typography>
      <Typography fontFamily="Georgia, serif" fontWeight="bold">Absent: {attendance.filter(e => e.status === "Absent").length}</Typography>
      <Typography fontFamily="Georgia, serif" fontWeight="bold" color={withinRadius ? "green" : "error"}>Location: {withinRadius ? "Within office (200m)" : "Outside office"}</Typography>
    </Box>
    <Button variant="contained" sx={{backgroundColor: "#EC155B", fontFamily: 'Georgia, serif',width: isMobile ? '100%' : 'auto'}} onClick={onSave}>Attendance Report</Button>
  </Box>
);
export default SummaryHeader;