//Komponentti käyttäjän kaikkien logien listaamiseen etusivulla
//Logit saadaan App:lta listana
//Ykisttäiset logit lähetetään SingleLog komponentille

import React, { useEffect, useState } from 'react';
import SingleLog from './SingleLog';
import NewLogForm from './NewLogForm.js';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';



function Logs({ logs, setLogs }) {

  const { isAuthenticated } = useAuth0();

  const [logsToDisplay, setLogsToDisplay] = useState([]);
  const [selectedSortForLogs, setSelectedSortForLogs] = useState('Newest First');
  
  const sortsForLogs = ['Newest First', 'Oldest First', 'Highest Rating', 'Lowest Rating'];

  const sortLogs = () => {
    let sortedLogs = logs;

    if(selectedSortForLogs === 'Newest First') {
      sortedLogs = [...logs].sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }else if(selectedSortForLogs === 'Oldest First'){
      sortedLogs = [...logs].sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    }else if(selectedSortForLogs === 'Highest Rating'){
      sortedLogs = [...logs].sort((a,b) => b.rating - a.rating);
    }else if(selectedSortForLogs === 'Lowest Rating'){
      sortedLogs = [...logs].sort((a,b) => a.rating - b.rating);
    }
    


    setLogsToDisplay(sortedLogs)
  };

  useEffect(() => {
    console.log("useEffect for sort", selectedSortForLogs)
    sortLogs();
  },[logs, selectedSortForLogs]);


  return (

    isAuthenticated
      ? <div>
        <FormControl>
          <InputLabel id="sort-dropdown-label"><SortIcon /></InputLabel>
          <Select labelId="sort-dropdown-label" id="sort-dropdown" label="Sort"
          value={selectedSortForLogs} onChange={(e) => setSelectedSortForLogs(e.target.value)} >
            {sortsForLogs.map(sort => 
            <MenuItem key={sort} value={sort}>{sort}</MenuItem>)}
          </Select>
        </FormControl>

      
        <NewLogForm setLogs={setLogs} />

        {
          logsToDisplay.map(log => (
            <SingleLog key={log._id} log={log} />
          ))
        }
      </div>
      : <Typography>Please log in</Typography>
  );
}

export default Logs;
