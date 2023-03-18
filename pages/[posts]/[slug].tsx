import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import EmbeddedAudio from '../../components/EmbeddedAudio';
import PageWrapper from '../../components/PageWrapper';
import { getAllPosts } from '../../lib/getAllPosts';
import { getExcerpt } from '../../lib/helpers';
import { Lang, Post } from '../../lib/types';

export const getStaticPaths: GetStaticPaths = async (context) => {
  const dualPosts = await getAllPosts();
  const paths = dualPosts
    .flatMap((post) => [post.en, post.es])
    .map((post) => ({
      params: {
        posts: post.lang === 'en' ? 'posts' : 'publicaciones',
        slug: post.slug,
      },
    }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allDualPosts = await getAllPosts();
  let whichLanguage: Lang = 'en';
  const dualPost = allDualPosts.find((post) => {
    if (post.es.slug === context.params?.slug) {
      whichLanguage = 'es';
    }
    return post.en.slug === context.params?.slug || post.es.slug === context.params?.slug;
  })!;
  const post = dualPost[whichLanguage];

  return {
    props: {
      post,
      alternateLanguageSlug: whichLanguage === 'en' ? dualPost.es.slug : dualPost.en.slug,
    },
  };
};

interface Props {
  post: Post<Lang>;
  alternateLanguageSlug: string;
}

const Post: React.FC<Props> = ({ post, alternateLanguageSlug }) => {
  const language = post.lang;
  const content = {
    en: {
      page: '/posts',
      redirectTo: `/publicaciones/${alternateLanguageSlug}`,
      title: `${post.title} | The Ancient Path`,
    },
    es: {
      page: '/publicaciones',
      redirectTo: `/posts/${alternateLanguageSlug}`,
      title: `${post.title} | La Senda Antigua`,
    },
  };
  const c = content[language];

  return (
    <PageWrapper
      language={language}
      withChrome
      page={c.page}
      smallFooter
      redirectTo={c.redirectTo}
      title={c.title}
      metaDescription={getExcerpt(post.content, 300) /* TEMP */}
    >
      <div className="bg-graph-paper dark:bg-slate-900 dark:[background-image:none] relative flex flex-col items-center overflow-x-hidden">
        <div className="w-176 h-176 absolute -left-96 top-128 sky-cloud"></div>
        <div className="w-176 h-176 absolute -left-128 top-60 sky-cloud"></div>
        <div className="w-176 h-176 absolute -right-128 top-176 sky-cloud"></div>
        <div className="w-176 h-176 absolute left-36 bottom-52 sky-cloud"></div>
        <div className="flex flex-col min-h-screen prose dark:prose-invert mx-0 sm:mx-8 mt-2 md:mt-10 text-justify bg-white dark:bg-slate-800/80 p-6 sm:p-8 pb-0 mb-10 sm:border-[0.5px] dark:border-slate-700 sm:rounded-xl max-w-3xl relative sm:shadow">
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
      </div>
    </PageWrapper>
  );
};

export default Post;
