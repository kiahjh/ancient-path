import React from 'react';
import { Lang } from '../lib/types';
import FloatingNav from './FloatingNav';
import NavLink from './NavLink';

interface Props {
  page: string;
  small?: boolean;
  language: Lang;
}

const Footer: React.FC<Props> = ({ page, small, language }) => {
  if (small) {
    return (
      <footer className="flex justify-center items-center space-x-6 sm:space-x-10 p-6 flex-wrap dark:bg-slate-900">
        {language === 'en' ? (
          <>
            <NavLink to="/" selected={page === '/'}>
              Home
            </NavLink>
            <NavLink to="/posts/page/1" selected={page === '/posts'}>
              Posts
            </NavLink>
            <NavLink to="/en-podcast" selected={page === '/en-podcast'}>
              Podcast
            </NavLink>
            <NavLink to="/about" selected={page === '/about'}>
              About me
            </NavLink>
            <NavLink to="/contact" selected={page === '/contact'}>
              Contact
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" selected={page === '/'}>
              Inicio
            </NavLink>
            <NavLink to="/publicaciones/pagina/1" selected={page === '/publicaciones'}>
              Publicaciones
            </NavLink>
            <NavLink to="/es-podcast" selected={page === '/es-podcast'}>
              Podcast
            </NavLink>
            <NavLink to="/acerca-de-mi" selected={page === '/acerca-de-mi'}>
              Acerca de mi
            </NavLink>
            <NavLink to="/contacto" selected={page === '/contacto'}>
              Contacto
            </NavLink>
          </>
        )}
      </footer>
    );
  }
  return (
    <section className="relative overflow-hidden">
      <section className="bg-white dark:bg-slate-900 h-80 flex justify-center items-center relative p-8">
        <p className="max-w-3xl text-center text-xl sm:text-2xl font-light text-slate-700 dark:text-slate-400 p-8 sm:p-16 rounded-3xl bg-white/10 dark:bg-slate-900/10 backdrop-blur-3xl border-[0.5px] border-sky-200 dark:border-sky-950 relative z-10 shadow shadow-slate-300/50 dark:shadow-black/50">
          {language === 'en' ? (
            <div className="flex flex-col items-center gap-2">
              <span>
                While you have the light, believe in the light, that you may become sons
                of light.
              </span>
              <span className="font-medium text-sky-400 dark:text-slate-200">
                John 12:26
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span>
                Entre tanto que tenéis la luz, creed en la luz, para que seáis hijos de
                luz.
              </span>
              <span className="font-medium text-sky-400 dark:text-slate-200">
                Juan 12:26
              </span>
            </div>
          )}
        </p>
      </section>
      <footer className="px-10 py-6 flex justify-center items-center relative dark:bg-slate-900">
        <div className="w-96 h-96 bg-sky-300 dark:bg-sky-400 rounded-2xl absolute left-56 -bottom-52 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50" />
        <div className="w-96 h-96 bg-sky-500 rounded-2xl absolute left-20 -bottom-72 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50" />
        <FloatingNav page={page} language={language} />
      </footer>
    </section>
  );
};

export default Footer;
