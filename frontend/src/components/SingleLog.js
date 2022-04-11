// Yksittäisen login komponentti etusivulle
// Logi saadaan Logs komponentilta

import { Card, Container, Dialog, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import logsService from '../services/logs.js'
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'mui-image';
import EditLogForm from './EditLogForm';


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
import usersService from '../services/user.js';


function SingleLog({ log, setLogs, dataToShow, likedLogs, setLikedLogs }) {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();


  const [singleLogDialogOpen, setSingleLogDialogOpen] = useState(false);
  const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState();

  const [chosenImage, setChosenImage] = useState(0)

  const date = new Date(log.createdAt).toLocaleDateString();

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



  const imageUrl = `https://res.cloudinary.com/devniva/image/upload/v1636547210/`;

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
      return <MaleIcon  sx={{ fontSize: { xs: 25 , sm: 40} }} />;
    } else {
      return <FemaleIcon sx={{ fontSize: { xs: 25 , sm: 40} }} />;
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

    const handleHighlightClick = async (event) => {
      if(window.confirm("Highlight this log on your userpage?")){
        try {
          const token = await getAccessTokenSilently();
          const highlightdata = await usersService.addHighlightedLog(log._id, token);
          console.log('highlightdata', highlightdata)
          handleMenuClose();
        } catch (error) {
          console.log(error)
        }
      }
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



    return (
      <>
        <IconButton id="editmenu-button" disableFocusRipple onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleHighlightClick} sx={{justifyContent:'center'}} >Highlight</MenuItem>
          <EditLogForm log={log} setLogs={setLogs} />
          <MenuItem onClick={handleDeleteClick} sx={{justifyContent:'center'}} >Delete</MenuItem>
        </Menu>
      </>
    )
  };

  const LikeButton = () => {
    return (
      <IconButton sx={{ p: { xs: 1, sm: 1 }, "&.MuiButtonBase-root:hover": { bgcolor: "transparent" } }}
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
      dataToReturn = date;
    } else if (dataToShow === 'user') {
      dataToReturn = log.user.username;
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
        display: 'grid', gridTemplateColumns: { xs: '40px 5fr 25px 2fr 40px' },
        gridTemplateRows: { xs: '1fr' }
      }} elevation={6} >
        <Tooltip title={log.badge}>
          <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
        </Tooltip>
        <Typography onClick={handleOpen} variant="h5"
          sx={{
            overflow: 'hidden', whiteSpace: 'nowrap',
            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' }
          }}>
          {log.animal}
        </Typography>
        <Box onClick={handleOpen}>
          {log.notes && <HistoryEduIcon sx={{ fontSize: { xs: "15px", sm: "20px" }, opacity: "50%" }} />}

        </Box>

        <Typography onClick={handleOpen} variant="h6"
          sx={{ justifySelf: (dataToShow === 'likes') ? 'end' : 'center', fontSize: { xs: '0.9rem', sm: '1.2rem', lg: '1.5rem' } }}>
          {showData()}
        </Typography>
        <LikeButton />
      </Card>

      {/* ----Yksittäisen login näkymä avatessa---- */}
      <Dialog onClose={handleClose} open={singleLogDialogOpen} scroll={'body'} maxWidth="lg">
        <Card sx={{ padding: 3 }} >
          <Container disableGutters sx={{
            mb: 2, alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: { xs: "1fr max-content max-content", md: "6fr 1fr 80px max-content" },
            gridTemplateRows: { xs: "1fr 1fr", md: "1fr 1fr" },
            gridTemplateAreas: {
              xs:
                `"user  likes settings"
                "animal  rating settings"
                    `,
              md:
                `"user rating likes settings"
                "animal rating likes settings"
                `
            }
          }}>
            <Box sx={{ gridArea: 'user' }} >
              {isAuthenticated ? <Typography onClick={() => window.open(`${window.location.origin}/logs/${log.user.username}`, '_blank')}
                variant="h7">{log.user.username}<OpenInNewIcon sx={{ fontSize: 12 }} /> - {date} </Typography>
                : <Typography variant="h7">{log.user.username} - {date}</Typography>}
            </Box>

            <Box sx={{ gridArea: 'animal', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Typography variant="h3" sx={{fontSize: { xs: 20, sm: 35 }}}>
                {log.animal}
              </Typography>
                <Tooltip title={log.gender}>
                  {genderIcon()}
                </Tooltip>
            </Box>

            <Box sx={{ gridArea: 'rating', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              <Tooltip title={log.badge}>
                <MilitaryTechIcon fontSize="large" sx={{ color: logBadgeColor }} />
              </Tooltip>
              <Tooltip title="Trophy rating">
                <Typography variant="h6">
                  {log.rating}
                </Typography>
              </Tooltip>
            </Box>

            <Box sx={{ gridArea: 'likes', display: 'flex', flexDirection: { xs: 'row', sm: 'row' },
            justifyContent: {xs:'start', sm: 'center'}, alignItems: 'center'
            }}>
              <LikeButton />
              <Typography variant="h6">{likes}</Typography>
            </Box>
            <Box sx={{ gridArea: 'settings' }}>
              {setLogs && <EditMenu />}
            </Box>

          </Container>

          <Image onClick={() => setFullScreenDialogOpen(true)} src={imageUrl + log.images[chosenImage]} showLoading sx={{}} />

          <Dialog fullWidth maxWidth={'xl'} open={fullScreenDialogOpen} onClose={() => setFullScreenDialogOpen(false)} >
            <Image onClick={() => setFullScreenDialogOpen(false)}
              src={imageUrl + log.images[chosenImage]} duration={0} />
          </Dialog>

          <Container disableGutters sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {log.images.map((img, index) =>
              <Image key={img} onClick={() => setChosenImage(index)} src={imageUrl + img} width='150px' />
            )}
          </Container>

          <Container disableGutters sx={{ mt: 2, display: 'grid', gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
          gap: '10px' }}>

            <Tooltip title="Weight">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <ScaleIcon /> {log.weight}kg
              </Typography>
            </Tooltip>

            <Tooltip title="Weapon">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <RadarIcon /> {log.weapon} ({log.weapontype})
              </Typography>
            </Tooltip>

            <Tooltip title="Fur type">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <CategoryIcon /> {log.furtype}
              </Typography>
            </Tooltip>

            <Tooltip title="Ammo">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <RadarIcon /> {log.ammo}
              </Typography>
            </Tooltip>

            <Tooltip title="Distance tracked">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <PetsIcon /> {log.distance}m tracked
              </Typography>
            </Tooltip>

            <Tooltip title="Shot distance">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <RadarIcon /> {log.shotdistance}m
              </Typography>
            </Tooltip>

            <Tooltip title="Difficulty">
              <Typography sx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <StarHalfIcon /> {log.difficulty}
              </Typography>
            </Tooltip>

            <Tooltip title="Reserve">
              <Typography vsx={{ fontSize:{ xs: 15, sm: 20 } }}>
                <ForestIcon /> {log.reserve}
              </Typography>
            </Tooltip>

            <Tooltip title="Notes">
              <Typography sx={{ gridColumn: {sm: 'span 2'}, fontSize:{ xs: 15, sm: 20 } }}>
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
