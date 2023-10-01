import React from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import SeriesFilter from './SeriesFilter';
import { Lang, Post, Series } from '../lib/types';
import Button from './Button';
import Link from 'next/link';
import PostPreview from './PostPreview';

interface Props {
  series: Series[];
  language: Lang;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  seriesFilter: string | null;
  queryParams: URLSearchParams | null;
  loading: boolean;
  posts: Post<Lang>[];
}

const PostsList: React.FC<Props> = ({
  series,
  language,
  searchQuery,
  setSearchQuery,
  seriesFilter,
  queryParams,
  loading,
  posts,
}) => {
  const router = useRouter();

  async function search(query: string, seriesId: string | null) {
    if (!query && !seriesId) {
      await router.push(`/posts/page/1`);
    } else if (!seriesId) {
      await router.push(`/search-results?q=${query}&lang=${language}`);
      router.reload();
    } else if (!query) {
      await router.push(`/search-results?series=${seriesId}&lang=${language}`);
      router.reload();
    } else {
      await router.push(`/search-results?q=${query}&series=${seriesId}&lang=${language}`);
      router.reload();
    }
  }

  return (
    <div className="p-20 flex flex-col items-center bg-gradient-to-b from-white via-sky-100 to-white">
      <div className="mb-8 flex justify-between z-10 max-w-[1400px] w-full">
        <SeriesFilter
          series={series.map((s) => ({ id: s.id, title: s[language].title }))}
          setSeriesFilter={(series) => search(searchQuery, series)}
          seriesFilter={seriesFilter}
          language={language}
        />
        <div className={cx('flex justify-end rounded-2xl gap-2 ml-8 flex-grow')}>
          <input
            type="text"
            className={cx(
              'border-slate-200 border-[0.5px] rounded-2xl text-xl px-6 bg-white placeholder:text-slate-300 outline-none outline-offset-0 focus:outline-1 focus:outline-sky-400 focus:border-sky-500 transition-all duration-300 shadow shadow-slate-300/50 min-w-[300px] focus:flex-grow',
              searchQuery && 'flex-grow',
            )}
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            disabled={!queryParams || queryParams.get(`q`) === searchQuery}
            onClick={async () => await search(searchQuery, seriesFilter)}
            className={cx(
              'h-14 w-14 border-[0.5px] rounded-2xl flex justify-center items-center shadow-slate-300/50 transition-[background-color,color,transform]',
              queryParams && queryParams.get(`q`) !== searchQuery
                ? `bg-sky-500 text-white border-sky-500 shadow hover:bg-sky-600 hover:border-sky-600 active:scale-95 active:bg-sky-700`
                : `bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed`,
            )}
          >
            <i className="fa-solid fa-search text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-8 w-full max-w-[1400px]">
        {loading && (
          <div className="flex justify-center items-center p-12">
            <i className="fa-solid fa-spinner text-4xl text-slate-500 animate-spin" />
          </div>
        )}
        {!loading! && !posts.length && (
          <div className="bg-white/70 p-20 rounded-3xl border-[0.5px] border-slate-200 flex justify-center items-center">
            <span className="text-2xl text-slate-500">
              Hmm, couldn&apos;t find any results for your search.
            </span>
          </div>
        )}
        {posts.map((post) => (
          <PostPreview post={post} series={series} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
