import { Paper } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logsService from '../services/logs'
import SingleLog from './SingleLog';

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
    <Box sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: { sm: "100px 1fr"},
      gridTemplateAreas: {
        xs: `"head head"
          "new new"
          "liked liked"
          `,
        sm: `"head head"
        "new liked"
        `},
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{ gridArea: 'head', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ m: 1, p: 1, fontSize: '20px' }}>
          Site to log your harvests from the game
          <Typography variant='body1' variantMapping={{ body1: 'span' }} sx={{ fontSize: '20px', display: 'inline', fontFamily: 'Jaapokki' }}> theHunter: Call of the Wild</Typography>.
          <br /> In The Lodge you can follow fellow hunters and see their recent logs.
        </Typography>

      </Box>

      <Paper elevation={5} className="hidden-scroll" sx={{ gridArea: 'new', mt: 2, pt:1,  overflow: { sm: 'scroll' }, }}>
        <Typography align="center" variant="h6" sx={{  }} >Recent logs</Typography>
        {mostRecentLogs.map(log => <SingleLog key={`recentfp${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='user' />)}
      </Paper>

      <Paper elevation={5} className="hidden-scroll" sx={{ gridArea: 'liked', mt: 2, pt:1, overflow: { sm: 'scroll' }, }}>
        <Typography align="center" variant="h6" sx={{  }} >Most liked logs</Typography>
        {mostLikedLogs.map(log => <SingleLog key={`likedfp${log._id}`} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs} dataToShow='likes' />)}
      </Paper>
    </Box>
  )
}

export default Frontpage;