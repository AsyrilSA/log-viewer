
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Deposits()
{
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <Box>
          <Button variant="contained"
          color="secondary">Import Logs</Button>
        </Box>
      </Box>

    </React.Fragment>
  );
}
