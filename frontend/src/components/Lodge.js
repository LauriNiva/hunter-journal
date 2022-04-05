import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Avatar, Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logsService from '../services/logs';
import SingleLog from './SingleLog';
import UserSearch from './UserSearch';

function Lodge({ followedUsers, likedLogs, setLikedLogs, followedUseravatars }) {

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const [recentFollowedLogs, setRecentFollowedLogs] = useState([]);

  useEffect(() => {
    const recent = async () => {
      const token = await getAccessTokenSilently();
      const recentLogs = await logsService.getRecentFollowedLogs(token);
      setRecentFollowedLogs(recentLogs);
    }
    recent();
  }, [getAccessTokenSilently])

  useEffect(() => {

  }, [followedUsers])

  const ListOfFollowedUsers = () => {


    return (
      <Paper elevation={5} sx={{ gridArea: 'followed', pt: 2 }}>
        <UserSearch />
        <Typography align="center" sx={{ marginTop: 4 }} >Hunters you follow</Typography>
        <Container disableGutters sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
         maxHeight: {xs: '50vh', sm: 'auto' }, p: 2 }} >
          {followedUsers.map(user =>
            <Button sx={{ textTransform: 'none', fontFamily: 'Jaapokki' }} onClick={() => navigate(`/hunters/${user}`)} key={`following-${user}`}>
              <Avatar sx={{ width: 30, height: 30, mr: 1, ml: 1 }} src={`https://avatars.dicebear.com/api/identicon/${followedUseravatars[user]}.svg?scale=85`} alt={`${user}avatar`} />
              {user}
            </Button>
          )}
        </ Container>
      </Paper>
    )
  };





  return (
    <Container disableGutters sx={{
      display: 'grid',
      gridTemplateColumns: {sm: "2fr 3fr"},
      gridTemplateRows: {sm: "100px 1fr"},
      gridTemplateAreas: {
        xs:
      `" head"
      "followed"
      "recent"` ,
        sm:
      `"head head"
      "followed recent"
    `
      }
    }}>
      <Container sx={{ gridArea: 'head', mt:2, mb: 2 }}>
        <Typography align="center" variant="h4" sx={{ fontFamily: 'Jaapokki' }}>The Lodge</Typography>
        <Typography align="center" >Lodge is the place to find and follow your fellow hunters.
          Here you can easily see recent logs from the hunters you follow.</Typography>
      </Container>
      <ListOfFollowedUsers />

      <Paper elevation={5} sx={{ gridArea: 'recent', mt: {xs: 2, sm: 0}, ml: {xs: 0, sm: 1}, pt:1,  }}>
        <Typography variant="h5" align="center" sx={{ fontFamily: 'Jaapokki' }} >Recent Logs from followed</Typography>
        <Container className="hidden-scroll" disableGutters sx={{ overflow: {sm: 'scroll'}, height: {sm: '75vh'}, }} >
          {
            recentFollowedLogs.map(log =>
              <SingleLog key={`recentlodge${log._id}`} log={log} dataToShow={'user'} likedLogs={likedLogs} setLikedLogs={setLikedLogs} />
            )}
        </Container>
      </Paper>
    </Container>
  )
};

export default withAuthenticationRequired(Lodge);