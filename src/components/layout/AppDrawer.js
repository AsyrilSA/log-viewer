import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import {Link } from "react-router-dom";


export default function AppDrawer() {
  return (
    <div>
        <React.Fragment>
          <Drawer
          variant="permanent"
          >
            <Box sx={{ width: 240 }}>
                <ListItemButton>
                    <ListItemText><Link to="/home">Home</Link></ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                    <ListItemText><Link to="/baseinformations">Base Informations</Link></ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                    <ListItemText><Link to="/advancedpage">Advanced Informations</Link></ListItemText>
                </ListItemButton>
            </Box>
          </Drawer>
        </React.Fragment>

    </div>
  );
}
