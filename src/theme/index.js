import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { colors } from '@material-ui/core';

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: colors.common.white,
      dark: '#f4f6f8',
      paper: colors.common.white,
    },
    primary: {
      main: '#634cfb',
    },
    secondary: {
      main: '#04fbbc',
    },
    primaryB: {
      main: '#044cbc',
    },
    secondaryB: {
      main: '#3c3c3c',
    },
    primaryC: {
      main: '#546c6c',
    },
    secondaryC: {
      main: '#20706c',
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
