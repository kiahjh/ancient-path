import React from 'react';
import cx from 'classnames';
import NavLink from './NavLink';
import { Lang } from '../lib/types';

interface Props {
  page: string;
  className?: string;
  language: Lang;
}

const FloatingNav: React.FC<Props> = ({ page, className, language }) => {
  return (
    <div className="hidden md-lg:block">
      <nav
        className={cx(
          `border-[0.5px] border-slate-200 dark:border-slate-700/50 shadow shadow-slate-300/50 rounded-full py-1 px-8 bg-white/70 relative z-20 flex flex-wrap justify-center dark:bg-slate-800/50 backdrop-blur-xl`,
          className,
        )}
      >
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
      </nav>
    </div>
  );
};

export default FloatingNav;
