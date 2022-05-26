import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  ScatterController,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';
import { makeStyles } from '@material-ui/core';
import Layout from 'src/components/Layout';
import Speciality from 'src/components/Speciality';
import PercentCharts from 'src/components/PercentCharts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@material-ui/core';
import { Scatter } from 'react-chartjs-2';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ExonProgressBarProvider from 'src/components/ExonProgressBarProvider';

const useStyles = makeStyles((theme) => ({
  boxGrid: {
    boxShadow: 'none',
    padding: '8px 8px 8px 8px',
  },
  typography: {
    textAlign: 'left',
    margin: '18',
    width: '100%',
  },
  icon: {
    fontSize: '56px',
  },
}));

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  ScatterController,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

const buttonList = [
  {
    id: 1,
    description: 'Oncologia',
    path: '/oncology',
    father: '',
  },
  {
    id: 2,
    description: 'Modificadores de risco',
    path: '/oncology_risk_modifier',
    father: 'oncology',
  },
  {
    id: 3,
    description: 'Tabela de mutações',
    path: '/oncology_mutant_table',
    father: 'oncology',
  },
  {
    id: 4,
    description: 'Recomendações',
    path: '/oncology_recomendations',
    father: 'oncology',
  },
];

export const dataOncologyChart = {
  labels: ['20s', '30s', '40s', '50s', '60s', '70s'],
  datasets: [
    {
      type: 'bar',
      label: 'Média',
      data: [0.62, 0.68, 0.77, 0.85, 0.8, 0.7],
      //borderColor: '#EED98C',
      //backgroundColor: '#EED98C',
      borderColor: '#EAD617',
      backgroundColor: '#EAD617',
    },
    {
      type: 'bar',
      label: 'Pessoas com génetica similares a sua',
      data: [0.65, 0.7, 0.8, 0.9, 0.85, 0.75],
      //borderColor: '#D87B4C',
      //backgroundColor: '#D87B4C',
      borderColor: '#187EDC',
      backgroundColor: '#187EDC',
    },
    {
      type: 'line',
      label: 'Probabilidade',
      data: [1, 1, 1, 1, 1, 1],
      fill: false,
      //borderColor: '#F4F6F8',
      borderColor: 'black',
    },
  ],
};

export const optionsOncologyChart = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: true,
      color: '#EAD617',
      font: {
        size: '20',
      },
      text: 'Comparativo populacional',
    },
  },
};

function Oncology(props) {
  const classes = useStyles();

  return (
    <Layout title="Oncology">
      <Speciality list={buttonList} />
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        {/* <Typography variant="h4" style={{ textAlign: 'center', margin: 18 }}>
          Oncology
        </Typography> */}
      </Box>
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 1, sm: 12 }}
        >
          <Grid item xs={1} sm={6} lg={4}>
            <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
              <Typography
                variant="h2"
                style={{ textAlign: 'center', margin: 18 }}
              >
                <b>Câncer de Mama</b>
              </Typography>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxGrid}
                style={{ display: 'flex' }}
              >
                <AccessibilityIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: '#EAD617', borderRadius: '100%' }}
                />
                <Typography
                  variant="subtitle1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px', textAlign: 'left' }}
                >
                  Pedro, seu perfil genético está associado a um{' '}
                  <b>baixo risco</b>, similar ao da população geral, de
                  desenvolver Câncer de Mama
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Scatter data={dataOncologyChart} options={optionsOncologyChart} />
          </Grid>
          <Grid item xs={1} sm={6} lg={4}>
            <Box
              sx={{ flexGrow: 1, marginTop: '20px' }}
              className={classes.boxGrid}
            >
              <Typography variant="subititle1" className={classes.typography}>
                Baseado no banco de dados da Exon, pessoas de{' '}
                <b>ascendência Latina</b> com genética similar a sua tem uma{' '}
                <b>chance estimada de 13%</b> de desenvolver Câncer de Mama em
                algum momento
              </Typography>
              <ExonProgressBarProvider
                bgcolor="#EAD617"
                progress="13"
                height={30}
              />
            </Box>
          </Grid>
          <Grid item xs={1} sm={6} style={{ textAlign: '-webkit-center' }}>
            <Box
              sx={{ flexGrow: 1, marginTop: '20px' }}
              className={classes.boxGrid}
            >
              <Typography
                variant="h6"
                className={classes.typography}
                style={{ paddingLeft: '8px', textAlign: 'center' }}
              >
                <b>Percentual de pessoas com Câncer de Mama</b>
              </Typography>
              <PercentCharts
                type="accessibility"
                data={{ totalQtd: 50, percentual: 2 }}
              />
              <Typography
                variant="body1"
                className={classes.typography}
                style={{ paddingLeft: '8px', textAlign: 'center' }}
              >
                <b>2%</b> das pessoas com essas características apresentam
                Câncer de Mama
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Oncology;
