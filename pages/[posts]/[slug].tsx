import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import cx from 'classnames';
import AudioPlayer from '../../components/AudioPlayer';
import PageWrapper from '../../components/PageWrapper';
import { getAllPosts } from '../../lib/getAllPosts';
import { description } from '../../lib/helpers';
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

export const getStaticProps: GetStaticProps<React.ComponentProps<typeof Post>> = async (
  context,
) => {
  const allDualPosts = await getAllPosts();
  let whichLanguage: Lang = 'en';
  let indexOfPost = 0;
  const dualPost = allDualPosts.find((post, index) => {
    if (post.es.slug === context.params?.slug) {
      whichLanguage = 'es';
    }
    if (post.en.slug === context.params?.slug || post.es.slug === context.params?.slug) {
      indexOfPost = index;
      return true;
    }
    return false;
  })!;
  const nextPostSlug =
    indexOfPost !== 0 ? allDualPosts[indexOfPost - 1][whichLanguage].slug : null;
  const prevPostSlug =
    indexOfPost !== allDualPosts.length - 1
      ? allDualPosts[indexOfPost + 1][whichLanguage].slug
      : null;
  const post = dualPost[whichLanguage];

  return {
    props: {
      post,
      nextPostSlug,
      prevPostSlug,
      alternateLanguageSlug: whichLanguage === 'en' ? dualPost.es.slug : dualPost.en.slug,
    },
  };
};

interface Props {
  post: Post<Lang>;
  nextPostSlug: string | null;
  prevPostSlug: string | null;
  alternateLanguageSlug: string;
}

const Post: React.FC<Props> = ({
  post,
  alternateLanguageSlug,
  nextPostSlug,
  prevPostSlug,
}) => {
  const language = post.lang;
  const content = {
    en: {
      page: '/posts',
      redirectTo: `/publicaciones/${alternateLanguageSlug}`,
      title: `${post.title} | The Ancient Path`,
      nextButtonText: 'Next post',
      prevButtonText: 'Previous post',
      nextButtonHref: nextPostSlug ? `/posts/${nextPostSlug}` : null,
      prevButtonHref: prevPostSlug ? `/posts/${prevPostSlug}` : null,
    },
    es: {
      page: '/publicaciones',
      redirectTo: `/posts/${alternateLanguageSlug}`,
      title: `${post.title} | La Senda Antigua`,
      nextButtonText: 'Siguiente publicación',
      prevButtonText: 'Publicación anterior',
      nextButtonHref: nextPostSlug ? `/publicaciones/${nextPostSlug}` : null,
      prevButtonHref: prevPostSlug ? `/publicaciones/${prevPostSlug}` : null,
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
      metaDescription={description(post)}
    >
      <div className="bg-graph-paper dark:bg-slate-900 dark:[background-image:none] relative flex flex-col items-center overflow-x-hidden">
        <div className="w-176 h-176 absolute -left-96 top-128 sky-cloud"></div>
        <div className="w-176 h-176 absolute -left-128 top-60 sky-cloud"></div>
        <div className="w-176 h-176 absolute -right-128 top-176 sky-cloud"></div>
        <div className="w-176 h-176 absolute left-36 bottom-52 sky-cloud"></div>
        <div className="flex flex-col items-center min-h-screen mx-0 sm:mx-8 mt-2 md:mt-10 text-justify bg-white dark:bg-slate-800/80 p-6 sm:p-8 pb-0 mb-10 sm:border-[0.5px] dark:border-slate-700 sm:rounded-xl max-w-3xl relative sm:shadow">
          <header className="flex justify-start items-center w-full">
            <h1 className="text-4xl font-inter text-left dark:text-white">
              {post.title}
            </h1>
          </header>
          <main className="grow">
            <AudioPlayer src={post.mp3Url} postTitle={post.title} className="my-6" />
            <div
              className="mb-8 prose dark:prose-invert "
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </main>
          <div className="w-full flex justify-between items-center">
            {c.prevButtonHref ? (
              <Link
                href={c.prevButtonHref}
                className={cx(
                  `bg-sky-100 dark:bg-sky-500/10 dark:hover:bg-sky-500/20 dark:text-sky-400 px-4 py-2 font-medium text-sky-500 rounded-lg transition duration-100 hover:bg-sky-200/70 active:scale-95`,
                )}
              >
                <i className="mr-2 fa-solid fa-arrow-left" />
                {c.prevButtonText}
              </Link>
            ) : (
              <div />
            )}
            {c.nextButtonHref ? (
              <Link
                href={c.nextButtonHref}
                className={cx(
                  `bg-sky-100 dark:bg-sky-500/10 dark:hover:bg-sky-500/20 dark:text-sky-400 px-4 py-2 font-medium text-sky-500 rounded-lg transition duration-100 hover:bg-sky-200/70 active:scale-95`,
                )}
              >
                {c.nextButtonText}
                <i className="ml-2 fa-solid fa-arrow-right" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Post;
