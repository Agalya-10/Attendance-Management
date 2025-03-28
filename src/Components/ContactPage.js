import React from "react";
import { Box, Paper, Typography, Button, Link } from "@mui/material";
import ebrainLogo from "../Assets/ebrain_image.png"; 

const ContactPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" p={5} >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", maxWidth: 500 }}>
      <Box><img src={ebrainLogo} alt="EBrain Technologies Logo" style={{ width: "150px" }} /></Box>
        <Typography variant="body1" sx={{p:1,fontWeight:"bold", fontFamily: "Georgia, serif"}} color="textSecondary">#4/1223, Subramaniyapuram,By Pass Road,Orathanadu,Thanjavur - 613 005,Tamilnadu ,India</Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom sx={{ fontFamily: "Georgia, serif" }}>
          Website:{" "}
          <Link href="https://ebraintechnologies.com/" target="_blank" rel="noopener noreferrer">ebraintechnologies.com</Link>
        </Typography>
        <Typography variant="body1"pt={1}  color="textSecondary"sx={{ fontFamily: "Georgia, serif" }}>
          Email:{" "}
          <Link href="mailto:support@ebraintechnologies.com">support@ebraintechnologies.com</Link> ,{" "}
          <Link href="mailto:interact@ebraintechnologies.com">interact@ebraintechnologies.com</Link>
        </Typography>
        <Typography variant="body1" pt={1} color="textSecondary" gutterBottom sx={{ fontFamily: "Georgia, serif" }}>Phone: +91 99440 07339</Typography>
        <Button variant="contained"  sx={{ backgroundColor: "#EC155B", color: "white",mt:2}} href="https://www.google.com/maps/@10.6329891,79.2481621,3a,75y,54.77h,90t/data=!3m7!1e1!3m5!1s-otKpgftU7lRF8K3b3fTTg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3D-otKpgftU7lRF8K3b3fTTg%26yaw%3D54.774677!7i13312!8i6656!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D"target="_blank"rel="noopener noreferrer">View on Map</Button>
      </Paper>
    </Box>
  );
};
export default ContactPage;
