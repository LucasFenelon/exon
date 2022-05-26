import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: '56px',
    boxShadow: 'none',
    border: '1px',
    borderRadius: '4px',
    borderColor: '#187EDC',
    boxSizing: 'inherit',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  boxButton: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'space-between',
  },
  button: {
    minHeight: '48px',
    minWidth: '240px',
    color: '#187EDC',
    '&:hover': {
      background: '#E2EEFB',
      borderColor: '#187EDC',
    },
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path color={props.color} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function TopBar({ listButton }) {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = (item) => {
    return router.pathname === item.path;
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Box className={classes.boxButton}>
        <Stack spacing={2} direction="row">
          {listButton.map((button) => {
            const decorate = isSelected(button) ? 'contained' : 'outlined';
            const homeDecorateColor = isSelected(button)
              ? 'primary'
              : 'transparent';
            const homeDecorateStroke = isSelected(button) ? 'none' : '#187EDC';
            const homeDecorateStrokeBorder = isSelected(button) ? 'none' : '1';

            if (button.father === '') {
              return (
                <IconButton size="large">
                  <HomeIcon
                    stroke={homeDecorateStroke}
                    stroke-width={homeDecorateStrokeBorder}
                    color={homeDecorateColor}
                    fontSize="inherit"
                    // style={{
                    //   backgroundColor: isSelected(button) && '#187EDC',
                    // }}
                    onClick={() => {
                      Router.push(button.path);
                    }}
                  />
                </IconButton>
              );
            } else {
              return (
                <Button
                  className={classes.button}
                  variant={decorate}
                  style={{
                    backgroundColor: isSelected(button) && '#187EDC',
                    color: isSelected(button) && 'white',
                  }}
                  onClick={() => {
                    Router.push(button.path);
                  }}
                >
                  {button.description}
                </Button>
              );
            }
          })}
        </Stack>
      </Box>
    </Toolbar>
  );
}

export default TopBar;
