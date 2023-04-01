import React from 'react';
import cx from 'classnames';
import type { Lang, Post } from '../lib/types';
import { englishMonths, spanishMonths } from '../lib/dates';
import TeachingBadge from './TeachingBadge';
import { description } from '../lib/helpers';

interface Props {
  post: Pick<
    Post<Lang>,
    'title' | 'createdAt' | 'category' | 'lang' | 'description' | 'id' | 'slug'
  >;
}

const PostPreview: React.FC<Props> = ({ post }) => {
  const language = post.lang;

  return (
    <div className="shadow-lg border-[0.5px] dark:border-slate-700 rounded-xl relative bg-white dark:bg-slate-800/50 flex flex-col justify-start items-start md:ml-10">
      {new Date().getTime() - new Date(post.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7 && (
        <div
          className={cx(
            'w-12 h-12 bg-sky-400 dark:bg-sky-700 rounded-full flex justify-center items-center text-white right-4 -top-4 absolute shadow-md uppercase font-medium rotate-12',
            language === 'en' ? 'text-sm' : 'text-xs',
          )}
        >
          {language === 'en' ? 'New' : 'Nuevo'}
        </div>
      )}
      <div className="absolute w-20 h-20 rounded-full shadow-md bg-white dark:bg-slate-700 md:-left-10 md:top-6 -top-10 left-4 flex flex-col items-center justify-center border-[0.5px] dark:border-slate-700">
        <h3 className="uppercase text-slate-400 dark:text-slate-200 text-sm font-light">
          {(language === `en` ? englishMonths : spanishMonths)[
            new Date(post.createdAt).getMonth()
          ].substring(0, 3)}
        </h3>
        <h3 className="text-2xl text-sky-500 dark:text-sky-400">
          {new Date(post.createdAt).getDate()}
        </h3>
      </div>
      <div className="p-6 md:pl-16 pt-16 md:pt-6 pb-4">
        <div className="flex justify-start items-center flex-wrap">
          <h2 className="text-xl font-inter text-slate-900 dark:text-white mr-3 mb-2">
            {post.title}
          </h2>
          {post.category === 'teaching' && (
            <TeachingBadge language={language} className="mb-2" />
          )}
        </div>
        <p
          className="mt-3 mb-3 text-slate-500 dark:text-slate-400"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </div>
      <div className="p-4 flex justify-end w-full bg-slate-50 dark:bg-slate-700/30 rounded-b-xl">
        <a
          className="block self-end px-4 py-2 text-sky-500 dark:text-sky-300 transition duration-100 hover:text-sky-600 dark:hover:text-sky-200 cursor-pointer rounded-lg bg-sky-100 dark:bg-sky-500/10"
          href={language === `en` ? `/posts/${post.slug}` : `/publicaciones/${post.slug}`}
        >
          {language === `en` ? `Read post` : `Leer publicación`}
          {` `}
          <i className="fa-solid fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  );
};

export default PostPreview;
