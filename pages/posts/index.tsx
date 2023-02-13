import fs from 'node:fs';
import type { GetStaticProps } from 'next';
import type { DualPost } from '../../lib/types';
import Chrome from '../../components/Chrome';
import PostPreview from '../../components/PostPreview';
import { getAllPosts } from '../../lib/getAllPosts';
import { podcastXml } from '../../lib/podcast';

interface Props {
  allPosts: DualPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts();
  const enPosts = allPosts.map((dual) => dual.en);
  const esPosts = allPosts.map((dual) => dual.es);
  fs.writeFileSync(`../../public/podcast.en.rss`, podcastXml(enPosts));
  fs.writeFileSync(`../../public/podcast.es.rss`, podcastXml(esPosts));

  return { props: { allPosts: allPosts } };
};

const Posts: React.FC<Props> = ({ allPosts }) => (
  <Chrome page="/posts" language="en" redirectTo="/publicaciones">
    <div className="p-8 md:p-16">
      <h2 className="text-3xl xs:text-4xl font-inter">Posts</h2>
      <p className="mt-3 text-gray-500">
        The majority of these posts are my replies to emails, text messages, or other
        questions brought up in various settings. Any names or personal information have
        of course been removed.
      </p>
    </div>
    {allPosts.length > 0 ? (
      <section className="sm:p-16 p-8 pt-12 sm:pt-4 space-y-14 md:space-y-8 relative bg-graph-paper">
        {allPosts.map((post) => (
          <PostPreview post={post} key={post.en.id} />
        ))}
      </section>
    ) : (
      <div className="flex justify-center items-center mt-20">
        <i className="fa-solid fa-spinner text-5xl text-sky-500 text-opacity-30 animate-spin" />
      </div>
    )}
  </Chrome>
);

export default Posts;
