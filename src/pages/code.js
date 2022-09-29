import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import Router from 'next/router';
import ExonSignUp from './../components/ExonSignUp';
import { AccountContext } from './../components/ExonAccounts';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: '32px 0px 8px 0px',
    margin: '0px',
    backgroundColor: 'white',
  },
  gridItem: {
    padding: '0px',
    margin: '0px',
  },
  boxGridItem: {
    paddingRight: '14px',
    paddingLeft: '14px',
  },
  bodyTypography: {
    textAlign: 'left',
    color: '#79747E',
  },
  textFile: {
    marginTop: '20px',
    width: '100%',
  },
}));

function Code() {
  const classes = useStyles();
  const { confirm } = useContext(AccountContext);
  const [signupPayload, setSignupPayload] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    document.body.style.background = '#187EDC';

    if (router.query.dataCode != undefined) {
      setEmail(JSON.parse(router.query.dataCode)['email']);
    } else {
      Router.push('/');
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    confirm(email, code)
      .then((data) => {
        console.log('User confirmed!', data);
        Router.push('/');
      })
      .catch((err) => {
        console.error('Failed to confirm!', err);
      });
  };

  return (
    <ExonSignUp>
      <Grid
        container
        direction="row"
        rowSpacing={1}
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 1, sm: 12, lg: 14 }}
        className={classes.gridContainer}
      >
        <Grid
          item
          xs={1}
          sm={2}
          sm={4}
          className={classes.gridItem}
          style={{ padding: '0px', margin: '0px' }}
        >
          <Box className={classes.boxGridItem}>
            <Typography
              variant="h4"
              style={{ textAlign: 'center' }}
              color="primary"
            >
              Cadastro
            </Typography>
            <br />
            <hr />
            <Typography variant="body1" className={classes.bodyTypography}>
              Enviamos um código para você por E-mail, digite abaixo:
            </Typography>
            <TextField
              id="_user"
              label="Código"
              variant="outlined"
              className={classes.textFile}
              onChange={(event) => setCode(event.target.value)}
            />
            <Box className={classes.boxUpload}>
              <Button
                id="_send"
                style={{ marginTop: '15px' }}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                VALIDAR
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ExonSignUp>
  );
}

export default Code;
