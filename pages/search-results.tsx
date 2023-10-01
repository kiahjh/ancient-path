import { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Lang, Post, Series } from '../lib/types';
import PostsList from '../components/PostsList';

const Posts: React.FC = () => {
  const language = `en`;
  const content = {
    en: {
      page: '/posts',
      metaDescription: 'Spiritual writings',
      redirectTo: `/search-results`, // TODO
      title: `Posts | The Ancient Path`,
    },
    es: {
      page: '/publicaciones',
      metaDescription: 'Escrituras espirituales',
      redirectTo: `/search-results`,
      title: `Publicaciones | La Senda Antigua`,
    },
  };
  const [posts, setPosts] = useState<Post<Lang>[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const c = content[language];
  const [searchQuery, setSearchQuery] = useState(``);
  const [seriesFilter, setSeriesFilter] = useState<null | string>(null);
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramsString = location.search;
    const searchParams = new URLSearchParams(paramsString);
    setQueryParams(searchParams);
    const query = searchParams.get('q');
    const series = searchParams.get('series');
    if (query) setSearchQuery(query);
    if (series) setSeriesFilter(series);
    fetch(
      `/api/getFilteredPosts?${query ? `q=${query}` : ``}${query && series ? `&` : ``}${
        series ? `series=${series}` : ``
      }&lang=${language}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.filteredPosts)) setPosts(data.filteredPosts);
        if (Array.isArray(data.allSeries)) setSeries(data.allSeries);
        setLoading(false);
      });
  }, [language]);

  return (
    <PageWrapper
      page={c.page}
      withChrome
      language={language}
      redirectTo={c.redirectTo}
      title={c.title}
      metaDescription={c.metaDescription}
    >
      <PostsList
        series={series}
        language={language}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        seriesFilter={seriesFilter}
        queryParams={queryParams}
        loading={loading}
        posts={posts}
      />
    </PageWrapper>
  );
};

export default Posts;
