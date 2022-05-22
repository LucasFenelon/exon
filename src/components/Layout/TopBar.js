import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    zIndex: 0,
    backgroundColor: '#187EDC',
  },
  toolbar: {
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#ffffff',
  },
  logo: {
    width: '-webkit-fill-available',
    display: 'flex',
    justifyContent: 'center',
  },
  logoImg: {
    cursor: 'pointer',
    height: '38px',
  },
}));

function TopBar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} color="primary">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <MenuIcon />
        </Box>
        <Box className={classes.logo}>
          <img src="/logo_exon.svg" alt="logo" className={classes.logoImg} />
        </Box>
        {/* <Box display="flex" alignItems="center">
          <AccountCircleIcon fontSize="large" color="primary" />
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
