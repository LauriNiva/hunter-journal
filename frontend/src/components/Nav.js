import React from 'react';
import AuthButton from './AuthButton';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Toolbar, Typography } from '@mui/material';


function Nav() {

  const { user, isAuthenticated } = useAuth0();

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <Typography variant='h4' sx={{ flexGrow: 1 }}>
          Hunter Log
        </Typography>
        {isAuthenticated && <Typography variant='h7' sx={{ mr: 2 }}>Happy Huntings {user.name} !</Typography>}
        <AuthButton />

      </Toolbar>
    </AppBar>
  )
}

export default Nav;
