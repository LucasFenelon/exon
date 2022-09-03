import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Router from 'next/router';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: '1px solid #79747E',
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-focused': {
        color: '#79747E',
      },
    },
  },
  logoGrid: {
    marginTop: '0px',
  },
  logoImg: {
    cursor: 'pointer',
    height: '250px',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Box
      style={{
        height: '100vh',
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="right"
        rowSpacing={1}
        //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12, lg: 16, xl: 20 }}
        height="100%"
        className={classes.logoGrid}
      >
        <Grid sm={4} md={8} lg={12} xl={16} style={{ display: 'flex' }}>
          <Box
            display={{ xs: 'none', sm: 'flex' }}
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            style={{
              backgroundImage: 'url(/login_background.svg',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <img src="/logo_exon.svg" alt="logo" />
          </Box>
        </Grid>
        <Grid
          item
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          xs={1}
          sm={4}
          style={{ display: 'flex' }}
        >
          <Box width="100%" textAlign="center" style={{ paddingRight: '28px' }}>
            <Typography
              variant="h4"
              style={{ textAlign: 'center' }}
              color="primary"
            >
              Acesse o seu DNA
            </Typography>
            <Typography
              variant="body1"
              style={{ textAlign: 'left', color: '#79747E' }}
            >
              A Exon não compartilha qualquer parte dos seus dados e informacões
              com a Google, incluindo resultados genéticos
            </Typography>
            <TextField
              label="User"
              variant="outlined"
              style={{ marginTop: '20px', width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              style={{ marginTop: '20px', width: '100%' }}
              classes={{
                root: classes.root,
              }}
            />
            <Box
              style={{ marginTop: '20px', width: '100%' }}
              textAlign="center"
              display="flex"
            >
              <Typography
                variant="body1"
                style={{ textAlign: 'center', color: '#79747E' }}
              >
                Eu concordo com{' '}
                <a style={{ color: '#187EDC' }} href="">
                  Termos & Condições
                </a>
              </Typography>
            </Box>
            <Box
              style={{ marginTop: '20px', width: '100%' }}
              textAlign="left"
              display="flex"
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '20px' }}
                onClick={() => {
                  Router.push('/summary');
                }}
              >
                LOGIN
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: '20px' }}
                startIcon={<AddIcon />}
              >
                CRIAR CONTA
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
