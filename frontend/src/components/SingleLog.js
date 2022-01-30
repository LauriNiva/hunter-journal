// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Paper, Typography } from '@mui/material';
import React from 'react';

function SingleLog({ log }) {


  const imageUrl = `https://res.cloudinary.com/devniva/image/upload/v1636547210/${log.images[0]}`;

  const badgeColors = {'None': '#000000', 'Bronze': '#824A02', 'Silver': '#000000', 'Gold': '#000000', 'Diamond': '#000000', 'Great One': '#B9F2FF'}

  const badgeColor = badgeColors[log.badge];



  return (
    <Paper elevation={6}>
      <Typography variant="h4">{log.animal}</Typography>
      <Typography variant="h5">{log.rating}</Typography>
    </Paper>
  );
}

export default SingleLog;
