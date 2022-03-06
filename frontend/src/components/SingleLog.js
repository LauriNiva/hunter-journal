// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Card, Container, Dialog, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import logsService from '../services/logs.js'
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'mui-image';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ScaleIcon from '@mui/icons-material/Scale';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RadarIcon from '@mui/icons-material/Radar';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ForestIcon from '@mui/icons-material/Forest';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import { Box } from '@mui/system';


function SingleLog({ log, setLogs, dataToShow, likedLogs, setLikedLogs }) {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();


  const [singleLogDialogOpen, setSingleLogDialogOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState();

  useEffect(() => {
    setLikes(log.likes.length)
  }, [log.likes.length]);

  useEffect(() => {
    if (likedLogs.includes(log._id)) {
      setLiked(true)
    }
  }, [likedLogs, setLiked, log._id]);

  const handleOpen = (e) => {
    setSingleLogDialogOpen(true);
  };

  const handleClose = () => {
    setSingleLogDialogOpen(false);
  };

  const handleLikeClick = async () => {
    const token = await getAccessTokenSilently();
    if (!liked) {
      try {
        const updatedlog = await logsService.likeALog(log._id, token);
        console.log('updatedlog', updatedlog)
        if (!likedLogs.includes(updatedlog.id)) {
          setLikedLogs(likedLogs.concat(updatedlog.id))
          setLiked(true)
          setLikes(updatedlog.numberOfLikes)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const updatedlog = await logsService.dislikeALog(log._id, token);
        console.log('updatedlog', updatedlog)
        if (likedLogs.includes(updatedlog.id)) {
          setLikedLogs(likedLogs.filter(log => log !== updatedlog.id))
          setLiked(false)
          setLikes(updatedlog.numberOfLikes)
        }
      } catch (error) {
        console.log(error)
      }
    }
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
    const [anchorEl, setAnchorEl] = useState(null);
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

  const LikeButton = () => {
    return (
      <IconButton sx={{ p: 0, "&.MuiButtonBase-root:hover": { bgcolor: "transparent" } }}
        id="likeButton" onClick={handleLikeClick} disabled={!isAuthenticated} >
        {liked ? <ThumbUpAltIcon id="likeButton" /> : <ThumbUpOffAltIcon id="likeButton" />}
      </IconButton>
    )
  }

  const showData = () => {
    let dataToReturn = '';

    if (dataToShow === 'likes') {
      dataToReturn = likes
    } else if (dataToShow === 'createdAt') {
      dataToReturn = new Date(log[dataToShow]).toLocaleDateString()
    }
    else {
      dataToReturn = log[dataToShow]
    }
    return dataToReturn;
  };


  return (
    <>
      {/* ----Yksittäinen logi listalla---- */}
      <Card sx={{
        m: 1, p: 2, alignItems: 'center',
        display: 'grid', gridTemplateColumns: {xs: '40px 5fr 25px 2fr 40px'},
        gridTemplateRows: { xs: '1fr'}
      }} elevation={6} >
        <Tooltip title={log.badge}>
          <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
        </Tooltip>
        <Typography onClick={handleOpen} variant="h5" 
        sx={{overflow: 'hidden',whiteSpace: 'nowrap',
        fontSize: { xs: '1.2rem', sm:'1.2rem',md:'1.4rem', lg: '1.6rem' }}}>
          {log.animal}
        </Typography>
        <Box>
          {log.notes && <HistoryEduIcon sx={{ fontSize: "20px", opacity: "50%" }} />}

        </Box>

        <Typography onClick={handleOpen} variant="h6"
          sx={{ justifySelf: (dataToShow === 'likes') ? 'end' : 'center', fontSize: { xs: '1rem', lg: '1.5rem' } }}>
          {showData()}
        </Typography>
        <LikeButton />
      </Card>

      {/* ----Yksittäisen login näkymä avatessa---- */}
      <Dialog onClose={handleClose} open={singleLogDialogOpen} scroll={'body'} maxWidth="lg">
        <Card sx={{ padding: 3 }} >
          <Container disableGutters sx={{
            mb: 2, alignItems: 'center',
            display: 'grid', gridTemplateColumns: '1fr 40px 50px 100px 20px'
          }}>
            <Box>
              {isAuthenticated ? <Typography onClick={() => window.open(`${window.location.origin}/logs/${log.user}`, '_blank')}
                variant="h7">{log.user}<OpenInNewIcon sx={{ fontSize: 15 }} /></Typography>
                : <Typography variant="h7">{log.user}</Typography>}
              <Typography variant="h4">
                {log.animal}
                <Tooltip title={log.gender}>
                  {genderIcon()}
                </Tooltip>
              </Typography>
            </Box>

            <Tooltip title={log.badge}>
              <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
            </Tooltip>

            <Tooltip title="Trophy rating">
              <Typography variant="h6">
                {log.rating}
              </Typography>
            </Tooltip>
            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'center'
            }}>
              <LikeButton />
              <Typography>{likes}</Typography>
            </Box>
            {setLogs && <EditMenu />}

          </Container>
          <Image src={imageUrl} showLoading sx={{}} />
          <Container disableGutters sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

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

            <Tooltip title="Reserve">
              <Typography variant="h6">
                <ForestIcon /> {log.reserve}
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
