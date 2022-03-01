import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserDataForm from './UserDataForm';
import logsService from '../services/logs'

function Frontpage({ usernameCheckedButNotFound, setUsername }) {

  const { isLoading, isAuthenticated } = useAuth0();

  const [mostRecentLogs , setMostRecentLogs] = useState([]);

  useEffect(() => {
    logsService.getRecentLogs()
  },[])



  const NotAuthenticated = () => {
    return (
      <Box className="not-authenticated" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          isLoading ?
            <CircularProgress />
            : <Typography variant='h5' sx={{ fontFamily: 'Jaapokki', m: 2 }}>
              Please log in or create a account to start.
            </Typography>
        }
      </Box>
    )
  }

  return (
    <div>
      <Typography variant='h3'>Frontpage</Typography> 
      {isAuthenticated ?
        usernameCheckedButNotFound && <UserDataForm setUsername={setUsername} />
        : <NotAuthenticated />
      }
      <Box sx={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gridTemplateRows:"1fr 4fr",
        gridTemplateAreas: `"head head"
        "new liked"
        `,
        justifyContent: 'center',
        alignItems: 'center'
        }}>
          <Typography sx={{gridArea:'head'}}>Head</Typography>
          <Box sx={{gridArea:'new'}}>New</Box>
          <Box sx={{gridArea:'liked'}}>Liked</Box>
      </Box>
    </div>
  )
}

export default Frontpage;