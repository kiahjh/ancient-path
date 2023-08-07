import React from 'react';
import Link from 'next/link';
import { Lang, Post } from '../lib/types';
import Advertisement from './Advertisement';
import HomePagePostPreview from './HomePagePostPreview';
import FriendsLibraryLogo from '../public/friends-library-logo.png';
import BibliotecaDeLosAmigosLogo from '../public/biblioteca-de-los-amigos-logo.png';
import GertrudeLogo from '../public/gertrude-logo.png';

interface Props {
  posts: Array<
    Pick<Post<Lang>, 'title' | 'description' | 'slug' | 'createdAt' | 'category'>
  >;
  language: Lang;
}

const RecentPostsBlock: React.FC<Props> = ({ posts, language }) => {
  return (
    <section className="bg-gradient-to-b from-sky-500 via-sky-500 to-sky-500 dark:from-sky-950 dark:via-sky-950 dark:to-sky-950/30 relative flex flex-col lg:flex-row pt-8 p-6 xs:p-8 md:p-12 lg:p-16">
      <div className="flex-grow flex flex-col">
        <h1 className="text-3xl sm:text-4xl text-white font-inter">
          {language === 'en' ? 'Recent posts' : 'Publicaciones recientes'}
        </h1>
        {posts.length > 0 ? (
          <div className="mt-6 sm:mt-8 gap-2 flex flex-col mb-6">
            {posts.slice(0, 3).map((post) => (
              <HomePagePostPreview post={post} key={post.slug} language={language} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20">
            <i className="fa-solid fa-spinner text-2xl text-white text-opacity-70 animate-spin" />
          </div>
        )}
        <div className="flex justify-center">
          <a
            className="flex justify-center items-center bg-sky-50 dark:bg-sky-900 text-sky-600 dark:text-sky-300 rounded-lg shadow-lg shadow-sky-500/30 dark:shadow-black/10 py-2 px-4 font-medium hover:bg-sky-200 dark:hover:bg-sky-900/60 transition duration-100 cursor-pointer select-none"
            href={language === 'en' ? '/posts/page/1' : '/publicaciones/pagina/1'}
          >
            <i className="fa-solid fa-arrow-right mr-3"></i>
            {language === 'en' ? 'View all posts' : 'Ver publicaciones'}
          </a>
        </div>
      </div>
      <aside className="shrink-0 flex flex-col border-white border-opacity-20 lg:ml-8 lg:p-8 pr-0 space-y-8 lg:max-w-md mt-6 lg:mt-0">
        <h2 className="text-2xl font-bold text-white mb-2 sm:mb-4">
          {language === 'en'
            ? 'Some sites and services I recommend:'
            : 'Algunos sitios y servicios que recomiendo'}
        </h2>
        {language === 'en' ? (
          <Advertisement
            img={FriendsLibraryLogo.src}
            description="In my opinion, there is no other collection of Christian writings that more accurately communicates or more powerfully illustrates the soul-transforming power of the gospel of Jesus Christ."
            url="https://friendslibrary.com"
          />
        ) : (
          <Advertisement
            img={BibliotecaDeLosAmigosLogo.src}
            description="En mi opinión, no existe otra colección de escritos cristianos que comunique con mayor precisión o ilustre con  más pureza, el poder del evangelio de Jesucristo que transforma el alma."
            url="https://bibliotecadelosamigos.com"
          />
        )}
        <Advertisement
          img={GertrudeLogo.src}
          description={
            language === 'en'
              ? 'By far, the best internet protection software I’ve seen for parents who are genuinely concerned about their children’s online activity. Currently only available for Mac computers.'
              : 'Sin duda, la mejor aplicación de control parental que he visto para padres realmente preocupados por la seguridad de sus hijos en internet. Actualmente sólo disponible para computadoras Mac.'
          }
          url="https://gertrude.app"
        />
      </aside>
    </section>
  );
};

export default RecentPostsBlock;
