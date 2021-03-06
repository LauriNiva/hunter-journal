import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import usersService from '../services/user.js';

function UserDataForm({ myUsername, setUsername, dialogOpen, setDialogOpen }) {

  const { user, getAccessTokenSilently } = useAuth0();
  const [formUsername, setFormUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState('');

  useEffect(() => {
    if (myUsername) {
      setDialogOpen(false);
    }
  }, [myUsername, setDialogOpen])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const newuser = {
      email: user.email,
      username: formUsername,
    }

    try {
      const savedUser = await usersService.createUser(newuser, token);
      setUsername(savedUser.username)
    } catch (error) {

      const errortype = error.response?.data?.error?.errors?.username?.kind;
      if (errortype === 'unique') {
        setUsernameHelperText('Must be unique')
        setUsernameError(true);
      }

      console.log(error)

    }

  };

  const handleChange = (e) => {
    setUsernameHelperText('')
    setUsernameError(false);
    setFormUsername(e.target.value)
  }

  const handleCloseDialog = () => {
    if (myUsername) {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="lg">
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          !user.email_verified ?
            <Typography variant='h5'>Please verify your email and refresh</Typography>
            : <Box>
              <Typography variant='h5' sx={{ m: 1 }}>Set your username</Typography>
              <Typography variant='text' sx={{ m: 1 }}>Atleast 4 characters. Letters and numbers only.</Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  id="username-textfield"
                  label="Username"
                  variant="outlined"
                  sx={{ width: 150, m: 1 }}
                  error={usernameError}
                  helperText={usernameHelperText}
                  required
                  inputProps={{ pattern: "[a-zA-Z0-9]+" }}
                  value={formUsername}
                  onChange={handleChange}
                />

                <Button type='submit'>Save</Button>
              </form>
            </Box>
        }



      </Box>
    </Dialog>
  )
};

export default UserDataForm;