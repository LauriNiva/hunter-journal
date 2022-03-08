import { Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function Userpage({ myUsername }) {

  const { username } = useParams();

  const navigate = useNavigate();

  const [isOwner, setIsOwner] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setIsOwner(myUsername === username)
  }, [myUsername, username]);

  const handFollowClick = () => {
    setFollowed(!followed)
  }


  return (
    <Container>

    <Typography variant="h4" sx={{ fontFamily: 'Jaapokki'}}>{username}</Typography>

    { !isOwner && <Button onClick={handFollowClick} > {followed ? 'Unfollow' : 'Follow'} </Button> }
    <Button onClick={() => navigate(`/logs/${username}`) }>Logs</Button>
    </Container>
  )
}

export default Userpage;