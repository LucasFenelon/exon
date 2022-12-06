import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventNoteIcon from '@mui/icons-material/EventNote';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: '14',
    color: '#414142',
  },
  listItemIcon: {
    'min-width': '42px',
    color: '#414142',
  },
  weatherBox: {
    borderRadius: '8px',
    boxShadow: 'none',
    // margin: '0px 8px',
    borderColor: 'white',
    backgroundColor: 'white',
    minHeight: '356px',
    boxShadow: '2px 2px 2px #187EDC', //#888888
    // backgroundColor: 'white',
    // '& .MuiTypography-root': { margin: '0px', color: 'white' }
    '& .MuiCardContent-root': {
      padding: '8px',
      display: 'grid',
      justifyContent: 'center',
      minWidth: '300px',
    },
    [theme.breakpoints.only('lg')]: {
      '& .MuiCardContent-root': {
        minWidth: '240px',
      },
    },
    [theme.breakpoints.only('md')]: {
      '& .MuiCardContent-root': {
        justifyContent: 'center',
      },
    },
  },
  weatherImg: {
    width: '64px',
    height: '64px',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  // .header{
  //     background-color: #424242;
  //     color: whitesmoke;
  //     padding: 10px;
  //     font-size: 28px;
  //     border-radius: 15px;
  //     font-family: 'Recursive', sans-serif;
  // }
  weatherBoxColunmflex: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '400px',
    [theme.breakpoints.only('xs')]: {
      minWidth: '40px',
    },
    [theme.breakpoints.only('sm')]: {
      minWidth: '540px',
    },
    [theme.breakpoints.only('md', 'lg')]: {
      minWidth: '240px',
    },
  },
  weatherBoxColunmflexImage: {
    width: '90%',
  },
  weatherBoxColunmGrid: {
    display: 'grid',
    alignContent: 'center',
  },
  weatherBoxColunmGridImage: {
    padding: '4px 0px',
    display: 'flex',
    width: '100%',
  },
  weatherBoxColunmGridButton: {
    width: '100%',

    display: 'grid',
    alignContent: 'center',
    textAlign: 'initial',
    padding: '0px 8px',
    backgroundColor: '#E2EEFB',
    borderRadius: '8px',
    // minWidth: '240px',
    color: 'white',
    // '& .MuiTypography-root': { color: 'white' },
    [theme.breakpoints.only('xs', 'sm')]: {
      height: '150px',
    },
  },

  typographyPlace: {
    [theme.breakpoints.only('xs', 'sm')]: {
      fontSize: '1.15rem',
    },
  },
  typographyCapsule: {
    color: '#899BA8',
    // '& .MuiTypography-root': { color: 'white' }
    [theme.breakpoints.only('xs', 'sm')]: {
      fontSize: '1rem',
    },
  },
  typographyDay: {
    color: 'white',
    // '& .MuiTypography-root': { color: 'white' }
    [theme.breakpoints.only('xs', 'sm')]: {
      fontSize: '1rem',
    },
  },
  typographyTemp: {
    fontFamily: 'Recursive, sans-serif',
  },
  typographyHumity: {
    fontFamily: 'Recursive, sans-serif',
    [theme.breakpoints.only('xs', 'md', 'lg')]: {
      display: 'none',
    },
  },
  primaryText: { color: '#187EDC' },
  secondText: { color: '#899BA8' },
}));

export default function BasicCard({ weatherData, day }) {
  const classes = useStyles();
  day = moment().format('dddd');

  return (
    <Card variant="outlined" className={classes.weatherBox}>
      <CardContent>
        <Box className={classes.weatherBoxColunmflex}>
          <Box className={classes.weatherBoxColunmGridButton}>
            <Box sx={{ display: 'flex' }}>
              <EventNoteIcon
                sx={{ color: '#899BA8', height: '100%', width: '64px' }}
              />
              <Box className={classes.weatherBoxColunmGrid}>
                <Typography className={classes.typographyCapsule} variant="h6">
                  Capsulas de {day}
                </Typography>
                <Typography
                  className={classes.typographyCapsule}
                  variant="sublite1"
                >
                  <span className={classes.secondText}>
                    <b>Atualize-me em tempo real</b>
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'grid', margin: '8px 0px 0px 0px' }}>
              <Typography className={classes.typographyDay} variant="h6">
                {moment().format('LL')}
              </Typography>
              <Box
                sx={{ display: 'flex', cursor: 'pointer', marginTop: '5px' }}
              >
                <Typography className={classes.typographyDay} variant="body2">
                  <span className={classes.primaryText}>Avise-me</span>
                </Typography>
                <ArrowForwardIcon
                  className={classes.primaryText}
                  sx={{ height: '70%' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={classes.weatherBoxColunmflex}
          sx={{ margin: '12px 0px' }}
        >
          <Box className={classes.weatherBoxColunmGrid}>
            {/* <div> */}
            <Typography
              variant="h6"
              gutterBottom
              className={classes.typographyPlace}
            >
              <span className={classes.secondText}>
                {weatherData.name}, <b>{weatherData.sys.country}</b>
              </span>
            </Typography>
            {/* </div> */}
          </Box>
        </Box>
        <Box
          className={classes.weatherBoxColunmflexImage}
          sx={{
            borderRadius: '8px',
            backgroundColor: '#E2EEFB',
            minWidth: '0px',
            width: '100%',
          }}
        >
          <Box className={classes.weatherBoxColunmGridImage}>
            <img
              src={
                'http://openweathermap.org/img/wn/' +
                weatherData.weather[0].icon +
                '.png'
              }
              alt="logo"
              className={classes.weatherImg}
            />
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'end' }}>
              <Typography className={classes.typographyTemp} variant="h4">
                &emsp;{weatherData.main.temp} &deg;C
              </Typography>
              <Typography className={classes.typographyHumity} variant="body1">
                &emsp;&emsp;e&emsp;Humidade: {weatherData.main.humidity}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button sx={{ color: 'white' }} size="small">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
