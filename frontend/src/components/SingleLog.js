// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Card, Typography } from '@mui/material';
import React from 'react';

function SingleLog({ log }) {


  //const imageUrl = `https://res.cloudinary.com/devniva/image/upload/v1636547210/${log.images[0]}`;

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
    <Card sx={{ margin: 1, padding: 2 }} elevation={6}>
      <Typography sx={{ display: 'inline', mr: 2 }} variant="h5">
        {log.animal}
      </Typography>
      <Typography sx={{ color: logBadgeColor, display: 'inline' }} variant="h5">
        {log.rating}
      </Typography>
    </Card>
  );
}

export default SingleLog;
