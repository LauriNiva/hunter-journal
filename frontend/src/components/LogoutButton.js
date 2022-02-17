
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
    color="primary"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      <LogoutIcon />
    </Button>
  );
};

export default LogoutButton;