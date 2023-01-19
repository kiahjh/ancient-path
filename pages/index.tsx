import fs from 'node:fs';
import type { NextPage, GetStaticProps } from 'next';
import type { DualPost } from '../lib/types';
import Chrome from '../components/Chrome';
import HeroBlock from '../components/HeroBlock';
import RecentPostsBlock from '../components/RecentPostsBlock';
import { getAllPosts } from '../lib/getAllPosts';
import { podcastXml } from '../lib/podcast';

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts();
  const enPosts = allPosts.map((dual) => dual.en);
  const esPosts = allPosts.map((dual) => dual.es);
  fs.writeFileSync(`./public/podcast.en.rss`, podcastXml(enPosts));
  fs.writeFileSync(`./public/podcast.es.rss`, podcastXml(esPosts));
  return { props: { recentPosts: allPosts.slice(0, 3) } };
};

interface Props {
  recentPosts: DualPost[];
}

const Home: NextPage<Props> = ({ recentPosts }) => (
  <Chrome page="/">
    <HeroBlock />
    <RecentPostsBlock posts={recentPosts} />
  </Chrome>
);

export default Home;
