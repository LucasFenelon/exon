import React, { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Router from 'next/router';
import { AccountContext } from 'src/components/ExonAccounts';
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: '240px',
  },
  menuNav: {
    maxHeight: '56px',
    flexDirection: 'row-reverse',
  },
  menuProfile: {
    minHeight: '56px',
    paddingRight: theme.spacing(2),
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3),
    },
  },
  menuPapper: {
    'min-width': '120px',
    'border-radius': '0px',
    backgroundColor: '#187EDC',
    zIndex: '1',
    boxShadow: 'none',
  },
  menuList: {
    display: 'grid',
    'justify-items': 'left',
  },
  menuItem: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: 'white',
    cursor: 'pointer',
  },
}));

function MenuListComposition({ menuToolbar }) {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const { logout } = useContext(AccountContext);
  var [open, setOpen] = useState({ menuToolbar });
  open = menuToolbar;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleProfile = (event) => {
    Router.push('/profile');
    handleClose(event);
  };

  const handleAccount = (event) => {
    Router.push('/account');
    handleClose(event);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (
      anchorRef.current != null &&
      prevOpen.current === true &&
      open === false
    ) {
      console.log(anchorRef.current);
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row-reverse" spacing={3} className={classes.menuNav}>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{
          zIndex: '1',
          marginTop: '64px',
          left: 'none',
        }}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'right top',
            }}
          >
            <Paper classes={{ root: classes.menuPapper }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  classes={{ root: classes.menuList }}
                >
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={handleProfile}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={handleAccount}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={handleClose}
                  >
                    <Logout />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Stack>
  );
}

export default MenuListComposition;
