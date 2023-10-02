import { useState } from 'react';
import cx from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getAllSeries } from '../../lib/getData';
import PageWrapper from '../../components/PageWrapper';
import AudioPlayer from '../../components/AudioPlayer';
import { relativeTime } from '../../lib/dates';
import Button from '../../components/Button';
import { Lang, Post, Series } from '../../lib/types';
import SeriesFilter from '../../components/SeriesFilter';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { posts: `posts` },
      },
      {
        params: { posts: `publicaciones` },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<React.ComponentProps<typeof Posts>> = async (
  context,
) => {
  const dualPosts = await getAllPosts();
  const whichLanguage = context.params?.posts === 'posts' ? 'en' : 'es';
  const posts = dualPosts.map((dual) => dual[whichLanguage]);
  const series = await getAllSeries();

  return {
    props: {
      posts,
      series,
    },
  };
};

interface Props {
  posts: Array<Post<Lang>>;
  series: Array<Series>;
}

const Posts: React.FC<Props> = ({ posts, series }) => {
  const language = posts[0].lang;
  const content = {
    en: {
      page: '/posts',
      metaDescription: 'Spiritual writings',
      redirectTo: `/publicaciones`,
      title: `Posts | The Ancient Path`,
    },
    es: {
      page: '/publicaciones',
      metaDescription: 'Escrituras espirituales',
      redirectTo: `/posts`,
      title: `Publicaciones | La Senda Antigua`,
    },
  };
  const c = content[language];
  const firstPost = posts[0];
  const firstPostSeries = series.find((s) => s.id === firstPost.series);
  const [searchQuery, setSearchQuery] = useState(``);
  const [seriesFilter, setSeriesFilter] = useState<null | string>(null);

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((post) => {
      if (seriesFilter === null) return true;
      return post.series === seriesFilter;
    })
    .filter((post) => {
      if (post.id === firstPost.id && !searchQuery && !seriesFilter) return false;
      return true;
    });

  return (
    <PageWrapper
      page={c.page}
      withChrome
      language={language}
      redirectTo={c.redirectTo}
      title={c.title}
      metaDescription={c.metaDescription}
    >
      <div className="p-20 flex flex-col items-center bg-gradient-to-b from-white via-sky-100 to-white">
        <div className="mb-8 flex justify-between z-10 max-w-[1400px] w-full">
          <SeriesFilter
            series={series.map((s) => ({ id: s.id, title: s[language].title }))}
            setSeriesFilter={setSeriesFilter}
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
            <div className="h-14 w-14 border-[0.5px] border-slate-200 rounded-2xl flex justify-center items-center bg-white shadow shadow-slate-300/50 transition-colors text-slate-300">
              <i className="fa-solid fa-search text-xl" />
            </div>
          </div>
        </div>
        {!searchQuery && !seriesFilter && (
          <div className="border-[0.5px] border-slate-200 rounded-2xl max-w-[1400px] bg-white/50 backdrop-blur-xl shadow shadow-slate-300/50 relative">
            <div className="p-3 border-b border-slate-200 flex justify-center items-center rounded-t-3xl">
              <h2 className="text-lg font-semibold text-slate-400">Latest post</h2>
            </div>
            <div className="flex justify-between items-start gap-12 p-12">
              <div>
                <h3 className="font-semibold text-lg mb-2 bg-gradient-to-r from-sky-600 to-sky-500 w-fit bg-clip-text text-transparent">
                  {relativeTime(firstPost.createdAt, firstPost.lang)}
                </h3>
                <h1 className="font-inter text-5xl">{firstPost.title}</h1>
                <div className="my-4 flex gap-2">
                  {firstPost.category === `teaching` && (
                    <div className="rounded-full border border-sky-200 px-4 py-1 flex items-center bg-sky-50/50">
                      <span className="text-sky-500">Teaching</span>
                    </div>
                  )}
                  {firstPostSeries && (
                    <button
                      onClick={() => setSeriesFilter(firstPostSeries.id)}
                      className="rounded-full border border-slate-300 px-4 py-1 flex items-center transition-colors duration-100 hover:bg-slate-100"
                    >
                      <i className="fa-solid fa-list text-slate-500 text-sm mr-3" />
                      <span className="text-slate-500">
                        {firstPostSeries[language].title}
                      </span>
                    </button>
                  )}
                </div>
                <p className="text-lg text-slate-600 max-w-3xl">
                  {firstPost.description}
                </p>
              </div>
              <div className="p-8 bg-slate-200/20 shadow-inner rounded-2xl flex flex-col gap-8">
                <AudioPlayer src={firstPost.mp3Url} className="w-128" />
                <Button
                  type="link"
                  to={
                    language === `en`
                      ? `/posts/${firstPost.slug}`
                      : `/publicaciones/${firstPost.slug}`
                  }
                  color="primary"
                  icon="arrow-right"
                  size="lg"
                >
                  {language === `en` ? `View post` : `Ver publicación`}
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-8 mt-8 w-full max-w-[1400px]">
          {filteredPosts.map((post) => (
            <div
              className="border-[0.5px] border-slate-200 shadow shadow-slate-300/50 rounded-2xl bg-white/50 backdrop-blur-xl"
              key={post.id}
            >
              <div className="px-12 py-8">
                <h3 className="text-2xl font-bold">{post.title}</h3>
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
                    <button
                      className="rounded-full border border-slate-300 px-4 py-0.5 flex items-center bg-slate-50/50 w-fit mt-2 transition-colors hover:bg-slate-100 duration-100"
                      onClick={() => setSeriesFilter(post.series)}
                    >
                      <i className="fa-solid fa-list text-slate-500 text-xs mr-3" />
                      <span className="text-slate-500">
                        {(series.find((s) => s.id === post.series) || {})[language]
                          ?.title || ``}
                      </span>
                    </button>
                  )}
                </div>
                <Button
                  type="link"
                  to={
                    language === `en`
                      ? `/posts/${post.slug}`
                      : `/publicaciones/${post.slug}`
                  }
                  color="secondary"
                  icon="arrow-right"
                  size="md"
                >
                  {language === `en` ? `View post` : `Ver publicación`}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Posts;
