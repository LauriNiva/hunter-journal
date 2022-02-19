import React, { useEffect, useState } from 'react';
import { Checkbox, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';

function LogFilteringList({ logs, setFilteredLogs }) {

  console.log('logs to filter', logs)

  const [badgeOpen, setBadgeOpen] = useState(false);
  const [animalOpen, setAnimalOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [furOpen, setFurOpen] = useState(false);

  const [badgeFilter, setBadgeFilter] = useState([]);
  const [animalFilter, setAnimalFilter] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState([]);
  const [furFilter, setFurFilter] = useState([]);

  const [availableBadgesForFiltering, setAvailableBadgesForFiltering] = useState({});
  const [availableAnimalsForFiltering, setAvailableAnimalsForFiltering] = useState({});
  const [availableDistancesForFiltering, setAvailableDistancesForFiltering] = useState([]);
  const [availableFursForFiltering, setAvailableFursForFiltering] = useState({});

  useEffect(() => {
    let badges = {};
    let animals = {};
    let furs = {};
    let distances = { '-0': 0, '1-49': 0, '50-499': 0, '500-999': 0, '1000-': 0 };

    logs.forEach(log => {
      badges[log.badge] = (badges[log.badge] || 0) + 1;
      animals[log.animal] = (animals[log.animal] || 0) + 1;
      furs[log.furtype] = (furs[log.furtype] || 0) + 1;

      const distance = parseInt(log.distance);
      if (distance >= 1000) {
        distances['1000-']++;
      } else if (distance >= 500 && distance <= 999) {
        distances['500-999']++;
      } else if (distance >= 50 && distance <= 499) {
        distances['50-499']++;
      } else if (distance >= 1 && distance <= 49) {
        distances['1-49']++;
      } else {
        distances['-0']++;
      };
    });

    const filteredDistances = Object.entries(distances).filter(entry => entry[1])
    console.log('filteredDistances', filteredDistances)
    setAvailableBadgesForFiltering(badges);
    setAvailableAnimalsForFiltering(animals);
    setAvailableDistancesForFiltering(filteredDistances);
    setAvailableFursForFiltering(furs);

  }, [logs])

  const toggleFilter = (filter, setter, option) => {
    if (filter.includes(option)) {
      setter(filter.filter(item => item !== option))
    } else {
      setter([...filter, option])
    }
  };


  useEffect(() => {
    console.log("Filtering the logs...");

    console.log('badgeFilter inside the --useEffect: ', badgeFilter)
    console.log('logs inside the --useEffect: ', logs)

    let logsBeingFiltered = logs;

    if (badgeFilter.length || animalFilter.length || furFilter.length || distanceFilter.length) {

      badgeFilter.length &&
        (logsBeingFiltered = logs.filter(item => badgeFilter.includes(item.badge)));

      animalFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => animalFilter.includes(item.animal)));

      furFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => furFilter.includes(item.furtype)));

      const distancesMinMax = {
        '-0': { min: 0, max: 0 },
        '1-49': { min: 1, max: 49 },
        '50-499': { min: 50, max: 499 },
        '500-999': { min: 500, max: 999 },
        '1000-': { min: 1000, max: 99999 },
      };

      distanceFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item =>
          distanceFilter.some(filter =>
            item.distance >= distancesMinMax[filter].min && item.distance <= distancesMinMax[filter].max))
        );

    }

    setFilteredLogs(logsBeingFiltered);
  }, [badgeFilter, animalFilter, furFilter, distanceFilter, logs])


  const Badgefilter = () => {
    return (
      <Collapse in={badgeOpen}>
        <List>
          {Object.keys(availableBadgesForFiltering).map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox checked={badgeFilter.includes(option)}
                onClick={() => toggleFilter(badgeFilter, setBadgeFilter, option)} />
              <ListItemText primary={`${option} (${availableBadgesForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };


  const Animalfilter = () => {
    return (
      <Collapse in={animalOpen}>
        <List>
          {Object.keys(availableAnimalsForFiltering).map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox checked={animalFilter.includes(option)}
                onClick={() => toggleFilter(animalFilter, setAnimalFilter, option)} />
              <ListItemText primary={`${option} (${availableAnimalsForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>

    )
  };
  const Distancefilter = () => {
    return (
      <Collapse in={distanceOpen}>

        <List>
          {availableDistancesForFiltering.map((option) =>
            <ListItemButton key={option[0]} dense>
              <Checkbox checked={distanceFilter.includes(option[0])}
                onClick={() => toggleFilter(distanceFilter, setDistanceFilter, option[0])} />
              <ListItemText primary={`${option[0]} m (${option[1]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };
  const Furfilter = () => {
    return (
      <Collapse in={furOpen}>

        <List>
          {Object.keys(availableFursForFiltering).map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox checked={furFilter.includes(option)}
                onClick={() => toggleFilter(furFilter, setFurFilter, option)} />
              <ListItemText primary={`${option} (${availableFursForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };


  return (
    <Paper elevation={6}>
      <List>
        <ListSubheader sx={{ bgcolor: "inherit" }} >
          Filter Logs
        </ListSubheader>

        <ListItemButton onClick={() => setBadgeOpen(!badgeOpen)}>
          <ListItemIcon>
            <MilitaryTechIcon />
          </ListItemIcon>
          <ListItemText primary="Badge" />
          {badgeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Badgefilter />

        <ListItemButton onClick={() => setAnimalOpen(!animalOpen)}>
          <ListItemIcon>
            <PestControlRodentIcon />
          </ListItemIcon>
          <ListItemText primary="Animal" />
          {animalOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Animalfilter />

        <ListItemButton onClick={() => setDistanceOpen(!distanceOpen)} >
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Distance" />
          {distanceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Distancefilter />

        <ListItemButton onClick={() => setFurOpen(!furOpen)} >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Fur" />
          {furOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Furfilter />
      </List>

    </Paper>
  )
}

export default LogFilteringList;