import * as React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import ExonThemeProvider from 'src/components/ExonThemeProvider';
import { ExonAccounts } from './src/components/ExonAccounts';
import { SettingsProvider } from './src/contexts/SettingsContext';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [showChild, setShowChild] = React.useState(false);
  React.useEffect(() => {
    setShowChild(true);

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Exon</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SettingsProvider>
          <ExonThemeProvider>
            <ExonAccounts>
              <CssBaseline />
              <Component {...pageProps} />
            </ExonAccounts>
          </ExonThemeProvider>
        </SettingsProvider>
      </React.Fragment>
    );
  }
}
