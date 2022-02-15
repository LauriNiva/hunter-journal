// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Button, Card, Dialog, Typography } from '@mui/material';
import React, { useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

function SingleLog({ log }) {

  const [singleLogDialogOpen, setSingleLogDialogOpen] = useState(false);

  const handleOpen = () => {
    setSingleLogDialogOpen(true);
  };

  const handleClose = () => {
    setSingleLogDialogOpen(false);
  };


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

  const genderIcon = () => {
    if(log.gender==="Male") {
      return <MaleIcon/>;
    }else{
      return <FemaleIcon/>;
    }
  };



  return (
    <Card sx={{ margin: 1, padding: 2 }} elevation={6}>
      <Typography sx={{ display: 'inline', mr: 2 }} variant="h5">
        {log.animal}
      </Typography>
      <Typography sx={{ color: logBadgeColor, display: 'inline' }} variant="h5">
        {log.rating}
      </Typography>

      <Button onClick={handleOpen}>Open</Button>
      <Dialog onClose={handleClose} open={singleLogDialogOpen}>
        <Typography variant="h4">{log.animal}</Typography>
        {genderIcon()}
        <img src={imageUrl} alt=""/>
        <Typography>Rating: {log.rating}</Typography>
        <Typography>Weight: {log.weight}</Typography>
        <Typography>Fur: {log.furtype}</Typography>
        <Typography>Distance: {log.distance}</Typography>
        <Typography>Notes: {log.notes}</Typography>
        

      </Dialog>
    </Card>
  );
}

export default SingleLog;
