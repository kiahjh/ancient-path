import React from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import SeriesFilter from './SeriesFilter';
import { Lang, Post, Series } from '../lib/types';
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
  const routeSlug = language === `en` ? `search-results` : `resultados-de-busqueda`;

  async function search(query: string, seriesId: string | null) {
    if (!query && !seriesId) {
      await router.push(`/posts/page/1`);
    } else if (!seriesId) {
      await router.push(`/${routeSlug}?q=${query}&lang=${language}`);
      router.reload();
    } else if (!query) {
      await router.push(`/${routeSlug}?series=${seriesId}&lang=${language}`);
      router.reload();
    } else {
      await router.push(`/${routeSlug}?q=${query}&series=${seriesId}&lang=${language}`);
      router.reload();
    }
  }

  return (
    <div className="p-4 xs:p-8 sm:p-12 lg:p-20 flex flex-col items-center bg-gradient-to-b from-white dark:from-slate-900 via-sky-100 dark:via-sky-500/10 to-white dark:to-slate-900">
      <div className="mb-8 flex flex-col-reverse md:flex-row justify-between z-10 max-w-[1400px] w-full">
        <SeriesFilter
          series={series.map((s) => ({ id: s.id, title: s[language].title }))}
          setSeriesFilter={(series) => search(searchQuery, series)}
          seriesFilter={seriesFilter}
          language={language}
        />
        <div
          className={cx(
            'flex justify-end rounded-2xl gap-2 md:ml-8 mb-4 md:mb-0 flex-grow',
          )}
        >
          <input
            type="text"
            className={cx(
              'border-slate-200 dark:border-slate-700 border-[0.5px] rounded-2xl dark:text-slate-100 text-xl px-6 bg-white dark:bg-slate-800 placeholder:text-slate-300 dark:placeholder:text-slate-500 outline-none outline-offset-0 focus:outline-1 focus:outline-sky-400 focus:border-sky-500 transition-all duration-300 shadow shadow-slate-300/50 dark:shadow-black/30 md:w-72 lg:w-96 flex-grow md:flex-grow-0',
            )}
            placeholder={language === `en` ? 'Search posts' : 'Buscar publicaciones'}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            disabled={!queryParams || queryParams.get(`q`) === searchQuery}
            onClick={async () => await search(searchQuery, seriesFilter)}
            className={cx(
              'h-14 w-14 border-[0.5px] rounded-2xl flex justify-center items-center shadow-slate-300/50 transition-[background-color,color,transform] shrink-0',
              queryParams && queryParams.get(`q`) !== searchQuery
                ? `bg-sky-500 text-white border-sky-500 shadow shadow-sky-500/50 dark:shadow-sky-950/80 hover:bg-sky-600 hover:border-sky-600 active:scale-95 active:bg-sky-700`
                : `bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed`,
            )}
          >
            <i className="fa-solid fa-search text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-4 md:mt-8 w-full max-w-[1400px]">
        {loading && (
          <div className="flex justify-center items-center p-12">
            <i className="fa-solid fa-spinner text-4xl text-slate-500 animate-spin" />
          </div>
        )}
        {!loading! && !posts.length && (
          <div className="bg-white/70 dark:bg-slate-950/40 p-20 rounded-3xl border-[0.5px] border-slate-200 dark:border-slate-800 flex justify-center items-center">
            <span className="text-2xl text-slate-500 dark:text-slate-600">
              {language === `en`
                ? `Hmm, couldn't find any results for your search.`
                : `Hmm, parece que tu búsqueda no ha obtenido resultados.`}
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
