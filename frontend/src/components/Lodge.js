import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logsService from '../services/logs';
import SingleLog from './SingleLog';
import UserSearch from './UserSearch';

function Lodge({ followedUsers, likedLogs, setLikedLogs }) {

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

  const ListOfFollowedUsers = () => {
    return (
      <Paper elevation={4} sx={{ gridArea: 'followed', }}>
        <UserSearch />
        {followedUsers.map(user =>
          <Button onClick={() => navigate(`/hunters/${user}`)} key={`following-${user}`}>{user}</Button>
        )}
      </Paper>
    )
  };





  return (
    <Container disableGutters sx={{
      display: 'grid',
      gridTemplateColumns: "2fr 3fr",
      gridTemplateRows: "100px 1fr",
      gridTemplateAreas: `"head head"
    "followed recent"
    ` }}>
      <Container sx={{ gridArea: 'head', }}>
        <Typography align="center"variant="h4" sx={{ fontFamily: 'Jaapokki' }}>The Lodge</Typography>
        <Typography align="center" >Lodge is the place to find and follow your fellow hunters.
        Here you can easily see recent logs from the hunters you follow.</Typography>
      </Container>
      <ListOfFollowedUsers />

      <Paper sx={{ gridArea: 'recent', width: '100%',  }}>
        <Typography variant="h5" align="center" sx={{ fontFamily: 'Jaapokki' }} >Recent Logs</Typography>
        <Container disableGutters sx={{overflow: 'scroll', height: '75vh', }} >
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