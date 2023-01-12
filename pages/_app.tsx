import '../styles/globals.css';
import type { AppProps } from 'next/app';
import BaseHead from '../components/BaseHead';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseHead />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
