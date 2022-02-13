//Komponentti käyttäjän kaikkien logien listaamiseen etusivulla
//Logit saadaan App:lta listana
//Ykisttäiset logit lähetetään SingleLog komponentille

import React, { useEffect, useState } from 'react';
import SingleLog from './SingleLog';
import NewLogForm from './NewLogForm.js';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@mui/material';



function Logs({ logs, setLogs }) {

  const { isAuthenticated } = useAuth0();

  const [logsToDisplay, setLogsToDisplay] = useState([]);
  const [selectedSortForLogs, setSelectedSortForLogs] = useState('Newest First');
  
  const sortsForLogs = ['Newest First', 'Oldest First', 'Highest Rating', 'Lowest Rating'];

  const sortLogs = () => {
    let sortedLogs = logs;

    if(selectedSortForLogs === 'Newest First') {
      sortedLogs = [...logs].sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    }else if(selectedSortForLogs === 'Oldest First'){
      sortedLogs = [...logs].sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }else if(selectedSortForLogs === 'Highest Rating'){
      sortedLogs = [...logs].sort((a,b) => a.rating - b.rating);
    }else if(selectedSortForLogs === 'Lowest Rating'){
      sortedLogs = [...logs].sort((a,b) => b.rating - a.rating);
    }
    console.log('logs', logs)
    console.log('sortedLogs', sortedLogs)


    setLogsToDisplay(sortedLogs)
  };

  useEffect(() => {
    console.log("useEffect for sort", selectedSortForLogs)
    sortLogs();
  },[logs, selectedSortForLogs]);




  return (

    isAuthenticated
      ? <div>
        {sortsForLogs.map(sort =>
          <Button key={sort} id={`button${sort.split(' ').join('')}`} onClick={() => setSelectedSortForLogs(sort)}>
            {sort}
          </Button>
        )}
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
