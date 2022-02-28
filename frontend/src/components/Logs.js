//Komponentti käyttäjän kaikkien logien listaamiseen etusivulla
//Logit saadaan App:lta listana
//Ykisttäiset logit lähetetään SingleLog komponentille

import React, { useEffect, useState } from 'react';
import SingleLog from './SingleLog';
import NewLogForm from './NewLogForm.js';
import { Container, FormControl, InputLabel, MenuItem, Select, Toolbar } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import LogFilteringList from './LogFilteringList';



function Logs({ logs, setLogs }) {

  const [filteredLogs, setFilteredLogs] = useState(logs);

  const [logsToDisplay, setLogsToDisplay] = useState([]);

  const [selectedSortForLogs, setSelectedSortForLogs] = useState('Newest First');

  const sortsForLogs = ['Newest First', 'Oldest First', 'Highest Rating', 'Lowest Rating'];


  useEffect(() => {

    // console.log("Sorting the logs...")
    
    let sortedLogs = filteredLogs;

    if (selectedSortForLogs === 'Newest First') {
      sortedLogs = [...filteredLogs].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    } else if (selectedSortForLogs === 'Oldest First') {
      sortedLogs = [...filteredLogs].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    } else if (selectedSortForLogs === 'Highest Rating') {
      sortedLogs = [...filteredLogs].sort((a, b) => b.rating - a.rating);
    } else if (selectedSortForLogs === 'Lowest Rating') {
      sortedLogs = [...filteredLogs].sort((a, b) => a.rating - b.rating);
    }

    setLogsToDisplay(sortedLogs)
  }, [logs, filteredLogs, selectedSortForLogs]);


  return (

    <>
      <Container disableGutters id="logs-container" 
      sx={{ display: "grid", gridTemplateColumns: {xs: "1fr", md: "2fr 5fr"} }}>

        <LogFilteringList logs={logs} setFilteredLogs={setFilteredLogs} />

        <Container id="logs-list-container" disableGutters >
          <Toolbar sx={{ justifyContent: 'space-between' }}>

            <FormControl>
              <InputLabel id="sort-dropdown-label"><SortIcon /></InputLabel>
              <Select labelId="sort-dropdown-label" id="sort-dropdown" label="Sort"
                value={selectedSortForLogs} onChange={(e) => setSelectedSortForLogs(e.target.value)} >
                {sortsForLogs.map(sort =>
                  <MenuItem key={sort} value={sort}>{sort}</MenuItem>)}
              </Select>
            </FormControl>

            <NewLogForm setLogs={setLogs} />
          </Toolbar>
          {
            logsToDisplay.map(log => (
              <SingleLog key={log._id} log={log} setLogs={setLogs} />
            ))
          }
        </Container>
      </Container>
    </>

  );
}

export default Logs;
