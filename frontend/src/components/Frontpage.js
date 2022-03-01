import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logsService from '../services/logs'
import SingleLog from './SingleLog';

function Frontpage({ usernameCheckedButNotFound, setUsername }) {



  const [mostRecentLogs, setMostRecentLogs] = useState([]);

  useEffect(() => {
    const getRecent = async () => {
      setMostRecentLogs(await logsService.getRecentLogs())
    }
    getRecent();
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
        <Box sx={{ gridArea: 'head' }}>
        <Typography >Head</Typography>
        </Box>

        <Box sx={{ gridArea: 'new' }}>
          <Typography variant="h6">Recently added logs</Typography>
          {mostRecentLogs.map(log => <SingleLog key={`recent${log._id}`} log={log} dataToShow='user' />)}
        </Box>

        <Box sx={{ gridArea: 'liked' }}>
          <Typography variant="h6">Most liked logs</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Frontpage;