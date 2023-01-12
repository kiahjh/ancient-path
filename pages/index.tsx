import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Chrome from '../components/Chrome';
import HeroBlock from '../components/HeroBlock';
import RecentPostsBlock from '../components/RecentPostsBlock';
import { getAllPosts } from '../lib/getAllPosts';
import { DualPost } from '../lib/types';

const Home: NextPage = () => {
  const [allPosts, setAllPosts] = useState<DualPost[]>([]);

  useEffect(() => {
    getAllPosts().then(setAllPosts);
  }, []);

  return (
    <Chrome page="/">
      <HeroBlock />
      <RecentPostsBlock posts={allPosts} />
    </Chrome>
  );
};

export default Home;
