import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import ResponsiveLayout from 'src/components/ResponsiveLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { AccountContext } from 'src/components/ExonAccounts';
import ExonCardNewsLetter from 'src/components/ExonCardNewsLetter';
import ExonCardNotice from 'src/components/ExonCardNotice';
import ExonCardNoticeSmall from 'src/components/ExonCardNoticeSmall';
import ExonCardWeather from 'src/components/ExonCardWeather';
import Typography from '@mui/material/Typography';
import Router from 'next/router';
import moment from 'moment';
import absoluteUrl from 'next-absolute-url';
import Modal from '@mui/material/Modal';

const useStyles = makeStyles((theme) => ({
  boxBackground: {
    minHeight: '1200px',
    position: 'fixed',
    zIndex: '-1',
    marginTop: '264px',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  },
  boxBackgroundContent: {
    width: '95%',
    height: '100%',
    backgroundColor: '#E2EEFB',
    position: 'absolute',
    borderRadius: '8px 8px 0px 0px',
    marginLeft: '-3.4%',
    [theme.breakpoints.only('xs')]: {
      marginLeft: '0px',
    },
    [theme.breakpoints.only('sm')]: {
      width: '88%',
      marginLeft: '-8.5%',
    },
    [theme.breakpoints.only('md')]: {
      width: '91%',
      marginLeft: '-6%',
    },
    [theme.breakpoints.only('lg')]: {
      width: '93%',
      marginLeft: '-5%',
    },
  },
  boxGrid: {
    boxShadow: 'none',
    padding: '8px 8px 8px 8px',
    width: '100%',
    '& .MuiGrid-root': { width: '100%' },
    '& .MuiGrid-item': { padding: '8px' },
    '& .MuiGrid-container': { margin: '0px' },
    '& .MuiTypography-root': { margin: '0px', color: '#414142' },
  },
  boxSearch: {
    width: '100%',
    padding: '0px 8px 0px 8px',
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
  primarytext: { color: '#187EDC' },
  paperLayout: {
    zIndex: -2,
    borderRadius: '0px',
  },
  boxItemImg: {
    alignItems: 'center',
    textAlign: 'center',
  },
  weatherBox: {
    borderRadius: '0px',
    boxShadow: 'none',
    borderColor: '#187EDC',
    maxWidth: '350px',
  },
  youtubeModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '340px',
    // backgroundColor: 'white',
    // border: '2px solid #FFF',
    // boxShadow: 24,
    // p: 4,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export async function getServerSideProps(context) {
  const { origin } = absoluteUrl(context.req);
  return { props: { url: origin } };
}

function News(props) {
  const classes = useStyles();
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(false);
  const [news, setNews] = useState(false);
  const [newsSmall, setNewsSmall] = useState(false);
  const [day, setDay] = useState(moment().format('dddd'));
  const { getSession, sessionLost } = useContext(AccountContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getSession()
      .then((session) => {
        // console.log('Session:', session);
        setStatus(true);
      })
      .catch(() => {
        console.error('Failed to login!');
        sessionLost;
        setStatus(false);
        Router.push('/');
      });

    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      //   console.log('REACT_APP_API_URL');
      //   console.log(process.env.REACT_APP_API_URL);
      //   console.log('REACT_APP_API_KEY');
      //   console.log(process.env.REACT_APP_API_KEY);
      const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5';
      const REACT_APP_API_KEY = '47b155e6cae0b1fd304674eaa4066e66';

      await fetch(
        `${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`,
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };

    const fetchNews = async (url, setFunc) => {
      await fetch(url, { method: 'GET' })
        .then((res) => res.json())
        .then((result) => {
          setFunc(result);
        });
    };

    fetchData();
    fetchNews(
      'https://newsapi.org/v2/top-headlines?country=br&category=health&apiKey=649f8af66c924c4a958b14ce53db321f',
      setNews,
    );
    fetchNews(
      'https://newsapi.org/v2/everything?q=alimentação&apiKey=649f8af66c924c4a958b14ce53db321f',
      setNewsSmall,
    );
  }, [lat, long]);

  return (
    <div>
      {status ? (
        <ResponsiveLayout title="News">
          <Box className={classes.boxBackground}>
            <Box className={classes.boxBackgroundContent}></Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={12}
            >
              <Grid item md={12} lg={6}>
                <Box
                  sx={{ flexGrow: 1 }}
                  className={classes.boxGrid}
                  onClick={handleOpen}
                >
                  <Typography variant="h3" gutterBottom>
                    Good <b>{day}, </b>
                    <span className={classes.primarytext}>
                      <b>Lucas</b>
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12} lg={6} className={classes.gridItem}>
                <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
                  <Box className={classes.boxSearch}>
                    <Box className={classes.boxSearchArticles}>
                      {/* <StyledInputBase
                        placeholder="Procure mais artigos …"
                        inputProps={{ 'aria-label': 'search' }}
                      /> */}
                      <InputBase
                        className={classes.searchInput}
                        placeholder="Procure mais artigos …"
                      />
                      <Box className={classes.searchIcon}>
                        <SearchIcon sx={{ color: 'white' }} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={7} lg={9}>
                <Box
                  sx={{
                    flexGrow: 1,
                    '& .MuiPaper-root': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                  className={classes.boxGrid}
                >
                  <ExonCardNotice content={news} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                lg={3}
                style={{ textAlign: '-webkit-center' }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    '& .MuiPaper-root': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                  className={classes.boxGrid}
                >
                  {typeof data.main != 'undefined' ? (
                    <ExonCardWeather weatherData={data} day={day} />
                  ) : (
                    <div>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  sx={{
                    flexGrow: 1,
                    '& .MuiPaper-root': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                  className={classes.boxGrid}
                >
                  <ExonCardNewsLetter />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  sx={{
                    flexGrow: 1,
                    '& .MuiPaper-root': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                  className={classes.boxGrid}
                >
                  <ExonCardNoticeSmall content={newsSmall} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  sx={{
                    flexGrow: 1,
                    '& .MuiPaper-root': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                  className={classes.boxGrid}
                >
                  {/* <ExonCardNotice content={news} /> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.youtubeModal}>
              <iframe
                src={props.url + '/fitnessnews.html'}
                width="600"
                height="340"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </Box>
          </Modal>
        </ResponsiveLayout>
      ) : (
        sessionLost
      )}
    </div>
  );
}

export default News;
