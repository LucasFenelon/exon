import React, { useEffect, useState, useRef } from 'react';
import absoluteUrl from 'next-absolute-url';
import { makeStyles } from '@material-ui/core';
import Layout from 'src/components/Layout';
import Speciality from 'src/components/Speciality';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: '2px solid #4DABE9',
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-focused': {
        color: '#4DABE9',
      },
    },
  },
  boxGrid: {
    boxShadow: 'none',
    padding: '8px 8px 8px 8px',
  },
  paperTable: {
    boxShadow: 'none',
  },
  rowTable: {
    backgroundColor: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E2EEFB',
    },
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: '#4DABE9',
    },
  },
  searchLabel: {
    '& .MuiFormLabel-root': {
      '& .Mui-focused': {
        color: '#4DABE9',
      },
    },
  },
}));

const tableSchema = [
  'ALT',
  //'AUG_ALL',
  //'AVSNP',
  //'CHANGE_REF',
  //'CHR',
  //'CLINSIG',
  'END',
  'FATHMM',
  'FUNC',
  'FUNC_REF_GENE',
  'GENE',
  //'GNOMAD_EXOME_AF',
  //'GNOMAD_GENOME_AF',
  'MUTATION',
  //'ODDS RATIO',
  'REF',
  'SIFT',
  'START',
  'TUMOR TYPE',
  'UMD',
  'UMD_PREDICT',
  'GNOTYPE_FENOTYPE',
];

const parseCsv = (csv) => {
  let lines = csv.split('\n');
  const header = lines.shift().split(';');
  lines.shift(); // get rid of definitions
  return lines.map((line) => {
    const bits = line.split(';');
    let obj = {};
    header.forEach((h, i) => (obj[h] = bits[i])); // or use reduce here
    return obj;
  });
};

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

export async function getServerSideProps(context) {
  const { origin } = absoluteUrl(context.req);
  const data = await fetch(origin + '/data/tabela_teste_exon_tumores.csv')
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      return parseCsv(data);
    });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data: data } };
}

function OncologyMutantTable(props) {
  const classes = useStyles();
  const containerTableRef = useRef(null);
  const divGifRef = useRef(null);
  const [base, setBase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setBase(props.data);
    setLoading(false);
  };

  const handlerDivGif = () => {
    divGifRef.current.style.height =
      containerTableRef.current?.clientHeight - 120 + 'px';
  };

  useEffect(() => {
    fetchData();
    handlerDivGif();
  });

  const handleSearch = () => {
    return base.filter(
      (base) =>
        base.REF.toLowerCase().includes(search) ||
        base.UMD_PREDICT.toLowerCase().includes(search) ||
        base.GENE.toLowerCase().includes(search),
    );
  };

  return (
    <Layout title="Oncology Mutant table">
      <Speciality list={buttonList} />
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        {/* <Typography variant="h4" style={{ textAlign: 'center', margin: 18 }}>
          Oncology Structure
        </Typography> */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 1, sm: 12 }}
        >
          <Grid item xs={1} sm={10}>
            <Container
              ref={containerTableRef}
              style={{ textAlign: 'center', maxWidth: '1920px' }}
            >
              <TextField
                label="Search For a base pair ..."
                variant="outlined"
                style={{ marginBottom: 20, width: '100%' }}
                classes={{
                  root: classes.root,
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TableContainer component={Paper} className={classes.paperTable}>
                {loading ? (
                  <LinearProgress style={{ backgroundColor: '#187EDC' }} />
                ) : (
                  <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#EAD617' }}>
                      <TableRow>
                        {tableSchema.map((head) => (
                          <TableCell key={head} align="center">
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleSearch()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((row) => {
                          return (
                            <TableRow className={classes.rowTable}>
                              {tableSchema.map((positionCell) => (
                                <TableCell style={{ maxWidth: '300px' }}>
                                  {row[positionCell]}
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
              <Pagination
                count={(handleSearch()?.length / 10).toFixed(0)}
                style={{
                  padding: 20,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'black',
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
                }}
              />
            </Container>
          </Grid>
          <Grid item xs={1} sm={2} display={{ xs: 'none', sm: 'block' }}>
            <div
              style={{
                width: '100%',
                backgroundImage: 'url(/thumbs/dna_animated_10.gif)',
                backgroundSize: '100%',
              }}
              ref={divGifRef}
            />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default OncologyMutantTable;
