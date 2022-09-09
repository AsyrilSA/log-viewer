
import * as React from 'react';
import Button from '@mui/material/Button';
import Title from './Title';
import Box from '@mui/material/Box';

function preventDefault(event)
{
  event.preventDefault();
}

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
          height: 200
        }}
      >
        <Box sx={{ height: 56 }}>
          <Button variant="contained">Open Import Dialog</Button>
        </Box>
      </Box>

    </React.Fragment>
  );
}
