import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import EmailIcon from '@mui/icons-material/Email';

const useStyles = makeStyles((theme) => ({
  newsLetterBox: {
    borderRadius: '8px',
    margin: '0px',
    borderColor: 'white',
    backgroundColor: 'white',
    // minHeight: '200px',
    // minWidth: '300px',
    height: '200px',
    boxShadow: '2px 2px 2px #187EDC', //#888888
    '& .MuiCardContent-root': { padding: '8px' },
    [theme.breakpoints.only('xs', 'sm')]: {
      '& .MuiCardContent-root': {
        padding: '8px 0px',
      },
      justifyContent: 'center',
    },
  },
  boxSearch: {
    width: '100%',
    minWidth: '400px',
    padding: '8px 0px 8px 0px',
    [theme.breakpoints.only('xs')]: {
      minWidth: '40px',
    },
    [theme.breakpoints.only('sm')]: {
      minWidth: '540px',
    },
  },
  boxSearchArticles: {
    borderRadius: '12px',
    display: 'inline-flex',
    backgroundColor: 'grey',
    width: '100%',
    backgroundColor: '#E2EEFB',
  },
  searchIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '54px',
    minWidth: '54px',
    borderRadius: '12px',
    backgroundColor: '#187EDC',
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0px 8px 0px 8px',
  },
  typographyTitle: {
    [theme.breakpoints.only('xs', 'sm')]: {
      fontSize: '1.15rem',
    },
  },
}));

export default function ExonCardNotice({ content }) {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.newsLetterBox}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          className={classes.typographyTitle}
        >
          <b>Inscreva-se em nossa Newsletter:</b>
        </Typography>
        <Box className={classes.boxSearch}>
          <Box className={classes.boxSearchArticles}>
            <InputBase
              className={classes.searchInput}
              placeholder="Deigite seu E-mail"
            />
            <Box className={classes.searchIcon}>
              <EmailIcon sx={{ color: 'white' }} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
