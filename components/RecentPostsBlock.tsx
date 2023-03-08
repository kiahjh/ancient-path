import React from 'react';
import Link from 'next/link';
import { DualPost, Lang } from '../lib/types';
import Advertisement from './Advertisement';
import HomePagePostPreview from './HomePagePostPreview';
import FriendsLibraryLogo from '../public/friends-library-logo.png';
import BibliotecaDeLosAmigosLogo from '../public/biblioteca-de-los-amigos-logo.png';
import GertrudeLogo from '../public/gertrude-logo.png';

interface Props {
  posts: DualPost[];
  language: Lang;
}

const RecentPostsBlock: React.FC<Props> = ({ posts, language }) => {
  return (
    <section className="bg-sky-500 dark:bg-sky-900 flex flex-col lg:flex-row pt-8 p-6 xs:p-8 md:p-12 lg:p-16">
      <div className="flex-grow flex flex-col">
        <h1 className="text-3xl sm:text-4xl text-white font-inter">
          {language === 'en' ? 'Recent posts' : 'Publicaciones recientes'}
        </h1>
        {posts.length > 0 ? (
          <div className="mt-6 sm:mt-8 space-y-6 flex flex-col">
            {posts.slice(0, 3).map((post) => (
              <HomePagePostPreview post={post} key={post.en.id} language={language} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20">
            <i className="fa-solid fa-spinner text-2xl text-white text-opacity-70 animate-spin" />
          </div>
        )}
        <div className="flex justify-center items-center mb-10 lg:-mb-4 mt-8 sm:mt-0">
          <Link
            className="flex items-center px-6 py-2 text-sky-500 bg-white dark:bg-sky-700 dark:hover:bg-sky-600 dark:text-white rounded-lg font-medium hover:text-sky-600 hover:bg-sky-50 cursor-pointer transition duration-100"
            href={language === 'en' ? '/posts/page/1' : '/publicaciones/pagina/1'}
          >
            <i className="fa-solid fa-list mr-2" />
            {language === 'en' ? 'See more' : 'Ver más'}
          </Link>
        </div>
      </div>
      <div className="shrink-0 flex flex-col border-white border-opacity-20 lg:ml-8 lg:p-8 pr-0 space-y-8 lg:max-w-md my-6 lg:mt-0">
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
      </div>
    </section>
  );
};

export default RecentPostsBlock;
