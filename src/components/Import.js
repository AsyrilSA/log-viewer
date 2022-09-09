
import * as React from 'react';
import Button from '@mui/material/Button';
import Title from './Title';
import Box from '@mui/material/Box';

export default function Deposits()
{
  return (
    <React.Fragment>
      <Title>Import Logs</Title>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <Box sx={{ height: 56 }}>
          <Button variant="contained">Open Import Dialog</Button>
        </Box>
      </Box>

    </React.Fragment>
  );
}
