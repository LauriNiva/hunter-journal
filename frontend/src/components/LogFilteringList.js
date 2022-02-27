import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';
import RadarIcon from '@mui/icons-material/Radar';

function LogFilteringList({ logs, setFilteredLogs }) {

  //console.log('logs to filter', logs)

  const [badgeOpen, setBadgeOpen] = useState(false);
  const [animalOpen, setAnimalOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [furOpen, setFurOpen] = useState(false);
  const [weaponOpen, setWeaponOpen] = useState(false);
  const [weapontypeOpen, setWeapontypeOpen] = useState(false);
  const [ammoOpen, setAmmoOpen] = useState(false);


  const [badgeFilter, setBadgeFilter] = useState([]);
  const [animalFilter, setAnimalFilter] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState([]);
  const [furFilter, setFurFilter] = useState([]);
  const [weaponFilter, setWeaponFilter] = useState([]);
  const [weapontypeFilter, setWeapontypeFilter] = useState([]);
  const [ammoFilter, setAmmoFilter] = useState([]);

  const [availableBadgesForFiltering, setAvailableBadgesForFiltering] = useState({});
  const [availableAnimalsForFiltering, setAvailableAnimalsForFiltering] = useState({});
  const [availableDistancesForFiltering, setAvailableDistancesForFiltering] = useState([]);
  const [availableFursForFiltering, setAvailableFursForFiltering] = useState({});
  const [availableWeaponsForFiltering, setAvailableWeaponsForFiltering] = useState({});
  const [availableWeapontypesForFiltering, setAvailableWeapontypesForFiltering] = useState({});
  const [availableAmmoForFiltering, setAvailableAmmoForFiltering] = useState({});

  useEffect(() => {
    //Check available items for the filtering

    let badges = {};
    let animals = {};
    let furs = {};
    let distances = { '-0': 0, '1-49': 0, '50-499': 0, '500-999': 0, '1000-': 0 };
    let weapons = {};
    let weapontypes = {};
    let ammo = {};

    logs.forEach(log => {
      badges[log.badge] = (badges[log.badge] || 0) + 1;
      animals[log.animal] = (animals[log.animal] || 0) + 1;
      furs[log.furtype] = (furs[log.furtype] || 0) + 1;
      weapons[log.weapon] = (weapons[log.weapon] || 0) + 1;
      weapontypes[log.weapontype] = (weapontypes[log.weapontype] || 0) + 1;
      ammo[log.ammo] = (ammo[log.ammo] || 0) + 1;

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

    setAvailableBadgesForFiltering(badges);
    setAvailableAnimalsForFiltering(animals);
    setAvailableDistancesForFiltering(filteredDistances);
    setAvailableFursForFiltering(furs);
    setAvailableWeaponsForFiltering(weapons);
    setAvailableWeapontypesForFiltering(weapontypes);
    setAvailableAmmoForFiltering(ammo);

  }, [logs])

  const toggleFilter = (filter, setter, option) => {
    if (filter.includes(option)) {
      setter(filter.filter(item => item !== option))
    } else {
      setter([...filter, option])
    }
  };


  useEffect(() => {
    //Do the actual filtering of the logs
    console.log("Filtering the logs...");


    let logsBeingFiltered = logs;

    if (badgeFilter.length || animalFilter.length || furFilter.length ||
      distanceFilter.length || weaponFilter.length || weapontypeFilter.length ||
      ammoFilter.length) {

      badgeFilter.length &&
        (logsBeingFiltered = logs.filter(item => badgeFilter.includes(item.badge)));

      animalFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => animalFilter.includes(item.animal)));

      furFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => furFilter.includes(item.furtype)));

      weaponFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => weaponFilter.includes(item.weapon)))

      weapontypeFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => weapontypeFilter.includes(item.weapontype)))

      ammoFilter.length &&
        (logsBeingFiltered = logsBeingFiltered.filter(item => ammoFilter.includes(item.ammo)))


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
  }, [badgeFilter, animalFilter, furFilter, distanceFilter, weaponFilter, weapontypeFilter, ammoFilter, logs, setFilteredLogs]);

  const resetFilters = () => {
    setAnimalFilter([]);
    setDistanceFilter([]);
    setBadgeFilter([]);
    setFurFilter([]);
    setWeaponFilter([]);
    setWeapontypeFilter([]);
  };


  const Badgefilter = () => {
    return (
      <Collapse in={badgeOpen}>
        <List>
          {Object.keys(availableBadgesForFiltering).map((option) =>
            <ListItemButton key={option} dense onClick={() => toggleFilter(badgeFilter, setBadgeFilter, option)}>
              <Checkbox checked={badgeFilter.includes(option)} />
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
            <ListItemButton key={option} dense onClick={() => toggleFilter(animalFilter, setAnimalFilter, option)} >
              <Checkbox checked={animalFilter.includes(option)} />
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
            <ListItemButton key={option[0]} dense onClick={() => toggleFilter(distanceFilter, setDistanceFilter, option[0])}>
              <Checkbox checked={distanceFilter.includes(option[0])} />
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
            <ListItemButton key={option} dense onClick={() => toggleFilter(furFilter, setFurFilter, option)}>
              <Checkbox checked={furFilter.includes(option)} />
              <ListItemText primary={`${option} (${availableFursForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };

  const Weaponfilter = () => {
    return (
      <Collapse in={weaponOpen}>

        <List>
          {Object.keys(availableWeaponsForFiltering).map((option) =>
            <ListItemButton onClick={() => toggleFilter(weaponFilter, setWeaponFilter, option)} key={option} dense>
              <Checkbox checked={weaponFilter.includes(option)} />
              <ListItemText primary={`${option} (${availableWeaponsForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };

  const Ammofilter = () => {
    return (
      <Collapse in={ammoOpen}>

        <List>
          {Object.keys(availableAmmoForFiltering).map((option) =>
            <ListItemButton key={option} dense onClick={() => toggleFilter(ammoFilter, setAmmoFilter, option)}>
              <Checkbox checked={ammoFilter.includes(option)} />
              <ListItemText primary={`${option} (${availableAmmoForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };
  const Weapontypefilter = () => {
    return (
      <Collapse in={weapontypeOpen}>

        <List>
          {Object.keys(availableWeapontypesForFiltering).map((option) =>
            <ListItemButton key={option} dense onClick={() => toggleFilter(weapontypeFilter, setWeapontypeFilter, option)} >
              <Checkbox checked={weapontypeFilter.includes(option)} />
              <ListItemText primary={`${option} (${availableWeapontypesForFiltering[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };



  //Pohja yleiselle filterille. Ei käytössä vielä
  const NewFilter = (open, availableFiltersArray, filter, setFilter) => {
    console.log('availableFiltersArray', availableFiltersArray)
    return (
      <Collapse in={open}>
        <List>
          {availableFiltersArray.map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox checked={filter.includes(option)}
                onClick={() => toggleFilter(filter, setFilter, option)} />
              <ListItemText primary={`${option}} (${availableFiltersArray[option]})`} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    )
  };


  return (
    <Paper sx={{ maxHeight: '80vh', overflow: 'scroll', }} elevation={6}>
      <List>
        <Button onClick={() => resetFilters()}>Clear filters</Button>


        <ListItemButton onClick={() => setBadgeOpen(!badgeOpen)}>
          <ListItemIcon>
            <MilitaryTechIcon />
          </ListItemIcon>
          <ListItemText primary="Badge" />
          {badgeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Badgefilter />
        {/* <NewFilter open={badgeOpen} availableFiltersArray={availableBadgesForFiltering}
        filter={badgeFilter} setFilter={setBadgeFilter}/> */}

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

        <ListItemButton onClick={() => setWeaponOpen(!weaponOpen)} >
          <ListItemIcon>
            <RadarIcon />
          </ListItemIcon>
          <ListItemText primary="Weapon" />
          {weaponOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Weaponfilter />

        <ListItemButton onClick={() => setWeapontypeOpen(!weapontypeOpen)} >
          <ListItemIcon>
            <RadarIcon />
          </ListItemIcon>
          <ListItemText primary="Weapontype" />
          {weapontypeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Weapontypefilter />

        <ListItemButton onClick={() => setAmmoOpen(!ammoOpen)} >
          <ListItemIcon>
            <RadarIcon />
          </ListItemIcon>
          <ListItemText primary="Ammo" />
          {ammoOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Ammofilter />

      </List>
    </Paper>
  )
}

export default LogFilteringList;