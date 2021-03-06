import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Avatar, Divider, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import { Button } from '@mui/material';

import CabinIcon from '@mui/icons-material/Cabin';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const UserMenu = ({ myUsername, avatar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const { logout } = useAuth0();
  const navigate = useNavigate();


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
        {/* <Typography sx={{ mr: 2, ml: 1 }}>{myUsername}</Typography> */}
       {avatar &&  <Avatar sx={{ gridArea: 'avatar', justifySelf: 'end', alignSelf: 'center', width: 40, height: 40}} 
        src={`https://avatars.dicebear.com/api/identicon/${avatar}.svg?scale=85`} alt={`${myUsername}avatar`} /> }
      </Button>
  
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <Typography align="center" sx={{ fontFamily: 'Jaapokki' }} >{myUsername}</Typography>
        <Divider />
        <MenuItem onClick={()=>{ handleMenuClose(); navigate(`/lodge`) } }>Lodge</MenuItem>
        <MenuItem onClick={()=>{ handleMenuClose(); navigate(`/logs/${myUsername}`) } }>My Logs</MenuItem>
        <MenuItem onClick={()=>{ handleMenuClose(); navigate(`/hunters/${myUsername}`) } }>My Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
};




function Nav({ myUsername, avatar }) {

  const { isAuthenticated } = useAuth0();


  return (
    <AppBar position="sticky" >
      <Toolbar id="navbar">
        <Typography variant='h4' sx={{ flexGrow: 1, fontFamily: 'Jaapokki', fontSize: { xs: 30, sm: 40 } }}>
          <Link to='/'>Hunter's Log</Link>
        </Typography>
        <Typography sx={{ display: { xs: 'none', sm: 'inline'}, fontFamily: 'Jaapokki', mr: 2 }} > <Link to='/'>HOME</Link></Typography>
        {
          isAuthenticated ?
            <>
              <Typography sx={{ display: { xs: 'none', sm: 'inline'}, fontFamily: 'Jaapokki', mr: 2 }} ><Link to={`/lodge`} >THE LODGE</Link></Typography>
              <Typography sx={{ display: { xs: 'inline', sm: 'none'},  mr: 2 }} ><Link to={`/lodge`} ><CabinIcon /></Link></Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'inline'}, fontFamily: 'Jaapokki', mr: 2 }} ><Link to={`/logs/${myUsername}`} >MY LOGS</Link></Typography>
              <Typography sx={{ display: { xs: 'inline', sm: 'none'},  mr: 2 }} ><Link to={`/logs/${myUsername}`} ><LibraryBooksIcon /></Link></Typography>
              <UserMenu myUsername={myUsername} avatar={avatar} />
            </>
            : <LoginButton />
        }


      </Toolbar>
    </AppBar>
  )
}

export default Nav;
