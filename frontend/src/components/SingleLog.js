// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Card, Dialog, Typography } from '@mui/material';
import React, { useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ScaleIcon from '@mui/icons-material/Scale';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';


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
    if (log.gender === "Male") {
      return <MaleIcon />;
    } else {
      return <FemaleIcon />;
    }
  };



  return (
    <>
      <Card sx={{ margin: 1, padding: 2, display: 'grid', gridTemplateColumns: '3fr 2fr 30px' }} elevation={6}
        onClick={handleOpen}>
        <Typography sx={{ display: 'inline', mr: 2 }} variant="h5">
          {log.animal}
        </Typography>
        <Typography sx={{ color: logBadgeColor, display: 'inline' }} variant="h5">
          {log.rating}
        </Typography>
        <ThumbUpOffAltIcon />
      </Card>

      <Dialog onClose={handleClose} open={singleLogDialogOpen}>
        <Card sx={{ padding: 3 }} >
          <Typography variant="h4">{log.animal}</Typography>
          {genderIcon()}
          <img src={imageUrl} alt="" width="100%" />
          <Typography> <EmojiEventsIcon /> {log.rating}</Typography>
          <Typography> <ScaleIcon /> {log.weight}kg</Typography>
          <Typography> <CategoryIcon /> {log.furtype}</Typography>
          <Typography> <PetsIcon /> {log.distance}m</Typography>
          <Typography> <ArticleIcon /> {log.notes}</Typography>

        </Card>

      </Dialog>
    </>
  );
}

export default SingleLog;
