import type { NextPage, GetServerSideProps } from 'next';
import type { Lang, Post } from '../lib/types';
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
  const featuredPosts = allPosts
    .filter(
      (post) =>
        post.en.slug === 'two-births-in-man' ||
        post.en.slug === 'christ-died-for-us-not-instead-of-us' ||
        post.en.slug === 'leaving-egypt' ||
        post.en.slug === 'the-appearings-of-christ' ||
        post.en.slug === 'grace-should-reign',
    )
    .map((post) => ({
      title: post[language].title,
      description: post[language].description.split(' ').slice(0, 46).join(' '),
      slug: post[language].slug,
    }));

  const posts = allPosts.map((post) => ({
    title: post[language].title,
    description: post[language].description,
    slug: post[language].slug,
    createdAt: post[language].createdAt,
    category: post[language].category,
  }));
  const recentPosts = posts.slice(0, 3);

  return {
    props: {
      language,
      recentPosts,
      allPosts: posts,
      featuredPosts,
    },
  };
};

interface Props {
  featuredPosts: Array<Pick<Post<Lang>, 'title' | 'description' | 'slug'>>;
  recentPosts: Array<
    Pick<Post<Lang>, 'title' | 'description' | 'slug' | 'createdAt' | 'category'>
  >;
  allPosts: Array<
    Pick<Post<Lang>, 'title' | 'slug' | 'createdAt' | 'category' | 'description'>
  >;
  language: Lang;
}

const Home: NextPage<Props> = ({ recentPosts, language, featuredPosts, allPosts }) => (
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
