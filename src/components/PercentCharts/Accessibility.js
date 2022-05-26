import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

const useStyles = makeStyles((theme) => ({
  boxGrid: {
    boxShadow: 'none',
    maxWidth: '400px',
    textAlign: 'center',
  },
  icon: {
    fontSize: '28px',
  },
}));

function Accessibility({ data }) {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={classes.boxGrid}>
        {Array.from({ length: data.totalQtd }, (_, i) => i + 1).map(
          (position) => {
            const paint = (data.totalQtd * data.percentual) / 100;

            if (position <= paint) {
              return (
                <AccessibilityIcon
                  className={classes.icon}
                  sx={{ color: '#187EDC' }}
                />
              );
            } else {
              return (
                <AccessibilityIcon
                  className={classes.icon}
                  sx={{ color: '#EAD617' }}
                />
              );
            }
          },
        )}
      </Box>
    </>
  );
}

export default Accessibility;
