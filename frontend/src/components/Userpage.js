import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { Avatar, Button, Container, Typography, Paper, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usersService from '../services/user.js';
import SingleLog from './SingleLog.js';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dialog } from '@mui/material';
import { TextField } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogActions } from '@mui/material';



function Userpage({ myUsername, followedUsers, setFollowedUsers, likedLogs, setLikedLogs, setNewAvatar }) {

  const { username } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const isOwner = (myUsername === username);

  const [userpageData, setUserpageData] = useState({});
  const [followed, setFollowed] = useState(false);

  console.log('userpageData', userpageData)

  useEffect(() => {
    setFollowed(followedUsers.includes(username))
  }, [followedUsers, setFollowedUsers, username]);


  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      setUserpageData(await usersService.getUserpageData(username, token))
    }
    getData();
  }, [username, getAccessTokenSilently]);


  const handFollowClick = async () => {
    if (followed) {
      // setFollowed(false);
    } else {
      const token = await getAccessTokenSilently();
      const followedUser = await usersService.followAUser(username, token);
      setFollowedUsers(followedUsers.concat(followedUser))

      setFollowed(true);
    }
  }

  const newAvatar = async () => {
    const rngAvatar = Math.floor(Math.random() * 100)

    try {
      const token = await getAccessTokenSilently();
      const updatedAvatar = await usersService.updateAvatar({ avatar: rngAvatar }, token)
      const updatedUserpageData = { ...userpageData };
      updatedUserpageData.avatar = rngAvatar;
      setUserpageData(updatedUserpageData);
      setNewAvatar(updatedAvatar);
    } catch (error) {
      console.log(error)
    }
  };

  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const avatarMenuOpen = Boolean(avatarAnchorEl);

  const handleAvatarClick = (e) => {
    if (!isOwner) { return };
    setAvatarAnchorEl(e.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };

  const EditMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [highlightEditOpen, setHighlightEditOpen] = useState(false);
    const editmenuOpen = Boolean(anchorEl);

    const [highlightText, setHighlightText] = useState(userpageData.highlight.text ?? '');


    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleHighlightClick = async (event) => {
      setHighlightEditOpen(true);
    };

    const updateHightlightText = async () => {
      setHighlightEditOpen(false)
      try {
        const token = await getAccessTokenSilently();

        const updatedText = await usersService.editHighlightedText(highlightText, token);
        const updatedUserpageData = { ...userpageData };
        updatedUserpageData.highlight.text = updatedText;
        setUserpageData(updatedUserpageData);
      } catch (error) {
        console.log(error)
      }
    };

    return (
      <>
        <IconButton id="editmenu-button" disableFocusRipple onClick={handleMenuClick} sx={{}}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={editmenuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleHighlightClick} sx={{ justifyContent: 'center' }} > Edit Highlight Text</MenuItem>
        </Menu>
        <Dialog open={highlightEditOpen} onClose={() => setHighlightEditOpen(false)} >
          <DialogContent>
            <Typography align="center" variant="h6">
              Tell something about your highlighted log.
            </Typography>
            <Typography align="center" variant="h6">
              This will show on your userpage.
            </Typography>
            <TextField multiline rows={4} sx={{ m: 1, width: 400 }}
              value={highlightText} onChange={(e) => setHighlightText(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHighlightEditOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => setHighlightText('')} >Clear</Button>
            <Button onClick={() => updateHightlightText()} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  };



  return (
    <Container disableGutters>
      <Paper elevation={3}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { sm: "4fr 5fr" },
          gridTemplateRows: { xs: "2fr 1fr", sm: "2fr 1fr" },
          gridTemplateAreas: `"avatar username"
        "avatar links"
        `,


        }}>

        {userpageData.avatar && <>
          <Avatar onClick={handleAvatarClick} sx={{
            gridArea: 'avatar', justifySelf: { xs: 'center', sm: 'end' }, alignSelf: 'center',
            width: 70, height: 70, m: { xs: 0, sm: 2 }
          }}
            src={`https://avatars.dicebear.com/api/identicon/${username}${userpageData.avatar}.svg?scale=85`} alt={`${username}avatar`} />

          <Menu anchorEl={avatarAnchorEl} open={avatarMenuOpen} onClose={handleAvatarMenuClose}>
            <MenuItem onClick={() => { newAvatar() }}>Change Avatar</MenuItem>
          </Menu>
        </>}

        <Typography variant="h3" sx={{ gridArea: 'username', alignSelf: 'end', fontFamily: 'Jaapokki', mt: 1 }}>{username}</Typography>
        <Container disableGutters sx={{ gridArea: 'links' }}>
          {!isOwner &&
            <Button onClick={handFollowClick} sx={{ width: 100 }} > {followed ? 'Unfollow' : 'Follow'} </Button>
          }

          <Button onClick={() => navigate(`/logs/${username}`)}>All Logs</Button>
        </Container>
      </Paper>

      <Container disableGutters sx={{ pt: 2 }}>

        {(isOwner && !userpageData.highlight?.log) &&
          <Paper elevation={5} sx={{ p: 3 }}>
            <Tooltip title='Choose a log to highlight here from your list of logs' >
                <Typography align="center" variant="h6">Highlighted Log</Typography>
              </Tooltip>
            <Typography align="center" variant="h6">
              Choose a log to highlight here from your list of logs.
            </Typography>
          </Paper>}

        {userpageData.highlight?.log &&
          <Paper elevation={5} sx={{ p: 3 }}>
            <Container disableGutters sx={{ display: 'grid', gridTemplateColumns: '1fr max-content' }}>
              <Tooltip title='Choose a log to highlight here from your list of logs' >
                <Typography align="center" variant="h6">Highlighted Log</Typography>
              </Tooltip>
              {isOwner && <EditMenu />}
            </Container>

            {userpageData.highlight.text &&
              <Paper elevation={5} sx={{ m: 1, p: 1 }}>
                <Typography align="center" >{userpageData.highlight?.text}</Typography>
              </Paper>
            }
            <SingleLog log={userpageData.highlight.log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='createdAt' />
          </Paper>
        }

        <Paper elevation={5} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, p: 3, mt: 2 }}>
          <Container>
            <Typography align="center" variant="h6">Most Used Weapons</Typography>
            {userpageData.topWeapons?.map((weapon, i) =>
              <Typography sx={{ mt: 1 }} key={weapon._id}>{i + 1}. {weapon._id} ({weapon.count})</Typography>)}
          </Container>
          <Container sx={{ mt: { xs: 2, sm: 0 } }}>
            <Typography align="center" variant="h6">Most Hunted Animals</Typography>
            {userpageData.topAnimals?.map((animal, i) =>
              <Typography sx={{ mt: 1 }} key={animal._id}>{i + 1}. {animal._id} ({animal.count})</Typography>)}
          </Container>
        </Paper>

        <Paper elevation={5} sx={{ p: { sm: 3 }, pt: { xs: 2 }, pb: { xs: 1 }, mt: 2 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }} >Recent Logs</Typography>
          {userpageData.recentLogs?.map(log => <SingleLog key={`userpage${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='createdAt' />)}
        </Paper>
      </Container>


    </Container>
  )
}

export default withAuthenticationRequired(Userpage);