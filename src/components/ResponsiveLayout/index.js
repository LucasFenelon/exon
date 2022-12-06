import * as React from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TopBar from './TopBar';
import NavBar from './NavBar';
import SwipeableEdgeMenu from './SwipeableEdgeMenu';
import MiniVariantDrawerMenu from './MiniVariantDrawerMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ScoreIcon from '@mui/icons-material/Score';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InsightsIcon from '@mui/icons-material/Insights';
import GavelIcon from '@mui/icons-material/Gavel';
import AttributionIcon from '@mui/icons-material/Attribution';
import DescriptionIcon from '@mui/icons-material/Description';
import Menu from './Menu';

const drawerWidth = 240;

const menuList = [
  { id: 1, label: 'News', path: '/news', icon: NewspaperIcon },
  { id: 2, label: 'Sumário', path: '/summary', icon: SummarizeIcon },
  { id: 3, label: 'Resumo', path: '/resume', icon: DescriptionIcon },
  {
    id: 4,
    label: 'Traços de Portador',
    path: '/bearertraits',
    icon: AttributionIcon,
  },
  { id: 5, label: 'Escores de Risco', path: '/riskscore', icon: ScoreIcon },
  {
    id: 6,
    label: 'Perfil de medicações',
    path: '/medicalprofile',
    icon: PersonAddIcon,
  },
  { id: 7, label: 'Insights', path: '/insights', icon: InsightsIcon },
  { id: 8, label: 'Termos e condições', path: '/terms', icon: GavelIcon },
];

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '-webkit-fill-available',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#187EDC',
    minHeight: '64px',
    [theme.breakpoints.only('xs', 'sm')]: {
      minHeight: '56px',
    },
    position: 'fixed',
  },
  logoImg: {
    cursor: 'pointer',
    height: '38px',
    alignSelf: 'center',
  },
  menuProfile: {
    minHeight: '56px',
    cursor: 'pointer',
    position: 'absolute',
    right: '0',
    top: '0',
    padding: '14px',
  },
  list: {
    margin: '0px',
    padding: '0px',
  },
  listItem: {
    margin: '0px',
    padding: '8px 0px 8px 0px',
  },
  listText: {
    fontWeight: 'bold',
  },
  listIcon: {
    margin: '0px',
    padding: '0px',
  },
  main: {
    marginTop: '64px',
    [theme.breakpoints.only('xs', 'sm')]: {
      marginTop: '56px',
    },
  },
}));

const BottonMenuBox = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.only('xs', 'sm')]: {
    display: 'block',
  },
}));

const LeftMenuBox = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.only('xs', 'sm')]: {
    display: 'none',
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
  backgroundColor: '#E2EEFB',
  minHeight: '100%',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: 'none',
  backgroundColor: '#E2EEFB',
  minHeight: '100%',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor: '#187EDC',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  backgroundColor: 'transparent',
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function ResponsiveLayout({ children, title }) {
  const theme = useTheme();
  const router = useRouter();
  const classes = useStyles();
  //   const sxBox = stylesBox();
  const [open, setOpen] = React.useState(false);
  const [openBotton, setOpenBotton] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleToggle = () => {
    console.log('foi');
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawerBotton = (newOpenopenBotton) => () => {
    setOpenBotton(newOpenopenBotton);
  };

  const isSelected = (item) => {
    return router.pathname === item.path;
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
      <Box className={classes.logo}>
        <img src="/logo_exon.svg" alt="logo" className={classes.logoImg} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <LeftMenuBox>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  backgroundColor: '#187EDC',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </LeftMenuBox>
            <BottonMenuBox>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerBotton(true)}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </BottonMenuBox>
            <LeftMenuBox>
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
            </LeftMenuBox>
          </Toolbar>
        </AppBar>
        <LeftMenuBox>
          {/* <MiniVariantDrawerMenu
            itensList={['Inbox', 'Starred', 'Send email', 'Drafts']}
            toggleDrawerFunc={handleDrawerClose}
            openBotton={open}
          /> */}
          <Drawer
            variant="permanent"
            open={open}
            sx={{
              position: open
                ? { md: 'absolute', lg: 'absolute', xl: 'inherit' }
                : 'inherit',
            }}
          >
            <DrawerHeader>
              {open ? (
                <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              ) : (
                <div></div>
              )}
            </DrawerHeader>

            {menuList.map((item, index) => {
              const Icon = item.icon;
              return (
                <List href={item.path} passHref className={classes.list}>
                  <ListItem
                    key={item.id}
                    sx={{ display: 'block' }}
                    className={classes.listItem}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      className={classes.listIcon}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                        className={classes.listIcon}
                      >
                        <Icon
                          style={{
                            color: isSelected(item) && '#187EDC',
                          }}
                          className={classes.listIcon}
                        />
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          color: isSelected(item) && '#187EDC',
                        }}
                        primary={item.label}
                        sx={{ opacity: open ? 1 : 0 }}
                        className={classes.listText}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              );
            })}
          </Drawer>
        </LeftMenuBox>
        <Box
          component="main"
          className={classes.main}
          sx={{
            flexGrow: 1,
            p: 3,
            padding: 0,
            marginLeft: open ? { md: '65px', lg: '65px', xl: '0px' } : '0px',
          }}
        >
          <Menu menuToolbar={openMenu} />
          <div>{children}</div>
        </Box>
        <BottonMenuBox>
          <SwipeableEdgeMenu
            itensList={menuList}
            toggleDrawerFunc={toggleDrawerBotton}
            openBotton={openBotton}
          />
        </BottonMenuBox>
      </Box>
    </>
  );
}
