import type { NextPage, GetServerSideProps } from 'next';
import type { DualPost, Lang, Theme } from '../lib/types';
import HeroBlock from '../components/HeroBlock';
import RecentPostsBlock from '../components/RecentPostsBlock';
import { getAllPosts } from '../lib/getAllPosts';
import PageWrapper from '../components/PageWrapper';
import StartHereBlock from '../components/StartHereBlock';

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let language: Lang = 'en';
  const languageOverride = context.req.cookies.languageOverride;
  if (languageOverride && (languageOverride === 'es' || languageOverride === 'en')) {
    language = languageOverride;
  } else if (context.req.headers['accept-language']?.startsWith('es')) {
    language = 'es';
  }

  const allPosts = await getAllPosts();
  let featuredPosts: DualPost[] = [];

  if (language === 'en') {
    featuredPosts = allPosts.filter(
      (post) =>
        post.en.slug === 'two-births-in-man' ||
        post.en.slug === 'christ-died-for-us-not-instead-of-us' ||
        post.en.slug === 'leaving-egypt' ||
        post.en.slug === 'the-appearings-of-christ' ||
        post.en.slug === 'grace-should-reign',
    );
  } else {
    featuredPosts = allPosts.filter(
      (post) =>
        post.es.slug === 'dos-nacimientos-en-el-hombre' ||
        post.es.slug === 'cristo-murio-por-nosotros-no-en-lugar-de-nosotros' ||
        post.es.slug === 'dejar-egipto' ||
        post.es.slug === 'las-apariciones-de-cristo' ||
        post.es.slug === 'la-gracia-debe-reinar',
    );
  }

  return {
    props: {
      language,
      recentPosts: allPosts.slice(0, 3),
      featuredPosts,
    },
  };
};

interface Props {
  recentPosts: DualPost[];
  featuredPosts: DualPost[];
  language: Lang;
}

const Home: NextPage<Props> = ({ recentPosts, language, featuredPosts }) => (
  <PageWrapper
    page="/"
    language={language}
    withChrome
    redirectTo="/"
    title={language === 'en' ? 'The Ancient Path' : 'La Senda Antigua'}
    metaDescription={language === 'en' ? 'Spiritual writings' : 'Escrituras espirituales'}
  >
    <HeroBlock language={language} />
    <StartHereBlock featuredPosts={featuredPosts} language={language} />
    <RecentPostsBlock posts={recentPosts} language={language} />
  </PageWrapper>
);

export default Home;
