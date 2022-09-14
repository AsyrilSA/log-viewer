
import * as React from 'react';
import {Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

 const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemText><Link to="/home">Home</Link></ListItemText>
    </ListItemButton>
    <ListItemButton>
      <ListItemText><Link to="/baseinformations">Base Informations</Link></ListItemText>
    </ListItemButton>
    <ListItemButton>
      <ListItemText><Link to="/advancedpage">Advanced Informations</Link></ListItemText>
    </ListItemButton>
  </React.Fragment>
);

export default mainListItems
