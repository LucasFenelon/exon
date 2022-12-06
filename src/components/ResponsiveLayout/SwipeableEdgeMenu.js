import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Router from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Logout from './Logout';
import ItensBar from './ItensBar';

const drawerBleeding = 56;

const useStyles = makeStyles((theme) => ({
  menuList: {
    display: 'grid',
    'justify-items': 'left',
  },
}));

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

function SwipeableEdgeDrawer({ itensList, toggleDrawerFunc, openBotton }) {
  const open = openBotton;
  const classes = useStyles();

  const toggleDrawer = toggleDrawerFunc;

  const handleProfile = (event) => {
    Router.push('/profile');
  };

  const handleAccount = (event) => {
    Router.push('/account');
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        ></StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <ItensBar itensList={itensList} />
          <Divider />
          <MenuList
            id="composition-menu-botton"
            aria-labelledby="composition-button-botton"
            classes={{ root: classes.menuList }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleAccount}>My account</MenuItem>
            <MenuItem>
              <Logout />
            </MenuItem>
          </MenuList>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
