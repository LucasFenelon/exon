import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Router from 'next/router';

function ExonSignUp(props) {
  useEffect(() => {
    document.body.style.background = '#187EDC';
  }, []);

  const handleIndex = (event) => {
    Router.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: '#187EDC' }}>
      <Box
        display={{ xs: 'none', sm: 'flex' }}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        style={{ backgroundColor: '#187EDC' }}
      >
        <img
          src="/logo_exon.svg"
          alt="logo"
          onClick={handleIndex}
          style={{ cursor: 'pointer', maxHeight: '56px', marginLeft: '27.5px' }}
        />
      </Box>
      {props.children}
      <Box
        display={{ xs: 'none', sm: 'flex' }}
        width="100%"
        height="500px"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        style={{
          backgroundImage: 'url(/signup_background.svg',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></Box>
    </Box>
  );
}

export default ExonSignUp;
