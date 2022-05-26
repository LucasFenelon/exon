import { createTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import { THEMES } from 'src/utils/constants';

const themesOptions = [
  {
    name: THEMES.LIGHT,
    palette: {
      background: {
        default: colors.common.white,
        // dark: '#f4f6f8',
        dark: 'white',
        paper: colors.common.white,
      },
      primary: {
        main: '#187EDC',
      },
      secondary: {
        main: '#04FBBC',
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
    },
  },
];

export const createExonTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  const theme = createTheme(themeOptions);

  return theme;
};

export default createExonTheme;
