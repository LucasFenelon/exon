import React from 'react';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import Layout from 'src/components/Layout';
import Speciality from 'src/components/Speciality';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: '2px solid #EAD617',
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-focused': {
        color: '#EAD617',
      },
    },
  },
  toolbar: {
    minHeight: '56px',
    boxShadow: 'none',
    borderBottom: '1px',
    borderBottomColor: '#EAD617',
    boxSizing: 'inherit',
    borderBottomStyle: 'solid',
    backgroundColor: 'transparent',
  },
  boxGrid: {
    boxShadow: 'none',
    padding: '20px 32px 8px 8px',
  },
  boxQuestion: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'space-between',
  },
  paperLayout: {
    zIndex: -2,
    borderRadius: '0px',
  },
  typography: {
    textAlign: 'left',
    margin: '18',
    width: '100%',
  },
  button: {
    backgroundColor: '#EAD617',
    width: '100%',
    height: '52px',
    borderRadius: '4px',
    '&:hover': {
      color: 'white',
    },
    gridContainer: {
      borderStyle: 'solid',
      borderColor: 'red',
      borderRadius: '4px',
    },
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

function OncologyRiskModifier(props) {
  const classes = useStyles();

  return (
    <Layout title="Oncology Risk Modifier">
      <Speciality list={buttonList} />
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        {/* <Typography variant="h4" style={{ textAlign: 'center', margin: 18 }}>
          Risk modifiers
        </Typography> */}
        {/* <Paper square elevation={6} sx={{ width: '100%', mb: 2 }} className={classes.paperLayout}> */}
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="Left"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 1, sm: 12 }}
          style={{
            borderStyle: 'solid',
            borderColor: '#EAD617',
            borderRadius: '4px',
            marginLeft: 'auto',
            width: '100%',
            padding: '8px 8px 8px 8px',
          }}
        >
          <Grid item xs={1} sm={12}>
            <Typography variant="h5" className={classes.typography}>
              <b>Avaliação de risco oncológico</b>
            </Typography>
            <Typography variant="subtitle1" className={classes.typography}>
              Assim como diversas outras doenças o risco para câncer é um
              somatório das suas características genéticas, dos seus hábitos e
              da influência do ambiente. Entender cada um desses fatores nos
              ajudará a estimar corretamente seu risco
            </Typography>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.boxQuestion}>
                <Typography variant="body1" className={classes.typography}>
                  Você já foi <b>diagnosticado</b> com Câncer?
                </Typography>
              </Box>
            </Toolbar>
          </Grid>
          <Grid item xs={1} sm={4}>
            <TextField
              label="Descreva aqui ..."
              variant="outlined"
              style={{ width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                // Router.push(button.path);
              }}
            >
              Submmit
            </Button>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.boxQuestion}>
                <Typography variant="body1" className={classes.typography}>
                  Com qual tipo de <b>tumor</b> você foi diagnosticado?
                </Typography>
              </Box>
            </Toolbar>
          </Grid>
          <Grid item xs={1} sm={4}>
            <TextField
              label="Descreva aqui ..."
              variant="outlined"
              style={{ width: '100%' }}
              classes={{
                root: classes.root,
              }}
              //onKeyDownCapture={(e) => console.log(e.target.value)}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                // Router.push(button.path);
              }}
            >
              Submmit
            </Button>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.boxQuestion}>
                <Typography variant="body1" className={classes.typography}>
                  Você já teve{' '}
                  <b>algum parente de primeiro grau (Mãe, pai ou irmãos)</b>{' '}
                  diagnosticado com Câncer?
                </Typography>
              </Box>
            </Toolbar>
          </Grid>
          <Grid item xs={1} sm={4}>
            <TextField
              label="Descreva aqui ..."
              variant="outlined"
              style={{ width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                // Router.push(button.path);
              }}
            >
              Submmit
            </Button>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.boxQuestion}>
                <Typography variant="body1" className={classes.typography}>
                  Com <b>qual tipo de tumor</b> seu parente de primeiro grau foi
                  diagnosticado?
                </Typography>
              </Box>
            </Toolbar>
          </Grid>
          <Grid item xs={1} sm={4}>
            <TextField
              label="Descreva aqui ..."
              variant="outlined"
              style={{ width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                // Router.push(button.path);
              }}
            >
              Submmit
            </Button>
          </Grid>
          <Grid item xs={1} sm={6}>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.boxQuestion}>
                <Typography variant="body1" className={classes.typography}>
                  Você já teve algum parente de{' '}
                  <b>segundo grau (Avós, Tios ou sobrinhos)</b> diagnosticado
                  com Câncer?
                </Typography>
              </Box>
            </Toolbar>
          </Grid>
          <Grid item xs={1} sm={4}>
            <TextField
              label="Descreva aqui ..."
              variant="outlined"
              style={{ width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                // Router.push(button.path);
              }}
            >
              Submmit
            </Button>
          </Grid>
          {/* <Grid item xs={1} sm={12} style={{ paddingTop: '28px' }}>
            <Box className={classes.boxQuestion}>
              <Typography variant="subtitle1" className={classes.typography}>
                <b>Additional ancestral birthplaces</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1} sm={12} style={{ paddingTop: '28px' }}>
            <Box className={classes.boxQuestion}>
              <Typography variant="subtitle1" className={classes.typography}>
                Birthplaces from older generations may be helpful when comparing
                with more distant cousins
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1} sm={10}>
            <TextField
              label="Enter a location and select the closest match from the dropdown ..."
              variant="outlined"
              style={{ width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
          </Grid>
          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                // Router.push(button.path);
              }}
            >
              Submmit
            </Button>
          </Grid> */}
        </Grid>
        {/* </Paper> */}
      </Box>
    </Layout>
  );
}

export default OncologyRiskModifier;
