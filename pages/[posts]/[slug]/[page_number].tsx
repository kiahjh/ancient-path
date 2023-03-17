import fs from 'node:fs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { DualPost, Post } from '../../../lib/types';
import PostPreview from '../../../components/PostPreview';
import { getAllPosts } from '../../../lib/getAllPosts';
import { podcastXml } from '../../../lib/podcast';
import PageWrapper from '../../../components/PageWrapper';
import Paginator from '../../../components/Paginator';
import { paginate } from '../../../lib/helpers';

export const getStaticProps: GetStaticProps = async (context) => {
  const dualPosts = await getAllPosts();
  const whichLanguage = context.params?.slug === 'page' ? 'en' : 'es';
  const posts = dualPosts.map((post) => ({
    ...post[whichLanguage],
    category: post.category,
  }));
  const whichPage = Number(context.params?.page_number);
  const thisPagePosts = paginate(posts, whichPage, 8);

  return {
    props: {
      posts: thisPagePosts,
      pageCount: Math.ceil(posts.length / 8),
      pageNum: whichPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allDualPosts = await getAllPosts();

  const enPosts = allDualPosts.map((dual) => dual.en);
  const esPosts = allDualPosts.map((dual) => dual.es);
  fs.writeFileSync(`./public/podcast.en.rss`, podcastXml(enPosts));
  fs.writeFileSync(`./public/podcast.es.rss`, podcastXml(esPosts));

  const numberOfPages = Math.ceil(allDualPosts.length / 8);
  const pages = new Array(numberOfPages).fill(0).map((_, index) => index + 1);

  const paths = pages
    .map((page) => ({
      params: { posts: 'posts', slug: 'page', page_number: String(page) },
    }))
    .concat(
      pages.map((page) => ({
        params: {
          posts: 'publicaciones',
          slug: 'pagina',
          page_number: String(page),
        },
      })),
    );

  return { paths, fallback: false };
};

interface Props {
  posts: Array<Post<'en' | 'es'> & { category: 'teaching' | 'post' }>;
  pageNum: number;
  pageCount: number;
}

const Posts: React.FC<Props> = ({ posts, pageNum, pageCount }) => {
  const language = posts[0].lang;
  const content = {
    en: {
      page: '/posts',
      metaDescription: 'Spiritual writings',
      redirectTo: `/publicaciones/pagina/${pageNum}`,
      title: `Posts (page ${pageNum}) | The Ancient Path`,
      heading: 'Posts',
      subheading: `Page ${pageNum} of ${pageCount}`,
      paragraph: `The majority of these posts are my replies to emails, text messages, or other questions brought up in various settings. Any names or personal information have of course been removed.`,
    },
    es: {
      page: '/publicaciones',
      metaDescription: 'Escrituras espirituales',
      redirectTo: `/posts/page/${pageNum}`,
      title: `Publicaciones (pagina ${pageNum}) | La Senda Antigua`,
      heading: 'Publicaciones',
      subheading: `Página ${pageNum} de ${pageCount}`,
      paragraph: `La mayoría de estas publicaciones son respuestas a correos electrónicos, mensajes de texto u otras preguntas planteadas en diversos contextos. Por supuesto, se ha eliminado cualquier nombre o información personal.`,
    },
  };
  const c = content[language];

  return (
    <PageWrapper
      page={c.page}
      withChrome
      language={language}
      redirectTo={c.redirectTo}
      title={c.title}
      metaDescription={c.metaDescription}
    >
      <div className="p-8 md:p-16 dark:bg-slate-900">
        <h2 className="text-3xl xs:text-4xl font-inter dark:text-white">{c.heading}</h2>
        <h4 className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {c.subheading}
        </h4>
        <p className="mt-3 text-slate-500">{c.paragraph}</p>
      </div>
      {posts.length > 0 ? (
        <section className="sm:p-16 p-8 pt-12 sm:pt-4 space-y-14 md:space-y-8 relative bg-graph-paper dark:bg-slate-900 dark:[background-image:none]">
          {posts.map((post) => (
            <PostPreview category={post.category} post={post} key={post.id} />
          ))}
          <Paginator numPages={pageCount} page={pageNum} />
        </section>
      ) : (
        <div className="flex justify-center items-center mt-20 dark:bg-slate-900">
          <i className="fa-solid fa-spinner text-5xl text-sky-500 text-opacity-30 animate-spin" />
        </div>
      )}
    </PageWrapper>
  );
};

export default Posts;
