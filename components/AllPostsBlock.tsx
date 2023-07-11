import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { Lang, Post } from '../lib/types';
import TeachingBadge from './TeachingBadge';

interface Props {
  allPosts: Array<
    Pick<Post<Lang>, 'title' | 'slug' | 'createdAt' | 'category' | 'description'>
  >;
  language: Lang;
}

const AllPostsBlock: React.FC<Props> = ({ allPosts, language }) => {
  return (
    <section className="bg-gradient-to-b from-sky-500 to-white dark:from-sky-950 dark:to-slate-900 pt-12 lg:pt-0">
      <div className="flex justify-between items-center mx-6 xs:mx-8 sm:mx-12 gap-6">
        <h3 className="text-2xl xs:text-3xl font-bold text-white">
          {language === 'en' ? 'More posts:' : 'Más publicaciones:'}
        </h3>
        <Link
          href={language === 'en' ? '/posts/page/1' : 'publicaciones/pagina/1'}
          className="px-6 py-2 dark:bg-sky-800 bg-white rounded-lg text-sky-600 dark:text-white hover:bg-sky-50 dark:hover:bg-sky-900 transition duration-100"
        >
          {language === 'en' ? 'View all posts' : 'Ver todas las publicaciones'}
          <i className="fa-solid fa-arrow-right ml-2" />
        </Link>
      </div>
      <div
        className={cx(
          'p-6 xs:p-8 sm:p-12 pt-8 flex gap-4 xs:gap-8 overflow-hidden overflow-x-scroll relative',
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]', // hide horizontal scrollbar
        )}
      >
        {allPosts.slice(3, allPosts.length).map((post) => (
          <div
            className="shrink-0 bg-white/70 dark:bg-slate-950/50 p-6 sm:p-8 rounded-xl backdrop-blur-xl shadow-lg shadow-slate-300/50 dark:shadow-black/20 relative overflow-hidden border-[0.5px] border-slate-200 dark:border-slate-800"
            key={post.slug}
          >
            {post.category === 'teaching' && (
              <TeachingBadge
                language={language}
                className="absolute top-2 right-2 hidden xs:block"
              />
            )}
            <h3 className="text-lg font-bold xs:mt-2 dark:text-white">{post.title}</h3>
            <p className="max-w-sm mt-2 text-slate-700/80 dark:text-slate-400 hidden xs:block">
              {post.description.split(' ').slice(0, 20).join(' ') + '...'}
            </p>
            <Link
              href={`/${language === 'en' ? 'posts' : 'publicaciones'}/${post.slug}`}
              className="absolute bg-white/80 dark:bg-slate-900/90 [transition:200ms] left-0 top-0 w-full h-full flex justify-center items-center group hover:opacity-100 opacity-0 cursor-pointer"
            >
              <div className="translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 text-sky-500 dark:text-sky-400">
                <span className="text-lg font-bold">Read post</span>
                <i className="fa-solid fa-arrow-right ml-2" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPostsBlock;
