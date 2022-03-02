import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logsService from '../services/logs'
import SingleLog from './SingleLog';
import UserSearch from './UserSearch';

function Frontpage({ likedLogs, setLikedLogs }) {



  const [mostRecentLogs, setMostRecentLogs] = useState([]);
  const [mostLikedLogs, setMostLikedLogs] = useState([]);

  useEffect(() => {
    const getRecent = async () => {
      setMostRecentLogs(await logsService.getRecentLogs())
    }
    getRecent();
  }, [])

  useEffect(() => {
    const getMostLiked = async () => {
      setMostLikedLogs(await logsService.getMostLikedLogs())
    }
    getMostLiked();
  }, [])


  return (
    <div>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "100px 1fr",
        gridTemplateAreas: `"head head"
        "new liked"
        `,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{ gridArea: 'head', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography sx={{m:1, p:1, fontSize: '20px'}}>
          Site to log your harvests from the game 
          <Typography variant='body1' variantMapping={{body1:'span'}} sx={{fontSize: '20px', display:'inline', fontFamily: 'Jaapokki'}}> theHunter: Call of the Wild</Typography>.
          <br/> In future you will be able to share your logs and see your fellow hunter's logs.
        </Typography>
        <UserSearch />

        </Box>

        <Box sx={{ gridArea: 'new',  }}>
          <Typography variant="h6" sx={{ml:3}} >Recently added logs</Typography>
          {mostRecentLogs.map(log => <SingleLog key={`recent${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='user' />)}
        </Box>

        <Box sx={{ gridArea: 'liked' }}>
          <Typography variant="h6" sx={{ml:3}} >Most liked logs</Typography>
          {mostLikedLogs.map(log => <SingleLog key={`recent${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='likes' />)}
        </Box>
      </Box>
    </div>
  )
}

export default Frontpage;