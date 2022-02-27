import React from 'react';
import AuthButton from './AuthButton';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Toolbar, Typography } from '@mui/material';


function Nav({ username }) {

  const { isAuthenticated } = useAuth0();

  const greetings = ['Hi there', 'Happy hunting'];

  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
   

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <Typography variant='h4' sx={{ flexGrow: 1, fontFamily:'Jaapokki' }}>
          Hunter's Log 0.1
        </Typography>
        {isAuthenticated && <Typography variant='h7' sx={{ mr: 2 }}>{greeting} {username} !</Typography>}
        <AuthButton />

      </Toolbar>
    </AppBar>
  )
}

export default Nav;
