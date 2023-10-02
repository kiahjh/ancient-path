import Link from 'next/link';
import React from 'react';
import { relativeTime } from '../lib/dates';
import type { Lang, Post, Series } from '../lib/types';
import Button from './Button';

interface Props {
  post: Post<Lang>;
  series: Series[];
}

const PostPreview: React.FC<Props> = ({ post, series }) => {
  const language = post.lang;

  return (
    <div
      className="border-[0.5px] border-slate-200 dark:border-slate-700 shadow shadow-slate-300/50 dark:shadow-black/50 rounded-2xl bg-white/50 dark:bg-slate-800/70 backdrop-blur-xl"
      key={post.id}
    >
      <div className="px-4 xs:px-8 md:px-12 py-4 xs:py-6 md:py-8">
        <h3 className="text-2xl font-bold dark:text-slate-100">{post.title}</h3>
        <span className="text-slate-500 dark:text-slate-500 font-medium">
          {relativeTime(post.createdAt, language)}
        </span>
        <p className="text-slate-500 mt-2 dark:text-slate-400 text-sm sm:text-base">
          {post.description}
        </p>
      </div>
      <div className="p-4 sm:pt-0 rounded-b-2xl flex flex-col sm:flex-row justify-between items-start sm:pl-8 md:pl-12">
        <div className="flex justify-center self-stretch sm:self-center sm:justify-start gap-2 mb-4 sm:mb-0 flex-wrap">
          {post.category === `teaching` && (
            <div className="rounded-full border border-sky-200 dark:border-sky-300/40 px-4 py-0.5 flex items-center bg-sky-50/50 dark:bg-sky-500/20 w-fit">
              <span className="text-sky-500 dark:text-sky-200">Teaching</span>
            </div>
          )}
          {post.series && (
            <Link
              className="rounded-full border border-slate-300 dark:border-slate-600 px-4 py-0.5 flex items-center bg-slate-50/50 dark:bg-slate-700 w-fit transition-colors hover:bg-slate-100 dark:hover:bg-slate-600 duration-100"
              href={`/search-results/?series=${post.series}&lang=${language}`}
            >
              <i className="fa-solid fa-list text-slate-500 dark:text-slate-300 text-xs mr-3" />
              <span className="text-slate-500 dark:text-slate-200">
                {(series.find((s) => s.id === post.series) || {})[language]?.title || ``}
              </span>
            </Link>
          )}
        </div>
        <Button
          type="link"
          to={language === `en` ? `/posts/${post.slug}` : `/publicaciones/${post.slug}`}
          color="secondary"
          icon="arrow-right"
          size="md"
          className="self-stretch"
        >
          {language === `en` ? `View post` : `Ver publicación`}
        </Button>
      </div>
    </div>
  );
};

export default PostPreview;
