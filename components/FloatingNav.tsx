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
          `border-[0.5px] shadow-lg rounded-full py-1 px-8 bg-white relative z-20 flex flex-wrap justify-center`,
          className,
        )}
      >
        {language === 'en' ? (
          <>
            <NavLink to="/" selected={page === '/'}>
              Home
            </NavLink>
            <NavLink to="/posts" selected={page === '/posts'}>
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
              Home
            </NavLink>
            <NavLink to="/publicaciones" selected={page === '/publicaciones'}>
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
