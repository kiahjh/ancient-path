import type { NextPage, GetServerSideProps } from 'next';
import type { DualPost, Lang, Theme } from '../lib/types';
import HeroBlock from '../components/HeroBlock';
import RecentPostsBlock from '../components/RecentPostsBlock';
import { getAllPosts } from '../lib/getAllPosts';
import PageWrapper from '../components/PageWrapper';

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language: Lang = 'en';
  const languageOverride = context.req.cookies.languageOverride;
  if (languageOverride && (languageOverride === 'es' || languageOverride === 'en')) {
    language = languageOverride;
  } else if (context.req.headers['accept-language']?.startsWith('es')) {
    language = 'es';
  }

  let theme: Theme = 'light';
  const themeCookie = context.req.cookies.theme;
  if (themeCookie === 'dark') {
    theme = themeCookie;
  }

  const allPosts = await getAllPosts();

  return {
    props: {
      language,
      theme,
      recentPosts: allPosts.slice(0, 3),
    },
  };
};

interface Props {
  recentPosts: DualPost[];
  language: Lang;
  theme: Theme;
}

const Home: NextPage<Props> = ({ recentPosts, language, theme }) => (
  <PageWrapper
    page="/"
    language={language}
    theme={theme}
    withChrome
    redirectTo="/"
    title={language === 'en' ? 'The Ancient Path' : 'La Senda Antigua'}
    metaDescription={language === 'en' ? 'Spiritual writings' : 'Escrituras espirituales'}
  >
    <HeroBlock language={language} />
    <RecentPostsBlock posts={recentPosts} language={language} />
  </PageWrapper>
);

export default Home;
