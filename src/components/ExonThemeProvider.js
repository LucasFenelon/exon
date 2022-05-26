import { ThemeProvider } from '@material-ui/core/styles';
import { createExonTheme } from 'src/theme';
import useSettings from 'src/hooks/useSettings';

function ExonThemeProvider({ children }) {
  const { settings } = useSettings();
  const theme = createExonTheme({ theme: settings.theme });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ExonThemeProvider;
