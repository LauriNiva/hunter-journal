// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Card, Container, Dialog, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import logsService from '../services/logs.js'
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'mui-image';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ScaleIcon from '@mui/icons-material/Scale';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RadarIcon from '@mui/icons-material/Radar';
import StarHalfIcon from '@mui/icons-material/StarHalf';


function SingleLog({ log, setLogs }) {


  const [singleLogDialogOpen, setSingleLogDialogOpen] = useState(false);


  const handleOpen = (e) => {
    if(e.target.id !== 'likeButton') setSingleLogDialogOpen(true);
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

  const EditMenu = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDeleteClick = async () => {
      if (window.confirm('Are you sure you want to delete this log?')) {

        try {
          const token = await getAccessTokenSilently();
          await logsService.deleteALog(log._id, token);
          handleMenuClose();
          handleClose();
          setLogs(currentLogs => currentLogs.filter(currentLog => currentLog._id !== log._id))
        } catch (e) {
          console.log(e)
        }
      }

    };

    const handleEditClick = () => {
      console.log('edit')
    };

    return (
      <>
        <IconButton id="editmenu-button" disableFocusRipple onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        </Menu>
      </>
    )
  };



  return (
    <>
      {/* Yksittäinen logi listalla */}
      <Card sx={{ m: 1, mr: 0, p: 2, display: 'grid', gridTemplateColumns: '40px 3fr 1fr 20px' }} elevation={6}
        onClick={handleOpen}>
        <Tooltip title={log.badge}>
          <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
        </Tooltip>
        <Typography onClick={handleOpen} variant="h5">
          {log.animal}
        </Typography>

        <Typography variant="h6">
          {log.rating}
        </Typography>
        <ThumbUpOffAltIcon id="likeButton" />
      </Card>

      {/* Yksittäisen login näkymä avatessa */}
      <Dialog onClose={handleClose} open={singleLogDialogOpen}>
        <Card sx={{ padding: 3 }} >
          <Container disableGutters sx={{ display: 'grid', gridTemplateColumns: '1fr 40px 50px 20px' }}>

            <Typography variant="h4">
              {log.animal}
              <Tooltip title={log.gender}>
                {genderIcon()}
              </Tooltip>
            </Typography>

            <Tooltip title={log.badge}>
              <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
            </Tooltip>

            <Tooltip title="Trophy rating">
              <Typography variant="h6">
                {log.rating}
              </Typography>
            </Tooltip>

            <EditMenu />

          </Container>
          <Image src={imageUrl} showLoading width="100%" />
          <Container disableGutters sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

            <Tooltip title="Weight">
              <Typography variant="h6">
                <ScaleIcon /> {log.weight}kg
              </Typography>
            </Tooltip>

            <Tooltip title="Weapon">
              <Typography variant="h6">
                <RadarIcon /> {log.weapon} ({log.weapontype})
              </Typography>
            </Tooltip>

            <Tooltip title="Fur type">
              <Typography variant="h6">
                <CategoryIcon /> {log.furtype}
              </Typography>
            </Tooltip>

            <Tooltip title="Ammo">
              <Typography variant="h6">
                <RadarIcon /> {log.ammo}
              </Typography>
            </Tooltip>

            <Tooltip title="Distance tracked">
              <Typography variant="h6">
                <PetsIcon /> {log.distance}m tracked
              </Typography>
            </Tooltip>

            <Tooltip title="Shot distance">
              <Typography variant="h6">
                <RadarIcon /> {log.shotdistance}m
              </Typography>
            </Tooltip>

            <Tooltip title="Difficulty">
              <Typography variant="h6">
                <StarHalfIcon /> {log.difficulty}
              </Typography>
            </Tooltip>

            <Tooltip title="Notes">
              <Typography sx={{ gridColumn: 'span 2' }}>
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
