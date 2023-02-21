import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import BaseHead from '../components/BaseHead';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
