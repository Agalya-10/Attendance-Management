import React from "react";
import { Box, Paper, Typography, Button, Link } from "@mui/material";
import ebrainLogo from "../Assets/ebrain_image.png"; 

const SettingsPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" p={5}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", maxWidth: 500 }}>
      <Box><img src={ebrainLogo} alt="EBrain Technologies Logo" style={{ width: "150px" }} /></Box>
        <Typography variant="body1" sx={{p:1,fontWeight:"bold"}} color="textSecondary">#15, II Floor, R.B.S Complex, Karups Nagar, Trichy Main Road, Thanjavur - 613 005, Tamilnadu, India</Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Website:{" "}
          <Link href="https://ebraintechnologies.com/" target="_blank" rel="noopener noreferrer">ebraintechnologies.com</Link>
        </Typography>

        <Typography variant="body1" color="textSecondary">
          Email:{" "}
          <Link href="mailto:support@ebraintechnologies.com">support@ebraintechnologies.com</Link> ,{" "}
          <Link href="mailto:interact@ebraintechnologies.com">interact@ebraintechnologies.com</Link>
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>Phone: +91 99440 07339</Typography>
        <Button variant="contained"  sx={{ backgroundColor: "#EC155B", color: "white"}} href="https://www.google.com/maps/place/Ebrain+Technologies/@10.7445993,79.1102501,3a,75y,315.66h,90t/data=!3m7!1e1!3m5!1sjO1QGayCwn9ZbADrQkwdLg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DjO1QGayCwn9ZbADrQkwdLg%26yaw%3D315.6629!7i13312!8i6656!4m7!3m6!1s0x3baabf3100000013:0x171548ed9ba9a65f!8m2!3d10.7447459!4d79.1100985!10e5!16s%2Fg%2F11f332b5x8!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"target="_blank"rel="noopener noreferrer">View on Map</Button>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
