import React, { useState, useContext, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from 'src/components/Layout';
import ResponsiveLayout from 'src/components/ResponsiveLayout';
import { styled } from '@mui/material/styles';
import Router from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Typography } from '@material-ui/core';
import { AccountContext } from 'src/components/ExonAccounts';

const useStyles = makeStyles((theme) => ({
  boxGrid: {
    boxShadow: 'none',
    padding: '64px 8px 8px 8px',
  },
  paperLayout: {
    zIndex: -2,
    borderRadius: '0px',
  },
  boxItemImg: {
    alignItems: 'center',
    textAlign: 'center',
  },
  // paperLayout:{
  //   '& span': {
  //     height: '400px',
  //     maxWidth: '400px',
  //     maxHeight: '400px',
  //     position: 'absolute',
  //     borderRadius: '100%',
  //   }
  // }
}));

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const summaryItens = [
  {
    id: 0,
    label: 'Tireóide',
    percentual: 0.25,
    backgroundColor: '#187EDC',
    path: '/nutrition',
  },
  {
    id: 1,
    label: 'Mama e ovário',
    percentual: 0.2,
    backgroundColor: '#EAD617',
    path: '/oncology',
  },
  {
    id: 2,
    label: 'Próstata',
    percentual: 0.15,
    backgroundColor: '#C63329',
    path: '/cardiovascular',
  },
  {
    id: 3,
    label: 'Pâncreas',
    percentual: 0.1,
    backgroundColor: '#000000',
    path: '/medicine',
  },
  {
    id: 4,
    label: 'Renal',
    percentual: 0.1,
    backgroundColor: '#78C74D',
    path: '/ancestry',
  },
  {
    id: 5,
    label: 'Pele',
    percentual: 0.2,
    backgroundColor: '#D7D7D7',
    path: '/fitness',
  },
];

export const dataSummaryChart = {
  labels: summaryItens.map((item) => {
    return item.label;
  }),
  datasets: [
    {
      //data: [summaryItens[0].percentual, summaryItens[1].percentual, summaryItens[2].percentual, summaryItens[3].percentual, summaryItens[4].percentual, summaryItens[5].percentual],
      data: summaryItens.map((item) => {
        return item.percentual;
      }),
      backgroundColor: summaryItens.map((item) => {
        return item.backgroundColor;
      }),
      cutout: '70%',
      hoverOffset: -75,
    },
  ],
};

const imageChartCenter = {
  id: 'imageChartCenter',
  afterDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
    } = chart;
    ctx.save();
    let image = new window.Image();
    image.src = '/thumbs/dna_vector.svg';
    // image.style.border = '4px solid #999'
    // image.style.borderRadius = '100%'
    // const imageSize = 400
    const diffTitle = 44;
    const imageSize = width * 0.4 > 400 ? 400 : width * 0.4;
    const imgWidth = width / 2 - imageSize / 2; // (818.5/2)-(40/2) = 389.25 --165
    const imgHegight = height / 2 - imageSize / 2 + diffTitle; // (786/2)-(40/2) = 373 -- 140
    // console.log(image)
    // console.log(width*0.4 + ' width percentual')
    // console.log(imageSize + ' imageSize')
    // console.log(top + ' top e ' + right + ' right e ' + bottom + ' bottom e ' + left + ' left e ' + width + ' widthe e ' + height + ' height e ' + imgWidth + ' imgWidth e ' + imgHegight + ' imgHegight')
    ctx.drawImage(image, imgWidth, imgHegight, imageSize, imageSize);
    ctx.restore();
  },
};

export const optionsSummeryChart = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: true,
      align: 'start',
      color: '#187EDC',
      font: {
        size: '20',
      },
      text: 'Exon: Analisador de DNA para Câncer',
    },
  },
  onClick: (event, element, chart) => {
    var route = '/';
    summaryItens.map((item) => {
      if (element[0].index == item.id) {
        route = item.path;
      }
    });
    Router.push(route);
  },
};

function Summary() {
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  const { getSession, logout, sessionLost } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session:', session);
        setStatus(true);
      })
      .catch(() => {
        console.error('Failed to login!');
        sessionLost;
        setStatus(false);
        Router.push('/');
      });
  }, []);

  return (
    <div>
      {status ? (
        <ResponsiveLayout title="Summary">
          <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 1, sm: 12, lg: 14 }}
            >
              <Grid item xs={1} sm={8}>
                {/* <Paper square elevation={6} sx={{ width: '100%', mb: 2 }} className={classes.paperLayout}> */}
                <Doughnut
                  data={dataSummaryChart}
                  options={optionsSummeryChart}
                  plugins={[imageChartCenter]}
                />
                {/* </Paper> */}
              </Grid>
              <Grid
                item
                xs={1}
                sm={4}
                lg={6}
                style={{ width: '100%', textAlign: 'center' }}
              >
                <Box sx={{ flexGrow: 1 }} style={{ display: 'inline-flex' }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea style={{ display: 'block' }}>
                      <CardMedia
                        style={{ minHeight: '400px' }}
                        component="img"
                        height="140"
                        image="/thumbs/sample/person_summary.jpeg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Pedro Santana Castro
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bem Vindo Pedro Castro Seu DNA pode revelar uma série
                          de informações importantes sobre você, descubra mais
                          no menu ao lado, caso queira compartilhe no botão
                          abaixo.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ResponsiveLayout>
      ) : (
        sessionLost
      )}
    </div>
  );
}

export default Summary;
