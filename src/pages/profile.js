import React, { useState, useContext, useEffect } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Layout from 'src/components/Layout';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSend, setOpenSend] = React.useState(false);
  const { getSession, authenticate } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(({ user, email }) => {
      setEmail(email);
      setNewEmail(email);
    });
  }, []);

  const handleClickOpenSend = () => {
    setOpenSend(true);
  };

  const handleCloseSend = () => {
    setOpenSend(false);
  };

  const onSubmitChange = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(newEmail);

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        const attributes = [
          new CognitoUserAttribute({ Name: 'email', Value: newEmail }),
        ];

        user.updateAttributes(attributes, (err, results) => {
          if (err) console.error(err);
          console.log(results);
        });
      });
    });
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
                Troca de E-mail
              </Typography>
              <TextField
                id="_email"
                variant="outlined"
                style={{ marginTop: '20px', width: '100%' }}
                classes={{
                  root: classes.root,
                }}
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
              <Dialog
                open={openSend}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSend}
              >
                <DialogTitle>{'Validação'}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Digite sua senha para alteração do E-mail:
                  </DialogContentText>
                  <TextField
                    id="_password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    style={{
                      marginTop: '20px',
                      width: '100%',
                    }}
                    classes={{
                      root: classes.root,
                    }}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Box
                    style={{
                      width: '100%',
                      padding: '0px 16px 12px 16px',
                    }}
                    textAlign="left"
                    display="flex"
                  >
                    <Button variant="outlined" onClick={handleCloseSend}>
                      CANCELAR
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        marginLeft: '10px',
                      }}
                      onClick={onSubmitChange}
                    >
                      SALVAR
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
              <Box
                style={{ marginTop: '20px', width: '100%' }}
                textAlign="left"
                display="flex"
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '20px' }}
                  onClick={handleClickOpenSend}
                >
                  ENVIAR
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Profile;
