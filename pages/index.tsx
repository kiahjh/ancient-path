import type { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import type { DualPost, Lang } from '../lib/types';
import Chrome from '../components/Chrome';
import HeroBlock from '../components/HeroBlock';
import RecentPostsBlock from '../components/RecentPostsBlock';
import { getAllPosts } from '../lib/getAllPosts';

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language: Lang = 'en';
  const languageOverride = context.req.cookies.languageOverride;
  if (languageOverride && (languageOverride === 'es' || languageOverride === 'en')) {
    language = languageOverride;
  } else if (context.req.headers['accept-language']?.startsWith('es')) {
    language = 'es';
  }

  const allPosts = await getAllPosts();
  // console.log(allPosts[1]);

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
  <Chrome page="/" language={language} redirectTo="/">
    <HeroBlock language={language} />
    <RecentPostsBlock posts={recentPosts} language={language} />
  </Chrome>
);

export default Home;
