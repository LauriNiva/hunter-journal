import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserDataForm from './UserDataForm';

function Frontpage({ username, usernameCheckedButNotFound, setUsername }) {

  const { isLoading, isAuthenticated } = useAuth0();

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
    </div>
  )
}

export default Frontpage;