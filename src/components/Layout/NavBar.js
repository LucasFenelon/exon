import { useRouter } from 'next/router';
import Router from 'next/router';
import Link from 'next/link'
import {
  makeStyles,
  Hidden,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSubheader,
  Avatar,
  Typography,
  Button,
  Icon,
} from '@material-ui/core';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ScoreIcon from '@mui/icons-material/Score';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InsightsIcon from '@mui/icons-material/Insights';
import GavelIcon from '@mui/icons-material/Gavel';
import AttributionIcon from '@mui/icons-material/Attribution';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: '240px',
  },
  desktopDrawer: {
    width: '240px',
    top: '56px',
    /* height: 'calc(100% - 64px)', */
    borderRight: 'none',
    backgroundColor: '#E2EEFB',
  },
  avatar: {
    cursor: 'pointer',
    width: '24px',
    height: '24px',
  },
  listItem: {
    /*
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: theme.spacing(3), */
  },
  listItemText: {
    fontSize: '14',
    color: '#414142',
  },
  listItemIcon: {
    'min-width': '42px',
    color: '#414142',
  },
}));

const menu = [
  { id: 1, label: 'Sumário', path: '/summary', icon: SummarizeIcon },
  { id: 2, label: 'Traços de Portador', path: '/bearertraits', icon: AttributionIcon },
  { id: 3, label: 'Escores de Risco', path: '/riskscore', icon: ScoreIcon },
  { id: 4, label: 'Perfil de medicações', path: '/medicalprofile', icon: PersonAddIcon },
  { id: 5, label: 'Insights', path: '/insights', icon: InsightsIcon },
  { id: 6, label: 'Termos e condições', path: '/terms', icon: GavelIcon },
];

function NavBar() {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = (item) => {
    return router.pathname === item.path;
  };
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <List>
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={item.path} passHref>
              <ListItem
                key={item.id}
                button
                classes={{ root: classes.listItem }}
                selected={isSelected(item)}
              >
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  <Icon
                    style={{
                      color: isSelected(item) && '#187EDC',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.listItemText,
                  }}
                  primary={item.label}
                  style={{
                    textDecoration: isSelected(item) && 'underline',
                  }}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
  return (
    <Hidden mdDown>
      <Drawer
        anchor="left"
        classes={{ paper: classes.desktopDrawer }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  );
}

export default NavBar;