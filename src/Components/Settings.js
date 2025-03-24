Settings.js
import React from "react";
import { Box, Paper, Typography, Button,Grid2 } from "@mui/material";

const SettingsPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" p={3}>
      <Grid2 container justifyContent="center">
        <Grid2 item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
            {/* Logo */}
            <Box mb={2}>
              <img
                src="/logo.png" // Replace with actual logo path
                alt="EBrain Technologies Logo"
                style={{ width: "100px" }}
              />
            </Box>

            {/* Office Details */}
            <Typography variant="h5" gutterBottom>
              EBrain Technologies
            </Typography>
            <Typography variant="body1" color="textSecondary">
              123, Tech Park, Chennai, India
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Email: contact@ebrain.com
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Phone: +91 98765 43210
            </Typography>

            {/* Google Maps Link */}
            <Button
              variant="contained"
              color="primary"
              href="https://www.google.com/maps/place/EBrain+Technologies"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Map
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SettingsPage;
