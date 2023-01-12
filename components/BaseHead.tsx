import Head from 'next/head';
import Script from 'next/script';

const BaseHead: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>The Ancient Path</title>
        <meta name="description" content="Spiritual writings" />
        <meta name="author" content="Jason Henderson" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Script src="https://kit.fontawesome.com/597740db7b.js"></Script>
    </>
  );
};

export default BaseHead;
