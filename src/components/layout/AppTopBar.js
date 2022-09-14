import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './AppPage.css'

const AppTopBar = (props) => {

  return (
    <div>
      <AppBar position='fixed' sx={{ width: 'calc(100% - 240px)', ml:'240px' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Log Viewer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppTopBar;
