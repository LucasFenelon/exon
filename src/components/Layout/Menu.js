import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row-reverse" spacing={3} className={classes.menuNav}>
      <Box
        ref={anchorRef}
        id="composition-button"
        display="flex"
        alignItems="center"
        onClick={handleToggle}
        className={classes.menuProfile}
      >
        <AccountCircleIcon fontSize="large" color="primary" />
      </Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
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
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={handleClose}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={handleClose}
                  >
                    Logout
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
