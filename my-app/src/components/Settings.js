
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';

// Generate Sales Data

export default function Chart()
{
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Settings</Title>
    </React.Fragment>
  );
}
