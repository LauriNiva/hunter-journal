import { Container, Typography } from '@mui/material';
import React from 'react';

function Lodge({ followedUsers }) {



  return (
    <Container>
      <Typography variant="h4" sx={{ fontFamily: 'Jaapokki' }}>The Lodge</Typography>
      <Typography>Lodge is a place to see recent logs from the hunters you follow.</Typography>
    </Container>
  )
};

export default Lodge;