import React from 'react';
import { Lang } from '../lib/types';

interface Props {
  language: Lang;
}

const HeroBlock: React.FC<Props> = ({ language }) => {
  return (
    <section className="p-6 xs:p-12 md:p-16 lg:p-20 relative overflow-hidden dark:bg-slate-900">
      <div className="w-96 h-96 bg-sky-300 dark:bg-sky-400 rounded-2xl absolute right-56 -bottom-52 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50"></div>
      <div className="w-96 h-96 bg-sky-500 rounded-2xl absolute right-20 -bottom-72 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50"></div>
      <h1 className="text-3xl xs:text-4xl dark:text-white md:text-6xl font-inter relative">
        {language === 'en' ? 'The Ancient Path' : 'La Senda Antigua'}
      </h1>
      <p className="mt-6 text-slate-500 dark:text-slate-500 max-w-4xl xs:text-lg relative">
        {language === 'en' ? (
          <span>
            Stand by the ways and see and ask for the ancient paths, where the good way
            is, and walk in it; and you will find rest for your souls. But they said, "We
            will not walk in it." -{' '}
            <span className="font-medium text-slate-600 dark:text-slate-400">
              Jeremiah 6:16
            </span>
          </span>
        ) : (
          <span>
            Párense en los caminos y miren, y pregunten por los senderos antiguos, cuál es
            el buen camino, y anden por él; y hallarán descanso para sus almas. Pero
            dijeron: "No andaremos en él" -{' '}
            <span className="font-medium text-black dark:text-slate-400 text-opacity-60">
              Jeremías 6:16
            </span>
          </span>
        )}
      </p>
      <div className="mt-12 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 relative">
        <a
          className="flex justify-center items-center bg-sky-400 dark:bg-sky-800 text-white rounded-lg shadow-md py-3 px-5 font-medium text-lg hover:bg-sky-500 dark:hover:bg-sky-900 transition duration-100 cursor-pointer select-none"
          href={language === 'en' ? '/posts/page/1' : '/publicaciones/pagina/1'}
        >
          <i className="fa-solid fa-arrow-right mr-3"></i>
          {language === 'en' ? 'View all posts' : 'Ver publicaciones'}
        </a>
        <a
          className="flex justify-center items-center bg-white dark:bg-slate-800 text-sky-500 dark:text-slate-400 border-[0.5px] dark:border-slate-700 rounded-lg shadow-md py-3 px-5 font-medium text-lg hover:bg-sky-50 dark:hover:bg-opacity-70 transition duration-100 cursor-pointer select-none"
          href={language === 'en' ? '/en-podcast' : '/es-podcast'}
        >
          <i className="fa-solid fa-podcast mr-3"></i>
          {language === 'en' ? 'Listen to podcast' : 'Escuchar el podcast'}
        </a>
      </div>
    </section>
  );
};

export default HeroBlock;
