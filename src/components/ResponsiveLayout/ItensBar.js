import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: '14',
    color: '#414142',
  },
  listItemIcon: {
    'min-width': '42px',
    color: '#414142',
  },
}));

function ItensBar({ itensList }) {
  const classes = useStyles();
  const router = useRouter();

  const isSelected = (item) => {
    return router.pathname === item.path;
  };

  return itensList.map((item) => {
    const Icon = item.icon;

    return (
      <Link href={item.path}>
        <ListItem key={item.id} selected={isSelected(item)}>
          <ListItemIcon className={classes.listItemIcon}>
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
  });
}

export default ItensBar;
