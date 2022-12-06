import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Head from 'next/head';
import TopBar from './TopBar';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    overflow: 'hidden',
    width: '100vw',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: '8px',
  },
  wrapperFull: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 8,
    },
  },
  wrapperMenu: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

function Layout({ children, title }) {
  const classes = useStyles();
  const [menuToolbar, setMenuToolbar] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [wrapperNav, setWrapperNav] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenNav(open);
    setWrapperNav(classes.wrapperMenu ? openNav : classes.wrapperFull);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewpoint"
          content="initial-scale-1.0, width-device-width"
        />
      </Head>
      <div className={classes.root}>
        <TopBar toggleDrawerNav={toggleDrawer} />
        <NavBar toggleDrawerNav={toggleDrawer} open={openNav} />
        <div className={(classes.wrapper, wrapperNav)}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
