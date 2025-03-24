import React from 'react';
import { Typography } from '@mui/material';

function TypographyLabel({ label }) {
    return (
        <Typography variant="h5" sx={{ marginBottom: '10px', fontWeight: "bold" }}>{label}</Typography>
    )
}

export default TypographyLabel;