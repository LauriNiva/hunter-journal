import React, { useState } from 'react';
import { Checkbox, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';

function LogFilteringList({ logs, setFilteredLogs }) {

  console.log('logs to filter', logs)

  const [badgeOpen, setBadgeOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [animalOpen, setAnimalOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [furOpen, setFurOpen] = useState(false);

  let badgeForFiltering = {};
  let animalForFiltering = {};
  let distanceForFiltering = {};
  let furForFiltering = {};

  badgeForFiltering = {};
  animalForFiltering = {};
  distanceForFiltering = {};
  furForFiltering = {};



  logs.forEach(log => {
    badgeForFiltering[log.badge] = (badgeForFiltering[log.badge] || 0 ) + 1 ;
    animalForFiltering[log.animal] = true;
    distanceForFiltering[log.distance] = true;
    furForFiltering[log.furtype] = true;
  });


  console.log('badgeForFiltering', badgeForFiltering)

  const Badgefilter = () => {
    return (
      <Collapse in={badgeOpen}>
        <List>
          {Object.keys(badgeForFiltering).map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox onClick={() => console.log()} />
              <ListItemText primary={option} />
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
          {Object.keys(animalForFiltering).map((option) =>
            <ListItemButton key={option} dense>
              <Checkbox onClick={() => console.log()} />
              <ListItemText primary={option} />
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
        {Object.keys(distanceForFiltering).map((option) =>
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
        {Object.keys(furForFiltering).map((option) =>
          <ListItemButton key={option} dense>
            <Checkbox onClick={() => console.log()} />
            <ListItemText primary={option} />
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