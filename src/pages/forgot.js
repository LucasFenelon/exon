import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import Router from 'next/router';
import ExonSignUp from 'src/components/ExonSignUp';
import { AccountContext } from 'src/components/ExonAccounts';

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
  boxButton: {
    marginTop: '20px',
    width: '100%',
    display: 'block',
  },
}));

function Forgot() {
  const classes = useStyles();
  const { forgot, confirmReset } = useContext(AccountContext);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const collector_url =
    'http://snowplow-elb-1976030773.us-east-1.elb.amazonaws.com/';
  newTracker('snowplow_pageview', collector_url, {
    appId: 'app-test-selfdescribing',
    plugins: [],
  });

  useEffect(() => {
    trackPageView(undefined, ['snowplow_pageview']);
    console.log('passei');
    document.body.style.background = '#187EDC';
  }, []);

  const getUser = () => {
    console.log(email);
    return new CognitoUser({
      Username: email,
      Pool,
    });
  };

  const handleKeyDownNextField = (event, nextId) => {
    if (event.key === 'Enter') {
      document.getElementById(nextId).focus();
    }
  };

  const onSendCode = (event) => {
    event.preventDefault();

    forgot(email)
      .then((data) => {
        console.log('Sent!', data);
        setStage(2);
      })
      .catch((err) => {
        console.error('Failed!', err);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(code);
    console.log(password);
    console.log(confirmPassword);

    if (password == confirmPassword) {
      confirmReset(code, email, password)
        .then((data) => {
          console.log('Confirmed!', data);
          Router.push('/');
        })
        .catch((err) => {
          console.error('Failed!', err);
        });
    } else {
      alert('senhas diferentes !');
    }
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
            <Typography variant="body1" className={classes.bodyTypography}>
              Resgate de senha
            </Typography>
            <div>
              {stage === 1 ? (
                <div>
                  <TextField
                    id="_user"
                    label="E-mail usuário"
                    variant="outlined"
                    className={classes.textFile}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Box className={classes.boxButton}>
                    <Button
                      id="_send"
                      style={{ marginTop: '15px' }}
                      variant="contained"
                      color="primary"
                      onClick={onSendCode}
                    >
                      ENVIAR
                    </Button>
                  </Box>
                </div>
              ) : (
                <div>
                  <TextField
                    id="_code"
                    label="Código"
                    variant="outlined"
                    className={classes.textFile}
                    onChange={(event) => setCode(event.target.value)}
                    onKeyDown={(event) =>
                      handleKeyDownNextField(event, '_password')
                    }
                  />
                  <TextField
                    id="_password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    className={classes.textFile}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) =>
                      handleKeyDownNextField(event, '_confirmpassword')
                    }
                  />
                  <TextField
                    id="_confirmpassword"
                    label="Confirmar senha"
                    type="password"
                    variant="outlined"
                    className={classes.textFile}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    onKeyDown={(event) =>
                      handleKeyDownNextField(event, '_send')
                    }
                  />
                  <Box className={classes.boxButton}>
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
                </div>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </ExonSignUp>
  );
}

export default Forgot;
