import { useAuth0 } from '@auth0/auth0-react';
import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import usersService from '../services/user';
import { useNavigate } from 'react-router-dom';

function UserSearch() {

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [usersFound, setUsersFound] = useState([]);

  const regExp = new RegExp('[a-zA-Z0-9]+');

  useEffect(() => {
    const searchTheUser = async () => {
      if (!searchValue){
        setUsersFound([]);
        return;
      };
      if(regExp.test(searchValue)){
        const token = await getAccessTokenSilently();
        const foundUsers = await usersService.searchUsername(searchValue, token)
        setUsersFound(foundUsers.map(user=>user.username))
        console.log('foundUsers', foundUsers)
      }
    }
    searchTheUser();
  }, [searchValue, getAccessTokenSilently])

  return (


    <Autocomplete
      id="animals-combobox"
      options={usersFound}
      sx={{ width: 300 }}
      freeSolo={false}
      noOptionsText={'Search users'}
      inputValue={searchValue}
      onChange={(e, value)=> navigate(`/logs/${value}`)}
      onInputChange={(e, newValue) => setSearchValue(newValue)}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}

export default UserSearch