import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Router from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import { AccountContext } from 'src/components/ExonAccounts.js';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate } = useContext(AccountContext);

  useEffect(() => {
    document.body.style.background = 'white';
  }, []);

  const onSubmitLogin = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log('Logged in!', data);
        Router.push('/summary');
      })
      .catch((err) => {
        console.error('Failed to login!', err);
      });

    // const user = new CognitoUser({
    //   Username: email,
    //   Pool: UserPool,
    // });

    // const authDetails = new AuthenticationDetails({
    //   Username: email,
    //   Password: password,
    // });

    // user.authenticateUser(authDetails, {
    //   onSuccess: (data) => {
    //     console.log('onSuccess:', data);
    //     // Router.push('/summary');
    //   },

    //   onFailure: (err) => {
    //     console.error('onFailure:', err);
    //   },

    //   newPasswordRequired: (data) => {
    //     console.log('newPasswordRequired:', data);
    //   },
    // });
  };

  const handleKeyDownUser = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('_password').focus();
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.key === 'Enter') {
      onSubmitLogin(event);
    }
  };

  const onSubmitSignUp = (event) => {
    event.preventDefault();
    Router.push('/signup');
  };

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
        <Grid
          item
          sm={4}
          md={8}
          lg={12}
          xl={16}
          style={{ display: 'flex', paddingTop: '0px' }}
        >
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
          <Box
            width="100%"
            textAlign="center"
            style={{ paddingRight: '14px', paddingLeft: '14px' }}
          >
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
              id="_user"
              label="User"
              variant="outlined"
              style={{ marginTop: '20px', width: '100%' }}
              classes={{
                root: classes.root,
              }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={handleKeyDownUser}
            />
            <TextField
              id="_password"
              label="Password"
              type="password"
              variant="outlined"
              style={{ marginTop: '20px', width: '100%' }}
              classes={{
                root: classes.root,
              }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={handleKeyDownPassword}
            />
            <div style={{ display: 'flex' }}>
              <a style={{ color: '#187EDC' }} href="/forgot">
                Esqueci minha senha
              </a>
            </div>
            <Box
              style={{ marginTop: '20px', width: '100%' }}
              textAlign="center"
              display="flex"
            >
              <Typography
                variant="body1"
                style={{ textAlign: 'center', color: '#79747E' }}
              >
                Saiba mais ...{' '}
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
                onClick={onSubmitLogin}
              >
                LOGIN
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: '20px' }}
                startIcon={<AddIcon />}
                onClick={onSubmitSignUp}
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
