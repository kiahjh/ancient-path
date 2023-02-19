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
  const post = allDualPosts.filter((p) => p.es.slug === context.params?.slug)[0];
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
  post: DualPost;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <PageWrapper
      withChrome
      language={'es'}
      page="/publicaciones"
      smallFooter
      redirectTo={`/posts/${post.en.slug}`}
    >
      <div className="bg-graph-paper dark:bg-slate-900 dark:[background-image:none] relative flex flex-col items-center overflow-x-hidden">
        <div className="w-176 h-176 absolute -left-96 top-128 sky-cloud"></div>
        <div className="w-176 h-176 absolute -left-128 top-60 sky-cloud"></div>
        <div className="w-176 h-176 absolute -right-128 top-176 sky-cloud"></div>
        <div className="w-176 h-176 absolute left-36 bottom-52 sky-cloud"></div>
        <div className="flex flex-col min-h-screen prose dark:prose-invert mx-6 sm:mx-8 mt-24 lg:mt-10 text-justify bg-white dark:bg-slate-800/80 p-6 sm:p-8 pb-0 mb-10 border-[0.5px] dark:border-slate-700 rounded-xl max-w-3xl relative shadow">
          <header className="mb-2 flex justify-start items-center">
            <h1 className="text-3xl font-inter text-left dark:text-white">
              {post.es.title}
            </h1>
          </header>
          <main className="grow">
            <EmbeddedAudio
              trackId={post.es.soundcloudId}
              lang={post.es.lang}
              title={post.es.title}
            />
            <div
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: post.es.content }}
            ></div>
          </main>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Post;
