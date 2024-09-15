import { AppProps } from 'next/app';
import React, { Suspense } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...pageProps} />
  </Suspense>
);

export default MyApp;
