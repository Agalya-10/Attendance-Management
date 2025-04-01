import React from "react";
import { Grid2, Paper, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import { COMPONENT_LABEL } from "../Shared/Constant";
import TypographyLabel from "../Navbar/ComponentLabel";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const today = new Date().toISOString().split("T")[0];
  const storedLeaves = JSON.parse(localStorage.getItem(`leave_status_${today}`)) || {};
  const totalLeaves = Object.keys(storedLeaves).length;
  const approvedLeaves = Object.values(storedLeaves).filter(status => status === "Approved").length;
  const rejectedLeaves = Object.values(storedLeaves).filter(status => status === "Rejected").length;
  const pendingLeaves = totalLeaves - approvedLeaves - rejectedLeaves;

  return (
    <>
      <TypographyLabel label={COMPONENT_LABEL.LABEL_DASHBOARD} />
      <Box sx={{ px: isMobile ? 2 : 4, py: 3 }}>
        <Grid2 container spacing={2}>
          {[
            { title: "Total Employees", value: "19", icon: <PeopleIcon />, color: "#4CAF50" },
            { title: "Total Departments", value: "2", icon: <BusinessIcon />, color: "#FFC107" }
          ].map((item, index) => (
            <Grid2 item size= {{xs:12, sm:6, md:4, lg:3, key:index }}>
           
              <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, bgcolor: "white" }}>
                <Box sx={{ bgcolor: item.color, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}>
                  {React.cloneElement(item.icon, { sx: { color: "white", fontSize: 30 } })}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Georgia, serif" }}>{item.value}  </Typography>
                  <Typography sx={{ fontFamily: "Georgia, serif" }}>{item.title}</Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
        <Typography variant="h5" fontWeight="bold" mt={4} mb={4} sx={{ fontFamily: "Georgia, serif" }}> Leave Details  </Typography>
        <Grid2 container spacing={2} >
          {[
            { title: "Leave Applied", value: totalLeaves, icon: <EventNoteIcon />, color: "#26A69A" },
            { title: "Leave Approved", value: approvedLeaves, icon: <CheckCircleIcon />, color: "#4CAF50" },
            { title: "Leave Pending", value: pendingLeaves, icon: <HourglassEmptyIcon />, color: "#FFC107" },
            { title: "Leave Rejected", value: rejectedLeaves, icon: <CancelIcon />, color: "#F44336" }
          ].map((item, index) => (
            <Grid2 item size= {{xs:12, sm:6, md:4, lg:3, key:index }}>
              <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, bgcolor: "white" }}>
                <Box sx={{ bgcolor: item.color, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}>
                  {React.cloneElement(item.icon, { sx: { color: "white", fontSize: 30 } })}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Georgia, serif" }}> {item.value} </Typography>
                  <Typography sx={{ fontFamily: "Georgia, serif" }}>{item.title}</Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default Dashboard;
