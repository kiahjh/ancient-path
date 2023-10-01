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
      className="border-[0.5px] border-slate-200 shadow shadow-slate-300/50 rounded-2xl bg-white/50 backdrop-blur-xl"
      key={post.id}
    >
      <div className="px-12 py-8">
        <h3 className="text-2xl font-bold">{post.title}</h3>
        <span className="text-slate-500">{relativeTime(post.createdAt, language)}</span>
        <p className="text-slate-500 mt-2">{post.description}</p>
      </div>
      <div className="p-4 pt-0 rounded-b-2xl flex justify-between items-start pl-12">
        <div className="flex gap-2">
          {post.category === `teaching` && (
            <div className="rounded-full border border-sky-200 px-4 py-0.5 flex items-center bg-sky-50/50 w-fit mt-2">
              <span className="text-sky-500">Teaching</span>
            </div>
          )}
          {post.series && (
            <Link
              className="rounded-full border border-slate-300 px-4 py-0.5 flex items-center bg-slate-50/50 w-fit mt-2 transition-colors hover:bg-slate-100 duration-100"
              href={`/search-results/?series=${post.series}&lang=${language}`}
            >
              <i className="fa-solid fa-list text-slate-500 text-xs mr-3" />
              <span className="text-slate-500">
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
        >
          {language === `en` ? `View post` : `Ver publicación`}
        </Button>
      </div>
    </div>
  );
};

export default PostPreview;
