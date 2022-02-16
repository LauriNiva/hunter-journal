import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';


function LogFilteringList({ logs, setFilteredLogs }) {

  console.log('logs to filter', logs)

  const [badgeOpen, setBadgeOpen] = useState(false);

  return (
    <Paper elevation={6}>
      <List>
        <ListSubheader sx={{ bgcolor: "inherit" }} >
          Filter Logs
        </ListSubheader>

        <ListItemButton>
          <ListItemIcon>
            <MilitaryTechIcon />
          </ListItemIcon>
          <ListItemText primary="Badge" />
          {badgeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Rating" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Animal" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Distance" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Fur" />
        </ListItemButton>
      </List>

    </Paper>
  )
}

export default LogFilteringList;