import React, { useState, useContext, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Layout from 'src/components/Layout';
import { styled } from '@mui/material/styles';
import Router from 'next/router';
import { Button } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import { AccountContext } from 'src/components/ExonAccounts';

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
}));

function Account() {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmitChange = (event) => {
    event.preventDefault();
    if (password != '' && newPassword == confirmNewPassword) {
      console.log(password);
      console.log(newPassword);
      console.log(confirmNewPassword);

      getSession().then(({ user, email }) => {
        authenticate(email, password).then(() => {
          user.changePassword(password, newPassword, (err, result) => {
            if (err) console.error(err);
            console.log(result);
          });
        });
      });
    } else {
      alert('senhas diferentes !');
    }
  };

  return (
    <Layout title="Account">
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        <Grid
          container
          direction="row"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 1, sm: 12, lg: 14 }}
        >
          <Grid item xs={1} sm={8}>
            <Box
              width="100%"
              style={{ paddingRight: '14px', paddingLeft: '14px' }}
            >
              <Typography
                variant="body1"
                style={{ textAlign: 'left', color: '#79747E' }}
              >
                Troca de Senha
              </Typography>
              <TextField
                id="_password"
                label="Senha Atual"
                type="password"
                variant="outlined"
                style={{ marginTop: '20px', width: '100%' }}
                classes={{
                  root: classes.root,
                }}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                id="_newpassword"
                label="Nova Senha"
                type="password"
                variant="outlined"
                style={{ marginTop: '20px', width: '100%' }}
                classes={{
                  root: classes.root,
                }}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <TextField
                id="_confirmnewpassword"
                label="Confirme Nova Senha"
                type="password"
                variant="outlined"
                style={{ marginTop: '20px', width: '100%' }}
                classes={{
                  root: classes.root,
                }}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />
              <Box
                style={{ marginTop: '20px', width: '100%' }}
                textAlign="left"
                display="flex"
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '20px' }}
                  onClick={onSubmitChange}
                >
                  SALVAR
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Account;
