// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Card, Container, Dialog, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ScaleIcon from '@mui/icons-material/Scale';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';


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
      return <MaleIcon fontSize="large" />;
    } else {
      return <FemaleIcon fontSize="large" />;
    }
  };



  return (
    <>
      {/* Yksittäinen logi listalla */}
      <Card sx={{ m: 1, mr: 0, p: 2, display: 'grid', gridTemplateColumns: '40px 3fr 2fr 30px' }} elevation={6}
      >
        <Tooltip title={log.badge}>
          <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
        </Tooltip>
        <Typography onClick={handleOpen} variant="h5">
          {log.animal}
        </Typography>

        <Typography variant="h6">
          {log.rating}
        </Typography>
        <ThumbUpOffAltIcon onClick={(e) => console.log(e)} />
      </Card>

      {/* Yksittäisen login näkymä avatessa */}
      <Dialog onClose={handleClose} open={singleLogDialogOpen}>
        <Card sx={{ padding: 3 }} >
          <Container disableGutters sx={{ display: 'grid', gridTemplateColumns: '1fr 35px 30px' }}>
            <Typography variant="h4">{log.animal}</Typography>
            <Tooltip title={log.gender}>
              {genderIcon()}
            </Tooltip>
            <Tooltip title={log.badge}>
              <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
            </Tooltip>
          </Container>
          <img src={imageUrl} alt="" width="100%" />
          <Container disableGutters sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            <Tooltip title="Trophy rating">
              <Typography variant="h6">
                <EmojiEventsIcon /> {log.rating}
              </Typography>
            </Tooltip>
            <Tooltip title="Weight">
              <Typography variant="h6">
                <ScaleIcon /> {log.weight}kg
              </Typography>
            </Tooltip>
            <Tooltip title="Fur type">
              <Typography variant="h6">
                <CategoryIcon /> {log.furtype}
              </Typography>
            </Tooltip>
            <Tooltip title="Distance tracked">
              <Typography variant="h6">
                <PetsIcon /> {log.distance}m
              </Typography>
            </Tooltip>

            <Tooltip title="Weapon">
              <Typography variant="h6">
                <PetsIcon /> {log.weapon} ({log.weapontype})
              </Typography>
            </Tooltip>
            <Tooltip title="Ammo">
              <Typography variant="h6">
                <PetsIcon /> {log.ammo}
              </Typography>
            </Tooltip>
            <Tooltip title="Shot distance">
              <Typography variant="h6">
                <PetsIcon /> {log.shotdistance}m
              </Typography>
            </Tooltip>

            <Tooltip title="Notes">
              <Typography sx={{ gridColumn: 'span 4' }}>
                <ArticleIcon /> {log.notes}
              </Typography>
            </Tooltip>
          </Container>

        </Card>

      </Dialog>
    </>
  );
}

export default SingleLog;
