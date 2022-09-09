
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './components/Menu';
import Settings from './components/Settings';
import Import from './components/Import';
import LogDisplay from './components/LogDisplay';

function Copyright(props)
{
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://asyril.com/">
        Asyril SA
      </Link>{' '}
      {new Date(2022, 8, 22).getFullYear()}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#dbf5ff',
      dark: '#a9c2cc',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffeff7',
      dark: '#ccbdc4',
      contrastText: '#000000',
    },
  },
});

function DashboardContent()
{
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () =>
  {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Log Viewer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height:'85%' }}>
            <Grid container spacing={3} sx={{height:'90%' }}>
              {/* Settings */}
              <Grid item xs={12} md={8} lg={9} sx={{ mt: 0, mb: 0, minHeight:'30%' }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height:'100%' 

                  }}
                >
                  <Settings />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} sx={{ mt: 0, mb: 0, minHeight:'30%' }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height:'100%'
                  }}
                >
                  <Import />
                </Paper>
              </Grid>
            
              {/* Recent Orders */}
              <Grid item xs={12} sx={{ mt: 0, mb: 4, minHeight:'79%' }}>
                <Paper sx={{ pt: 2, display: 'flex', flexDirection: 'column',minHeight:'100%'}}>
                  <LogDisplay />
                </Paper>
              </Grid>     
              <Grid item xs={12} sx={{ mt: 0, mb: 0, height:'2%' }}>
                <Copyright sx={{ pt: 0, height: 20 }} />
              </Grid>     
            </Grid>  
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard()
{
  return <DashboardContent />;
}
