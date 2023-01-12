import React, { useContext } from 'react';
import { DualPost } from '../lib/types';
import Advertisement from './Advertisement';
import HomePagePostPreview from './HomePagePostPreview';
import FriendsLibraryLogo from '../public/friends-library-logo.png';
import BibliotecaDeLosAmigosLogo from '../public/biblioteca-de-los-amigos-logo.png';
import GertrudeLogo from '../public/gertrude-logo.png';
import { LanguageContext } from '../lib/LanguageContext';

interface Props {
  posts: DualPost[];
}

const RecentPostsBlock: React.FC<Props> = ({ posts }) => {
  const language = useContext(LanguageContext);
  return (
    <section className="bg-sky-500 flex flex-col lg:flex-row pt-8 p-6 xs:p-8 md:p-12 lg:p-16">
      <div className="flex-grow">
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
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptate quas, vel ad perferendis quis quibusdam nisi est mollitia ea tempora."
            url="https://friendslibrary.com"
          />
        ) : (
          <Advertisement
            img={BibliotecaDeLosAmigosLogo.src}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptate quas, vel ad perferendis quis quibusdam nisi est mollitia ea tempora."
            url="https://bibliotecadelosamigos.com"
          />
        )}
        <Advertisement
          img={GertrudeLogo.src}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptate quas, vel ad perferendis quis quibusdam nisi est mollitia ea tempora."
          url="https://gertrude.app"
        />
      </div>
    </section>
  );
};

export default RecentPostsBlock;
