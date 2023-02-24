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

  const allPosts = await getAllPosts();

  return {
    props: {
      language,
      recentPosts: allPosts.slice(0, 3),
    },
  };
};

interface Props {
  recentPosts: DualPost[];
  language: Lang;
}

const Home: NextPage<Props> = ({ recentPosts, language }) => (
  <PageWrapper
    page="/"
    language={language}
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
