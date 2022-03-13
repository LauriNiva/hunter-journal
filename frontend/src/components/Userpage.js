import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Avatar, Button, Container, SvgIcon, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logsService from '../services/logs.js';
import usersService from '../services/user.js';
import SingleLog from './SingleLog.js';


function Userpage({ myUsername, followedUsers, setFollowedUsers, likedLogs, setLikedLogs}) {

  const { username } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const isOwner = (myUsername === username)

  const [followed, setFollowed] = useState(false);
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    setFollowed(followedUsers.includes(username))
  }, [followedUsers, setFollowedUsers, username]);

  useEffect(() => {
    const getRecent = async () => {
      const token = await getAccessTokenSilently();
      setRecentLogs(await logsService.getUsersRecentLogs(username, token))
    }
    getRecent();
  }, [username, getAccessTokenSilently])


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


  return (
    <Container>
      <Container sx={{ 
      display: 'grid',
      gridTemplateColumns: "1fr 2fr",
      gridTemplateRows: "1fr 1fr",
      gridTemplateAreas: `"avatar username"
        "avatar links"
        `,
      maxWidth: '600px',
      maxHeight: '100px'
       }}>
        <Avatar sx={{ gridArea: 'avatar', justifySelf: 'end', alignSelf: 'center', width: 70, height: 70, m:2 }} 
        src={`https://avatars.dicebear.com/api/identicon/${username}.svg?scale=85`} alt={`${username}avatar`} />
        <Typography variant="h3" sx={{ gridArea: 'username', fontFamily: 'Jaapokki' }}>{username}</Typography>
        <Container disableGutters sx={{ gridArea: 'links'}}>
          {!isOwner &&
            <Button onClick={handFollowClick} sx={{ width: 100 }} > {followed ? 'Unfollow' : 'Follow'} </Button>}

          <Button onClick={() => navigate(`/logs/${username}`)}>All Logs</Button>
        </Container>
      </Container>

      <Container>
        <Typography>Recent Logs</Typography>
        {recentLogs.map( log => <SingleLog key={`userpage${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='createdAt' />)}
      </Container>


    </Container>
  )
}

export default withAuthenticationRequired(Userpage);