import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [showChild, setShowChild] = React.useState(false);
  React.useEffect(() => {
    setShowChild(true);
    //console.log("Passei aqui A")
    //console.log(String(showChild))

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  //const Head = import('next/head')
  //const theme = import('../theme')

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>exon</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
