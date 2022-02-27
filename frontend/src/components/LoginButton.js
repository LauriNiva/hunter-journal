import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="text"
      onClick={() => loginWithRedirect()}
    >
      <Typography sx={{fontFamily: 'Jaapokki' }}>
        Log In
      </Typography>
    </Button>
  );
};

export default LoginButton;