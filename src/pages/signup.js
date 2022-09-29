import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Router from 'next/router';
import UserPool from './userspool';
import ExonSignUp from './../components/ExonSignUp';

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
  dateInput: {
    width: '100%',
    marginTop: '20px',
  },
  inputFormControl: {
    marginTop: '20px',
  },
  itemSelect: {
    display: 'grid',
    justifyContent: 'left',
    marginLeft: '5px',
  },
  formTerms: {
    display: 'contents',
  },
  formLabelTerms: {
    marginRight: '0px',
    color: 'rgb(121, 116, 126)',
  },
  boxTerm: {
    marginTop: '20px',
    marginLeft: '10px',
  },
  checkTerms: {
    marginRight: '5px',
  },
  boxUpload: {
    marginTop: '20px',
    width: '100%',
    display: 'block',
  },
  boxUploadButton: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
  },
  uploadTypography: {
    textAlign: 'left',
    color: '#79747E',
    marginTop: '5px',
    marginLeft: '10px',
  },
}));

const positions = [
  { description: 'C-Level' },
  { description: 'Diretor(a)' },
  { description: 'Gerente' },
  { description: 'Coordenador(a)' },
  { description: 'Supervisor(a)' },
  { description: 'Analista' },
  { description: 'Operador(a)' },
  { description: 'Profissional liberal' },
  { description: 'Empreendedor(a)' },
  { description: 'Sócio(a)' },
  { description: 'Outro' },
];

const works = [
  { description: 'Saúde' },
  { description: 'Construção civil' },
  { description: 'Pública' },
  { description: 'Acadêmico' },
  { description: 'Financeiro' },
  { description: 'Gastronomia' },
  { description: 'Agronegócio' },
  { description: 'Indústria' },
  { description: 'Técnologia da informação' },
  { description: 'Serviços' },
  { description: 'Outro' },
];

function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [dtBirthDay, setDtBirthDay] = useState('');
  const [work, setWork] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [chekTerm, setChekTerm] = useState('off');
  const [uploadFile, setUploadFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    document.body.style.background = '#187EDC';
  }, []);

  const handleKeyDownNextField = (event, nextId) => {
    if (event.key === 'Enter') {
      document.getElementById(nextId).focus();
    }
  };

  const handleUploadFile = (event) => {
    var filename = event.target.value;

    if (filename != null && filename != '') {
      filename = filename.split('\\').pop();
    }

    setFile(event.target.files[0]);
    setUploadFile(event.target.value);
    setFileName(filename);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (email != '' && password == confirmPassword) {
      UserPool.signUp(email, password, [], null, (err, data) => {
        if (err) console.error(err);
        console.log(data);
      });

      var data = {
        name: name,
        dtBirthDay: dtBirthDay,
        work: work,
        position: position,
        email: email,
        chekTerm: chekTerm,
        fileName: fileName,
        file: file,
      };

      Router.push(
        { pathname: '/code', query: { dataCode: JSON.stringify(data) } },
        '/code',
      );
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
              Dados pessoais
            </Typography>
            <TextField
              id="_name"
              label="Nome completo"
              variant="outlined"
              value={name}
              className={classes.textFile}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) =>
                handleKeyDownNextField(event, '_dtbirthday')
              }
            />
            <Stack
              component="form"
              noValidate
              spacing={3}
              className={classes.dateInput}
            >
              <TextField
                id="_dtbirthday"
                label="Data de Nascimento"
                type="date"
                defaultValue="1970-01-01"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ textAlign: 'left', color: '#79747E' }}
                onChange={(event) => setDtBirthDay(event.target.value)}
                onKeyDown={(event) =>
                  handleKeyDownNextField(event, '_workLabel')
                }
              />
            </Stack>
            <br />
            <Typography variant="body1" className={classes.bodyTypography}>
              Dados profissionais
            </Typography>
            <FormControl fullWidth className={classes.inputFormControl}>
              <InputLabel id="_workLabel">Profissão</InputLabel>
              <Select
                select="false"
                labelId="_workLabel"
                id="_work"
                value={work}
                onChange={(event) => setWork(event.target.value)}
              >
                {works.map((wk) => {
                  return (
                    <MenuItem
                      id={'_' + wk['description']}
                      key={wk['description']}
                      className={classes.itemSelect}
                      value={wk['description']}
                      onKeyDown={(event) =>
                        handleKeyDownNextField(event, '_positionLabel')
                      }
                    >
                      {wk['description']}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.inputFormControl}>
              <InputLabel id="_positionLabel">Cargo</InputLabel>
              <Select
                select="false"
                labelId="_positionLabel"
                id="_position"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
              >
                {positions.map((pos) => {
                  return (
                    <MenuItem
                      id={'_' + pos['description']}
                      key={pos['description']}
                      className={classes.itemSelect}
                      value={pos['description']}
                      onKeyDown={(event) =>
                        handleKeyDownNextField(event, '_user')
                      }
                    >
                      {pos['description']}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br />
            <br />
            <hr />
            <Typography variant="body1" className={classes.bodyTypography}>
              Dados de acesso
            </Typography>
            <TextField
              id="_user"
              label="E-mail usuário"
              variant="outlined"
              className={classes.textFile}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => handleKeyDownNextField(event, '_password')}
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
              onKeyDown={(event) => handleKeyDownNextField(event, '_term')}
            />
            <br />
            <br />
            <hr />
            <Box className={classes.boxTerm}>
              <FormGroup className={classes.formTerms}>
                <FormControlLabel
                  className={classes.formLabelTerms}
                  control={
                    <Checkbox
                      id="_term"
                      className={classes.checkTerms}
                      onChange={(event) => setChekTerm(event.target.value)}
                      onKeyDown={(event) =>
                        handleKeyDownNextField(event, '_upload')
                      }
                    />
                  }
                  label="Aceito os "
                />
              </FormGroup>{' '}
              <a style={{ color: '#187EDC' }} href="">
                Termos & Condições
              </a>
            </Box>
            <Box className={classes.boxUpload}>
              <Typography variant="body1" className={classes.bodyTypography}>
                Selecione um arquivo VCF para análise preliminar
              </Typography>
              <Box className={classes.boxUploadButton}>
                <Button
                  id="_upload"
                  variant="outlined"
                  component="label"
                  color="primary"
                  onKeyDown={(event) => handleKeyDownNextField(event, '_send')}
                >
                  Escolher
                  <input
                    hidden
                    //   accept=".vcf"
                    multiple
                    type="file"
                    value={uploadFile}
                    onChange={handleUploadFile}
                  />
                </Button>
                <Typography
                  variant="body1"
                  className={classes.uploadTypography}
                >
                  {fileName}
                </Typography>
              </Box>
              <Button
                id="_send"
                style={{ marginTop: '15px' }}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                ENVIAR
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ExonSignUp>
  );
}

export default SignUp;
