import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AccountContext } from 'src/components/ExonAccounts';
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
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
  menuProfile: {
    minHeight: '56px',
    cursor: 'pointer',
  },
}));

function TopBar({ toggleDrawerNav }) {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const { logout } = useContext(AccountContext);

  const handleToggle = () => {
    console.log('foi');
    setOpenMenu((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <AppBar className={classes.root} color="primary">
        <Toolbar className={classes.toolbar}>
          <Box display="flex" alignItems="center">
            <MenuIcon onClick={toggleDrawerNav(true)} />
          </Box>
          <Box className={classes.logo}>
            <img src="/logo_exon.svg" alt="logo" className={classes.logoImg} />
          </Box>
          <Box
            // ref={anchorRef}
            id="composition-button"
            display="flex"
            alignItems="center"
            onClick={handleToggle}
            className={classes.menuProfile}
          >
            <AccountCircleIcon fontSize="large" color="white" />
          </Box>
        </Toolbar>
      </AppBar>
      <Menu menuToolbar={openMenu} />
    </div>
  );
}

export default TopBar;
