import React from 'react';
import { makeStyles } from '@material-ui/core';
import Layout from 'src/components/Layout';
import Speciality from 'src/components/Speciality';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import BarChartIcon from '@mui/icons-material/BarChart';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: '56px',
    boxShadow: 'none',
    backgroundColor: '#F4F6F8',
  },
  boxGrid: {
    boxShadow: 'none',
    padding: '8px 8px 8px 8px',
    '& .MuiGrid-item': {
      marginTop: '32px',
    },
  },
  typography: {
    textAlign: 'left',
    margin: '18',
    width: '100%',
  },
  icon: {
    fontSize: '56px',
  },
  boxRight: {
    borderBottomColor: '#F4F6F8',
    borderBottom: '2px',
    borderBottomStyle: 'solid',
    borderRightColor: '#F4F6F8',
    borderRight: '2px',
    borderRightStyle: 'solid',
    boxShadow: 'none',
    padding: '8px 8px 8px 0px',
  },
  boxLeft: {
    borderBottomColor: '#F4F6F8',
    borderColor: '#F4F6F8',
    borderBottom: '2px',
    borderBottomStyle: 'solid',
    borderLeftColor: '#F4F6F8',
    borderLeft: '2px',
    borderLeftStyle: 'solid',
    boxShadow: 'none',
    padding: '8px 0px 8px 8px',
  },
}));

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

function OncologyRecomendations(props) {
  const classes = useStyles();

  return (
    <Layout title="Oncology Recomendations">
      <Speciality list={buttonList} />
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        {/* <Typography variant="h4" style={{ textAlign: 'center', margin: 18 }}>
          Recomendations
        </Typography> */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columns={{ xs: 1, sm: 12 }}
        >
          <Grid item xs={1} sm={12}>
            <Typography variant="subtitle1" className={classes.typography}>
              <b>
                Essas atitudes fazem a maior diferença em pessoas com a sua
                genética:
              </b>
            </Typography>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="subtitle1" className={classes.typography}>
                  <b>Avaliar junto a seu médico o uso de anticoncepcionais</b>
                </Typography>
              </Toolbar>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxLeft}
                style={{ display: 'flex' }}
              >
                <RestaurantIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: 'red', borderRadius: '2px' }}
                />
                <Typography
                  variant="body1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px' }}
                >
                  O uso de anticoncepcionais baseados em estrógeno, seja
                  isolado, seja associado a progesterona, por períodos
                  superiores a 5 anos, está associado a um aumento de risco de
                  até 15% e 79% respectivamente.
                  <br />
                  <br />
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="subtitle1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px', textAlign: 'right' }}
                >
                  Associado a um aumento de <b>até 99% (2x)</b> no seu risco
                </Typography>
              </Toolbar>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxRight}
                style={{ display: 'flex' }}
              >
                <BarChartIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: 'green', borderRadius: '100%' }}
                />
                <Typography
                  variant="body1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px' }}
                >
                  Vinogradova Y, Coupland C, Hippisley-Cox J. Use of hormone
                  replacement therapy and risk of breast cancer: nested
                  case-control studies using the QResearch and CPRD databases.
                  BMJ. 2020;371:m3873. <br />
                  Published 2020 Oct 28. doi:10.1136/bmj.m3873
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="subtitle1" className={classes.typography}>
                  <b>Evitar o uso de Cigarros</b>
                </Typography>
              </Toolbar>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxLeft}
                style={{ display: 'flex' }}
              >
                <SmokingRoomsIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: 'Black', borderRadius: '2px' }}
                />
                <Typography
                  variant="body1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px' }}
                >
                  Um aumento estatisticamente significativo do risco de câncer
                  de mama foi observado por ter fumado cigarros (odds ratio =
                  1,43, intervalo de confiança de 95% = 1,03-1,99).
                  <br />
                  <br />
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="subtitle1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px', textAlign: 'right' }}
                >
                  Associado a um aumento de <b>até 43%</b> no seu risco
                </Typography>
              </Toolbar>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxRight}
                style={{ display: 'flex' }}
              >
                <BarChartIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: 'green', borderRadius: '100%' }}
                />
                <Typography
                  variant="body1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px' }}
                >
                  Rollison, D.E., Brownson, R.C., Hathcock, H.L. et al.
                  Case-control study of tobacco smoke exposure and breast cancer
                  risk in Delaware. BMC Cancer 8, 157 (2008). <br />
                  https://doi.org/10.1186/1471-2407-8-157
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="subtitle1" className={classes.typography}>
                  <b>Evitar sobrepeso e Obesidade</b>
                </Typography>
              </Toolbar>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxLeft}
                style={{ display: 'flex' }}
              >
                <FastfoodIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: '#EAD617', borderRadius: '2px' }}
                />
                <Typography
                  variant="body1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px' }}
                >
                  Mulheres com sobrepeso e obesas – definidas como tendo um IMC
                  (índice de massa corporal) acima de 25 – têm um risco maior de
                  serem diagnosticadas com câncer de mama em comparação com
                  mulheres que mantêm um peso saudável, especialmente após a
                  menopausa. Estar acima do peso também pode aumentar o risco do
                  câncer de mama voltar (recorrência) em mulheres que tiveram a
                  doença.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="subtitle1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px', textAlign: 'right' }}
                >
                  Associado a um aumento de <b>até 126%</b> no seu risco
                </Typography>
              </Toolbar>
              <Box
                sx={{ flexGrow: 1 }}
                className={classes.boxRight}
                style={{ display: 'flex' }}
              >
                <BarChartIcon
                  className={classes.icon}
                  sx={{ color: 'white' }}
                  style={{ backgroundColor: 'green', borderRadius: '100%' }}
                />
                <Typography
                  variant="body1"
                  className={classes.typography}
                  style={{ paddingLeft: '8px' }}
                >
                  Gravena AAF, Romeiro Lopes TC, Demitto MO, et al. The Obesity
                  and the Risk of Breast Cancer among Pre and Postmenopausal
                  Women. Asian Pac J Cancer Prev. 2018;19(9):2429-2436. <br />
                  Published 2018 Sep 26. doi:10.22034/APJCP.2018.19.9.2429
                  <br />
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default OncologyRecomendations;
