import React from 'react';
import AuthButton from './AuthButton';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function Nav({ username }) {

  const { isAuthenticated } = useAuth0();


  return (
    <AppBar position="sticky" >
      <Toolbar id="navbar">
        <Typography variant='h4' sx={{ flexGrow: 1, fontFamily: 'Jaapokki', fontSize: { xs: 30, sm: 40 } }}>
         <Link to='/'>Hunter's Log 0.1.3</Link> 
        </Typography>
        <Typography sx={{ fontFamily: 'Jaapokki', mr:1}} > <Link to='/'>HOME</Link></Typography>
        {
          isAuthenticated &&
          <>
            <Typography sx={{ fontFamily: 'Jaapokki', mr:1}} ><Link to='/logs'>OWN LOGS</Link></Typography>
            <Typography sx={{ mr: 2 }}>{username}</Typography>
          </>
        }
        <AuthButton />

      </Toolbar>
    </AppBar>
  )
}

export default Nav;
