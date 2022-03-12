import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usersService from '../services/user.js';


function Userpage({ myUsername, followedUsers, setFollowedUsers }) {

  const { username } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const isOwner = (myUsername === username)

  const [followed, setFollowed] = useState(false);

  console.log('followedUsers', followedUsers)
  console.log('username', username)

  useEffect(() => {
    setFollowed(followedUsers.includes(username))
  },[followedUsers, setFollowedUsers, username]);


  const handFollowClick = async () => {
    if(followed) {
     // setFollowed(false);
    }else{
      const token = await getAccessTokenSilently();
      const followedUser = await usersService.followAUser(username, token);
      setFollowedUsers(followedUsers.concat(followedUser))

      setFollowed(true);
    }
  }


  return (
    <Container>

    <Typography variant="h4" sx={{ fontFamily: 'Jaapokki'}}>{username}</Typography>

    { !isOwner && 
    <Button onClick={handFollowClick} sx={{width:100}} > {followed ? 'Unfollow' : 'Follow'} </Button> }

    <Button onClick={() => navigate(`/logs/${username}`) }>Logs</Button>

    </Container>
  )
}

export default withAuthenticationRequired(Userpage);