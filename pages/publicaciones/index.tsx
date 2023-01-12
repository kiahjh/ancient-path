import React, { useEffect, useState } from 'react';
import Chrome from '../../components/Chrome';
import PostPreview from '../../components/PostPreview';
import { getAllPosts } from '../../lib/getAllPosts';
import { DualPost } from '../../lib/types';

interface Props {}

const Posts: React.FC<Props> = ({}) => {
  const [allPosts, setAllPosts] = useState<DualPost[]>([]);

  useEffect(() => {
    getAllPosts().then(setAllPosts);
  }, []);

  return (
    <Chrome page="/publicaciones">
      <div className="p-8 md:p-16">
        <h2 className="text-3xl xs:text-4xl font-inter">Publicaciones</h2>
        <p className="mt-3 text-gray-500">
          La mayoría de estas publicaciones son respuestas a correos electrónicos,
          mensajes de texto u otras preguntas planteadas en diversos contextos. Por
          supuesto, se ha eliminado cualquier nombre o información personal.
        </p>
      </div>
      {allPosts.length > 0 ? (
        <section className="sm:p-16 p-8 pt-12 sm:pt-4 space-y-14 md:space-y-8 relative bg-graph-paper">
          {allPosts.map((post) => (
            <PostPreview post={post} key={post.es.id} />
          ))}
        </section>
      ) : (
        <div className="flex justify-center items-center mt-20">
          <i className="fa-solid fa-spinner text-5xl text-sky-500 text-opacity-30 animate-spin" />
        </div>
      )}
    </Chrome>
  );
};

export default Posts;
