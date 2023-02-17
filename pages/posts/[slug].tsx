import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { DualPost, Lang } from '../../lib/types';
import EmbeddedAudio from '../../components/EmbeddedAudio';
import Footer from '../../components/Footer';
import { getAllPosts } from '../../lib/getAllPosts';
import { Post } from '../../lib/types';
import PageWrapper from '../../components/PageWrapper';

export const getStaticProps: GetStaticProps = async (context) => {
  const allDualPosts = await getAllPosts();
  const mixedPosts = allDualPosts
    .flatMap((dual: DualPost) => [dual.en, dual.es])
    .map((post) => ({
      ...post,
      createdAt: post.createdAt,
      modifiedAt: post.modifiedAt,
      publishedAt: post.publishedAt,
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
  return (
    <PageWrapper language="en" withChrome={false}>
      <div className="bg-graph-paper dark:bg-slate-900 dark:[background-image:none] relative flex flex-col items-center overflow-x-hidden">
        <div className="w-176 h-176 absolute -left-96 top-128 sky-cloud"></div>
        <div className="w-176 h-176 absolute -left-128 top-60 sky-cloud"></div>
        <div className="w-176 h-176 absolute -right-128 top-176 sky-cloud"></div>
        <div className="w-176 h-176 absolute left-36 bottom-52 sky-cloud"></div>
        <div className="fixed w-screen p-6 top-0 z-10">
          <a
            className="left-16 top-6 w-12 h-12 hover:bg-sky-50 cursor-pointer transition duration-100 flex justify-center items-center rounded-full text-gray-500 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300 border-[0.5px] dark:border-slate-700 shadow-md bg-white dark:bg-slate-800 dark:hover:bg-slate-700"
            href="/posts"
          >
            <i className="fa fa-arrow-left text-xl"></i>
          </a>
        </div>
        <div className="flex flex-col min-h-screen prose dark:prose-invert mx-6 sm:mx-8 mt-24 lg:mt-10 text-justify bg-white dark:bg-slate-800/80 p-6 sm:p-8 pb-0 mb-10 border-[0.5px] dark:border-slate-700 rounded-xl max-w-3xl relative shadow">
          <header className="flex justify-start items-center">
            <h1 className="text-4xl font-inter text-left dark:text-white">
              {post.title}
            </h1>
          </header>
          <main className="grow">
            <EmbeddedAudio
              trackId={post.soundcloudId}
              lang={post.lang}
              title={post.title}
            />
            <div
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </main>
        </div>
        <Footer page="/posts" small language={'en'} />
      </div>
    </PageWrapper>
  );
};

export default Post;
