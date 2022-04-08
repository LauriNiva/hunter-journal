//Komponentti käyttäjän kaikkien logien listaamiseen etusivulla
//Logit saadaan App:lta listana
//Ykisttäiset logit lähetetään SingleLog komponentille

import React, { useEffect, useState } from 'react';
import SingleLog from './SingleLog';
import NewLogForm from './NewLogForm.js';
import { Container, FormControl, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import LogFilteringList from './LogFilteringList';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import logsService from '../services/logs';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { Button } from '@mui/material';
import { DialogTitle } from '@mui/material';




function Logs({ likedLogs, setLikedLogs, myUsername }) {

  const { usernameForLogs } = useParams();
  const navigate = useNavigate();


  const isOwner = (myUsername === usernameForLogs);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [logsToDisplay, setLogsToDisplay] = useState([]);
  const [selectedSortForLogs, setSelectedSortForLogs] = useState('createdAt-asc');

  const [data, sort] = selectedSortForLogs.split('-');


  const { getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    (async () => {
      console.log('fetching data')
      const token = await getAccessTokenSilently();
      setLogs(await logsService.getAllLogs(usernameForLogs, token));
    })()
  }, [getAccessTokenSilently, usernameForLogs]);


  const createSort = (asc, desc, data) => {
    return {
      asc, desc, data
    };
  };

  const sortObjects = {
    createdAt: createSort("Newest First", "Oldest First", "createdAt"),
    rating: createSort("Lowest Rating", "Highest Rating", "rating"),
    badge: createSort("Worst Badge", "Best Badge", "badge"),
    distance: createSort("Shortest tracking", "Longest Tracking", "distance"),
    weight: createSort("Lightest animal", "Heaviest animal", "weight"),
    shotdistance: createSort("Shortest Shot", "Longest Shot", "shotdistance"),

  };


  useEffect(() => {

    // console.log("Sorting the logs...")

    const badgeValuesForSorting = {
      "None": 0,
      "Bronze": 1,
      "Silver": 2,
      "Gold": 3,
      "Diamond": 4,
      "Great One": 5
    }

    let sortedLogs = filteredLogs;


    //console.log(selectedSortForLogs.split('-'))

    if (sort === 'desc') {
      //Descending order
      if (data === 'createdAt') {
        sortedLogs = [...filteredLogs].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      } else if (data === 'badge') {
        sortedLogs = [...filteredLogs].sort((a, b) => badgeValuesForSorting[b[data]] - badgeValuesForSorting[a[data]]);
      } else {
        sortedLogs = [...filteredLogs].sort((a, b) => b[data] - a[data]);
      }
    } else {
      //Ascending order
      if (data === 'createdAt') {
        sortedLogs = [...filteredLogs].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      } else if (data === 'badge') {
        sortedLogs = [...filteredLogs].sort((a, b) => badgeValuesForSorting[a[data]] - badgeValuesForSorting[b[data]]);
      } else {
        sortedLogs = [...filteredLogs].sort((a, b) => a[data] - b[data]);
      }
    }


    setLogsToDisplay(sortedLogs)
  }, [sort, data, logs, filteredLogs, selectedSortForLogs]);

  const SortDropdown = () => {
    return (
      // <FormControl sx={{ mr: 1,}}>
      //   <InputLabel id="sort-dropdown-label">
      //     {(sort === "asc") ? <SortIcon sx={{ transform: "scaleY(-1)" }} />
      //       : <SortIcon />}
      //   </InputLabel>
        // <Select labelId="sort-dropdown-label" id="sort-dropdown" label="Sort"
        <Select id="sort-dropdown"
          sx={{ fontSize: { xs: 12, sm: 15 }, width: { xs: 120, sm: 170}}}
          value={selectedSortForLogs} onChange={(e) => setSelectedSortForLogs(e.target.value)} >
          {
            Object.keys(sortObjects).map(item =>
              [
                <MenuItem key={sortObjects[item].asc} value={`${item}-asc`}>{sortObjects[item].asc}</MenuItem>,
                <MenuItem key={sortObjects[item].desc} value={`${item}-desc`}>{sortObjects[item].desc}</MenuItem>
              ])}
        </Select>
        
      // </FormControl>
    )
  };


  return (

    <Container disableGutters id="logs-container"
      sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 5fr" } }}>

      <Container disableGutters sx={{ display: { xs: 'none', md: 'inline' } }} >
        <LogFilteringList logs={logs} setFilteredLogs={setFilteredLogs} />
      </Container>
      
{/* LoginFilteringList komponentit ei jaa samaa tilaa, joten ei tiedä toistensa filtereistä */}
            <Dialog keepMounted fullWidth maxWidth="xl" open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} >

              <LogFilteringList logs={logs} setFilteredLogs={setFilteredLogs} asDialog={true}
                closeDialog={() => setFilterDialogOpen(false)} />
            </Dialog>
         

      <Container disableGutters sx={{ display: 'grid', gridTemplateRows: 'max-content 1fr', height:{xs: '90vh', md: '85vh' } }} >

        <Toolbar disableGutters sx={{ ml: 2, mr: 1, pb: 1, maxHeight:{ xs: 58, sm: 65 } }}>

          <Typography variant="h4" sx={{ mr: 'auto', fontFamily: 'Jaapokki', fontSize: { xs: 20, sm: 34 } }} onClick={() => navigate(`/hunters/${usernameForLogs}`)}>
            {usernameForLogs} 's logs
          </Typography>
          
          <Button sx={{fontFamily: 'Jaapokki', display: { xs: 'inline', md: 'none' } }} onClick={() => setFilterDialogOpen(true)}>Filters</Button>
          <SortDropdown />
          
          {isOwner && <NewLogForm setLogs={setLogs} />}
        </Toolbar>

        <Container id="logs-list-container" className="hidden-scroll" disableGutters
          sx={{  overflow: { xs: 'scroll', sm: 'scroll' } }} >
          {
            logsToDisplay.map(log => (
              <SingleLog key={log._id} log={log} likedLogs={likedLogs} setLikedLogs={setLikedLogs}
                dataToShow={selectedSortForLogs.split('-')[0]} setLogs={isOwner && setLogs} />
            ))
          }
        </Container>
      </Container>
    </Container>

  );
}

export default withAuthenticationRequired(Logs);
