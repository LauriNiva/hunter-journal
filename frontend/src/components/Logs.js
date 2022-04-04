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




function Logs({ likedLogs, setLikedLogs, myUsername }) {

  const { usernameForLogs } = useParams();
  const navigate = useNavigate();


  const isOwner = (myUsername === usernameForLogs);

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
      <FormControl sx={{ mr: 1 }}>
        <InputLabel id="sort-dropdown-label">
          {(sort === "asc") ? <SortIcon sx={{ transform: "scaleY(-1)" }} />
            : <SortIcon />}
        </InputLabel>
        <Select labelId="sort-dropdown-label" id="sort-dropdown" label="Sort"
          value={selectedSortForLogs} onChange={(e) => setSelectedSortForLogs(e.target.value)} >
          {
            Object.keys(sortObjects).map(item =>
              [
                <MenuItem key={sortObjects[item].asc} value={`${item}-asc`}>{sortObjects[item].asc}</MenuItem>,
                <MenuItem key={sortObjects[item].desc} value={`${item}-desc`}>{sortObjects[item].desc}</MenuItem>
              ])}
        </Select>
        {/*  <Select labelId="sort-dropdown-label" id="sort-dropdown" label="Sort"
          value={selectedSortForLogs} onChange={(e) => setSelectedSortForLogs(e.target.value)} >
          {sortsForLogs.map(sort =>
            <MenuItem key={sort} value={sort}>{sort}</MenuItem>)}
        </Select> */}
      </FormControl>
    )
  };


  return (

    <Container disableGutters id="logs-container"
      sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 5fr" } }}>

      <LogFilteringList logs={logs} setFilteredLogs={setFilteredLogs} />

      <Container disableGutters sx={{ maxHeight: '85vh' }} >
        <Toolbar disableGutters sx={{ ml: 2, mr: 1}}>

          <Typography variant="h4" sx={{ mr: 'auto', fontFamily: 'Jaapokki' }} onClick={() => navigate(`/hunters/${usernameForLogs}`)}>
            {usernameForLogs} 's logs
          </Typography>

          <SortDropdown />
          {isOwner && <NewLogForm setLogs={setLogs} />}
        </Toolbar>

        <Container id="logs-list-container" className="hidden-scroll" disableGutters sx={{ overflow: 'scroll', maxHeight: '80vh' }} >
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
