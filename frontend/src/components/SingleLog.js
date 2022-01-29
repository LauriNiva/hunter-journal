// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Paper, Typography } from '@mui/material';
import React from 'react';

function SingleLog({ log }) {

  const imageUrl = `https://res.cloudinary.com/devniva/image/upload/v1636547210/${log.images}`;

  return (
    <Paper elevation={6}>
      <Typography>{log.animal}</Typography>
      <img src={imageUrl} width="300" />
    </Paper>
  );
}

export default SingleLog;
