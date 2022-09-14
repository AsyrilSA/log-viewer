import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

import './LogDisplay.css'


export default function Orders()
{
  return (
    <React.Fragment>

        <Grid container spacing={3} sx={{px:2, minHeight:'100%' }}>
          <Grid className="logger" item xs={12} sx={{ ml:4, mt: 0, mb: 0, height:390 }}>
          </Grid>
          <Grid item xs={12} md={4} lg={3} sx={{ mt: 0, mb: 0, minHeight:'10%' }}>
            <div className="search">
            <TextField sx={{ mt: 0, mb: 0}}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            />
            </div>
          </Grid>      
      </Grid>
    </React.Fragment>
  );
}
