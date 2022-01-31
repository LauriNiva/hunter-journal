// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Paper, Typography } from '@mui/material';
import React from 'react';

function SingleLog({ log }) {


  const imageUrl = `https://res.cloudinary.com/devniva/image/upload/v1636547210/${log.images[0]}`;

  const badgeColors = {
    'None': '#000000',
    'Bronze': '#824A02',
    'Silver': '#A7A7AD',
    'Gold': '#FEE101',
    'Diamond': '#B9F2FF',
    'Great One': '#B9F2FF'
  };

  const logBadgeColor = badgeColors[log.badge];



  return (
    <Paper sx={{ margin: 2, padding: 2 }} elevation={6}>
      <Typography variant="h4">{log.animal}</Typography>
      <Typography sx={{color: logBadgeColor}} variant="h5">{log.rating}</Typography>
    </Paper>
  );
}

export default SingleLog;
