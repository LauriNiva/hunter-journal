import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import { Button } from '@mui/material';

const UserMenu = ({ myUsername }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const { logout } = useAuth0();


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => { 
    logout({
      returnTo: window.location.origin,
    })
   };


  return (
    <>
      <Button id="usermenu-button" disableFocusRipple disableRipple sx={{ textTransform: 'none'}}
      onClick={handleMenuClick}>
        <Typography sx={{ mr: 2 }}>{myUsername}</Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogoutClick}>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
};




function Nav({ username }) {

  const { isAuthenticated } = useAuth0();


  return (
    <AppBar position="sticky" >
      <Toolbar id="navbar">
        <Typography variant='h4' sx={{ flexGrow: 1, fontFamily: 'Jaapokki', fontSize: { xs: 30, sm: 40 } }}>
          <Link to='/'>Hunter's Log 0.1.4</Link>
        </Typography>
        <Typography sx={{ fontFamily: 'Jaapokki', mr: 1 }} > <Link to='/'>HOME</Link></Typography>
        {
          isAuthenticated ?
            <>
              <Typography sx={{ fontFamily: 'Jaapokki', mr: 1 }} ><Link to={`/logs/${username}`} >OWN LOGS</Link></Typography>
              <UserMenu username={username} />
            </>
            : <LoginButton />
        }


      </Toolbar>
    </AppBar>
  )
}

export default Nav;
