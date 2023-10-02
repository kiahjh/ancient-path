import React from 'react';
import { Lang } from '../lib/types';
import Button from './Button';

interface Props {
  language: Lang;
}

const HeroBlock: React.FC<Props> = ({ language }) => {
  return (
    <section className="p-6 xs:py-12 md:py-16 lg:py-28 xs:px-12 md:px-16 lg:px-20 relative dark:bg-slate-900">
      <div className="w-96 h-96 bg-sky-300 dark:bg-sky-400 rounded-3xl absolute right-56 -bottom-52 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50"></div>
      <div className="w-72 h-72 bg-sky-500 rounded-3xl absolute right-28 -bottom-44 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50"></div>
      <h1 className="text-3xl xs:text-4xl dark:text-white md:text-6xl font-inter relative">
        {language === 'en' ? 'The Ancient Path' : 'La Senda Antigua'}
      </h1>
      <p className="mt-6 text-slate-400 dark:text-slate-500 max-w-4xl xs:text-xl relative">
        {language === 'en' ? (
          <span>
            Stand by the ways and see and ask for the ancient paths, where the good way
            is, and walk in it; and you will find rest for your souls. But they said,
            &quot;We will not walk in it.&quot; -{' '}
            <span className="font-medium text-slate-600 dark:text-slate-400">
              Jeremiah 6:16
            </span>
          </span>
        ) : (
          <span>
            Párense en los caminos y miren, y pregunten por los senderos antiguos, cuál es
            el buen camino, y anden por él; y hallarán descanso para sus almas. Pero
            dijeron: &quot;No andaremos en él&quot; -{' '}
            <span className="font-medium text-black dark:text-slate-400 text-opacity-60">
              Jeremías 6:16
            </span>
          </span>
        )}
      </p>
      <div className="mt-12 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 relative">
        <Button
          type="link"
          to={language === 'en' ? '/posts/page/1' : '/publicaciones/pagina/1'}
          color="primary"
          icon="arrow-right"
          shadow
          size="lg"
        >
          {language === 'en' ? 'View all posts' : 'Ver publicaciones'}
        </Button>
        <Button
          type="link"
          to={language === 'en' ? '/en-podcast' : '/es-podcast'}
          color="secondary"
          icon="podcast"
          shadow
          size="lg"
        >
          {language === 'en' ? 'Listen to podcast' : 'Escuchar el podcast'}
        </Button>
      </div>
    </section>
  );
};

export default HeroBlock;
