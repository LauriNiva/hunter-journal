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

  let availableBadgesForFiltering = {};
  let availableAnimalsForFiltering = {};
  let availableDistancesForFiltering = {};
  let availableFursForFiltering = {};


  logs.forEach(log => {
    availableBadgesForFiltering[log.badge] = (availableBadgesForFiltering[log.badge] || 0) + 1;
    availableAnimalsForFiltering[log.animal] = (availableAnimalsForFiltering[log.badge] || 0) + 1;
    availableDistancesForFiltering[log.distance] = true;
    availableFursForFiltering[log.furtype] = (availableFursForFiltering[log.badge] || 0) + 1;
  });

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

    if (badgeFilter.length || animalFilter.length || furFilter.length) {
      console.log("---Filter---")

      badgeFilter.length && 
      (logsBeingFiltered = logs.filter(item => badgeFilter.includes(item.badge)));
      animalFilter.length && 
      (logsBeingFiltered = logsBeingFiltered.filter(item => animalFilter.includes(item.animal)));
      furFilter.length && 
      (logsBeingFiltered = logsBeingFiltered.filter(item => furFilter.includes(item.furtype)));



    } 

    setFilteredLogs(logsBeingFiltered);
  }, [badgeFilter, animalFilter, furFilter,  logs])


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
          {Object.keys(availableDistancesForFiltering).map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox onClick={() => console.log()} />
              <ListItemText primary={option} />
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