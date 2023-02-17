import type { GetStaticProps } from 'next';
import type { DualPost } from '../../lib/types';
import PostPreview from '../../components/PostPreview';
import { getAllPosts } from '../../lib/getAllPosts';
import PageWrapper from '../../components/PageWrapper';

interface Props {
  allPosts: DualPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts();
  return { props: { allPosts: allPosts } };
};

const Posts: React.FC<Props> = ({ allPosts }) => (
  <PageWrapper page="/publicaciones" withChrome language="es" redirectTo="/posts">
    <div className="p-8 md:p-16 dark:bg-slate-900">
      <h2 className="text-3xl xs:text-4xl font-inter dark:text-white">Publicaciones</h2>
      <p className="mt-3 text-slate-500">
        La mayoría de estas publicaciones son respuestas a correos electrónicos, mensajes
        de texto u otras preguntas planteadas en diversos contextos. Por supuesto, se ha
        eliminado cualquier nombre o información personal.
      </p>
    </div>
    {allPosts.length > 0 ? (
      <section className="sm:p-16 p-8 pt-12 sm:pt-4 space-y-14 md:space-y-8 relative bg-graph-paper dark:bg-slate-900 dark:[background-image:none]">
        {allPosts.map((post) => (
          <PostPreview post={post} key={post.es.id} />
        ))}
      </section>
    ) : (
      <div className="flex justify-center items-center mt-20 dark:bg-text-900">
        <i className="fa-solid fa-spinner text-5xl text-sky-500 text-opacity-30 animate-spin" />
      </div>
    )}
  </PageWrapper>
);

export default Posts;
