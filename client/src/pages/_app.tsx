import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Providers } from '@/components/providers/ChakraThemeProvider';
import buildClient from '@/api/build-client';
import Header from '@/components/Header'

const AppComponent = ({ Component, pageProps }: AppProps, currentUser: any) => {
  return (
    <Providers>
      <Header currentUser={pageProps.currentUser} />
      <Component {...pageProps} />
    </Providers>
  )
}

AppComponent.getInitialProps = async (appContext: any) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data
  }
}

export default AppComponent;
