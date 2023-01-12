import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useContext } from 'react';
import EmbeddedAudio from '../../components/EmbeddedAudio';
import Footer from '../../components/Footer';
import { getAllPosts } from '../../lib/getAllPosts';
import { LanguageContext } from '../../lib/LanguageContext';
import { DualPost, Lang, Post } from '../../lib/types';

export const getStaticProps: GetStaticProps = async (context) => {
  const allDualPosts = await getAllPosts();
  const mixedPosts = allDualPosts
    .flatMap((dual: DualPost) => [dual.en, dual.es])
    .map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      modifiedAt: post.modifiedAt.toISOString(),
      publishedAt: post.publishedAt.toISOString(),
    }));
  const post = mixedPosts.filter((p) => p.slug === context.params?.slug)[0];
  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allDualPosts = await getAllPosts();
  const mixedPosts = allDualPosts.flatMap((dual: DualPost) => [dual.en, dual.es]);

  const paths = mixedPosts.map((post: Post<'en' | 'es'>) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

interface Props {
  post: Post<Lang>;
}

const Post: React.FC<Props> = ({ post }) => {
  const language = useContext(LanguageContext);
  return (
    <div className="bg-graph-paper relative flex flex-col items-center overflow-x-hidden">
      <div className="w-176 h-176 absolute -left-96 top-128 sky-cloud"></div>
      <div className="w-176 h-176 absolute -left-128 top-60 sky-cloud"></div>
      <div className="w-176 h-176 absolute -right-128 top-176 sky-cloud"></div>
      <div className="w-176 h-176 absolute left-36 bottom-52 sky-cloud"></div>
      <div className="fixed w-screen p-6 top-0 z-10">
        <a
          className="left-16 top-6 w-12 h-12 hover:bg-sky-50 cursor-pointer transition duration-100 flex justify-center items-center rounded-full text-gray-500 hover:text-gray-600 border-[0.5px] shadow-md bg-white"
          href="/posts"
        >
          <i className="fa fa-arrow-left text-xl"></i>
        </a>
      </div>
      <div className="flex flex-col min-h-screen prose mx-6 sm:mx-8 mt-24 lg:mt-10 text-justify bg-white p-6 sm:p-8 pb-0 mb-10 border-[0.5px] rounded-xl max-w-3xl relative shadow">
        <header className="mb-2 flex justify-start items-center">
          <h1 className="text-3xl font-inter text-left">{post.title}</h1>
        </header>
        <main className="grow">
          <EmbeddedAudio
            trackId={post.soundcloudId}
            lang={post.lang}
            title={post.title}
          />
          <div className="mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </main>
      </div>
      <Footer page="/posts" small language={language} />
    </div>
  );
};

export default Post;
