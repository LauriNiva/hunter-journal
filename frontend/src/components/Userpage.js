import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Avatar, Button, Container, Typography, Paper, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logsService from '../services/logs.js';
import usersService from '../services/user.js';
import SingleLog from './SingleLog.js';


function Userpage({ myUsername, followedUsers, setFollowedUsers, likedLogs, setLikedLogs, setNewAvatar }) {

  const { username } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const isOwner = (myUsername === username);

  const [avatar, setAvatar] = useState('');
  const [followed, setFollowed] = useState(false);
  const [recentLogs, setRecentLogs] = useState([]);
  const [usersTop, setUsersTop] = useState([]);

  useEffect(() => {
    setFollowed(followedUsers.includes(username))
  }, [followedUsers, setFollowedUsers, username]);

  useEffect(() => {
    const getRecent = async () => {
      const token = await getAccessTokenSilently();
      setRecentLogs(await logsService.getUsersRecentLogs(username, token))
    }
    getRecent();
  }, [username, getAccessTokenSilently]);

  useEffect(() => {
    const getTop = async () => {
      const token = await getAccessTokenSilently();
      setUsersTop(await logsService.getUsersTop(username, token))
    }
    getTop();
  }, [username, getAccessTokenSilently]);
  

  useEffect(() => {
    const getAvatar = async () => {
      const avatarNumber = await usersService.getAvatar(username);
      setAvatar(avatarNumber)
    }
    getAvatar();
  }, [username]);


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
    console.log('rngAvatar', rngAvatar)

    try {
      const token = await getAccessTokenSilently();
      const updatedAvatar = await usersService.updateAvatar({ avatar: rngAvatar }, token)
      setAvatar(updatedAvatar);
      setNewAvatar(updatedAvatar);
      console.log('updatedAvatar', updatedAvatar)
    } catch (error) {
      console.log(error)
    }
  };

  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const avatarMenuOpen = Boolean(avatarAnchorEl);

  const handleAvatarClick = (e) => {
    if (!isOwner) { return };
    console.log('e', e)
    setAvatarAnchorEl(e.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };



  return (
    <Container disableGutters>
      <Paper elevation={3}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { sm: "4fr 5fr" },
          gridTemplateRows: {xs:"2fr 1fr" ,sm: "2fr 1fr"},
          gridTemplateAreas: `"avatar username"
        "avatar links"
        `,

         
        }}>

        {avatar && <>
          <Avatar onClick={handleAvatarClick} sx={{
            gridArea: 'avatar', justifySelf: { xs: 'center', sm: 'end' }, alignSelf: 'center',
            width: 70, height: 70, m: { xs: 0, sm: 2 }
          }}
            src={`https://avatars.dicebear.com/api/identicon/${avatar}.svg?scale=85`} alt={`${username}avatar`} />

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

        <Paper elevation={5} sx={{ display: 'flex', flexDirection:{ xs: 'column', sm: 'row'}, p: 3 }}>
          <Container>
            <Typography align="center" variant="h6">Most Used Weapons</Typography>
            {usersTop.topWeapons?.map((weapon, i) =>
              <Typography sx={{ mt: 1}} key={weapon._id}>{i + 1}. {weapon._id} ({weapon.count})</Typography>)}
          </Container>
          <Container sx={{mt:{xs: 2, sm: 0}}}>
            <Typography align="center" variant="h6">Most Hunted Animals</Typography>
            {usersTop.topAnimals?.map((animal, i) =>
              <Typography sx={{ mt: 1}} key={animal._id}>{i + 1}. {animal._id} ({animal.count})</Typography>)}
          </Container>
        </Paper>

        <Paper elevation={5} sx={{ p:{ sm: 3 }, pt:{ xs: 2 }, pb:{ xs: 1 }, mt: 2 }}>
          <Typography variant="h6" align="center" sx={{mb:2}} >Recent Logs</Typography>
          {recentLogs.map(log => <SingleLog key={`userpage${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='createdAt' />)}
        </Paper>
      </Container>


    </Container>
  )
}

export default withAuthenticationRequired(Userpage);