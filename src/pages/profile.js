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
  const [code, setCode] = useState('');
  const [openSend, setOpenSend] = React.useState(false);
  const [openCode, setOpenCode] = React.useState(false);
  const { getSession, authenticate, confirm } = useContext(AccountContext);

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

  const handleClickOpenCode = () => {
    setOpenCode(true);
  };

  const handleCloseCode = () => {
    setOpenCode(false);
  };

  const onSubmitChange = (event) => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password)
        .then(() => {
          const newAttributesEmail = [
            new CognitoUserAttribute({ Name: 'email', Value: newEmail }),
          ];

          const newAttributesEmailVerified = [
            new CognitoUserAttribute({ Name: 'email_verified', Value: 'true' }),
          ];

          handleCloseSend();
          user.updateAttributes(newAttributesEmail, (err, results) => {
            if (err) {
              console.error(err);
            } else {
              user.updateAttributes(
                newAttributesEmailVerified,
                (err, results) => {
                  if (err) {
                    console.error(err);
                  } else {
                    handleClickOpenCode();
                  }
                  console.log(results);
                },
              );
            }
            console.log(results);
          });
        })
        .catch((err) => {
          console.error('Failed!', err);
        });
    });
  };

  const onSubmitCode = (event) => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(newEmail, password)
        .then(() => {
          confirm(newEmail, code)
            .then((data) => {
              console.log(results);
              console.log('User confirmed!', data);
              handleCloseCode();
            })
            .catch((err) => {
              console.error('Failed to confirm!', err);
            });
        })
        .catch((err) => {
          console.error('Failed!', err);
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
                open={openCode}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSend}
              >
                <DialogTitle>{'Validação'}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Digite o código para alteração do E-mail:
                  </DialogContentText>
                  <TextField
                    id="_code"
                    label="código"
                    variant="outlined"
                    style={{
                      marginTop: '20px',
                      width: '100%',
                    }}
                    classes={{
                      root: classes.root,
                    }}
                    onChange={(event) => setCode(event.target.value)}
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
                    <Button
                      variant="contained"
                      style={{
                        marginLeft: '10px',
                      }}
                      onClick={onSubmitCode}
                    >
                      VALIDAR
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
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
