import Head from 'next/head';
import Script from 'next/script';

interface Props {
  description: string;
  title: string;
}

function initializeTheme(): void {
  if (document.cookie.includes(`theme=dark`)) {
    document.querySelector('html')?.classList.add('dark');
  } else if (document.cookie.includes(`theme=light`)) {
    document.querySelector('html')?.classList.remove('dark');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('html')?.classList.add('dark');
  } else {
    document.querySelector('html')?.classList.remove('dark');
  }
}

const BaseHead: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${initializeTheme.toString()})()`,
          }}
        />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Jason Henderson" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Script src="https://kit.fontawesome.com/597740db7b.js"></Script>
    </>
  );
};

export default BaseHead;
