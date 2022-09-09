
import * as React from 'react';
import Title from './Title';

import Grid from '@mui/material/Grid';

// Generate Sales Data

export default function Chart()
{
  return (
    <React.Fragment>
      <Title>Settings</Title>
        <Grid container spacing={3} sx={{height:'100%', minHeight:'150px' }}>
          <Grid item xs={12} md={8} lg={6} sx={{ mt: 0, mb: 0, minHeight:'25%' }}>
            Logs Type
          </Grid>
          <Grid item xs={12} md={4} lg={6} sx={{ mt: 0, mb: 0, minHeight:'25%' }}>
            Logs Level
          </Grid> 
          <Grid item xs={12} md={4} lg={6} sx={{ mt: 0, mb: 0, minHeight:'25%' }}>
            Granularity
          </Grid>
          <Grid item xs={12} md={4} lg={6} sx={{ mt: 0, mb: 0, minHeight:'25%' }}>
            Importance
          </Grid> 
        </Grid>  
    </React.Fragment>
  );
}
