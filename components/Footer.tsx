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
      <footer className="flex justify-center items-center space-x-6 sm:space-x-10 p-6 flex-wrap">
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
      </footer>
    );
  }
  return (
    <section className="relative overflow-hidden">
      <section className="bg-white h-80 flex justify-center items-center relative p-8">
        <i className="fa-solid fa-quote-left text-7xl text-gray-100 sm:text-gray-200 absolute left-8 top-8" />
        <i className="fa-solid fa-quote-right text-7xl text-gray-100 sm:text-gray-200 absolute bottom-8 right-8" />
        <p className="max-w-2xl text-center text-xl sm:text-2xl font-extralight relative z-10 text-gray-700">
          {language === 'en' ? (
            <span>
              While you have the light, believe in the light, that you may become sons of
              light. <span className="font-medium text-gray-600">- John 12:26</span>
            </span>
          ) : (
            <span>
              Entre tanto que tenéis la luz, creed en la luz, para que seáis hijos de luz.{' '}
              <span className="font-medium text-gray-600">- Juan 12:26</span>
            </span>
          )}
        </p>
      </section>
      <footer className="px-10 py-6 flex justify-center items-center relative">
        <div className="w-96 h-96 bg-sky-300 rounded-2xl absolute left-56 -bottom-52 rotate-45 bg-opacity-20 sm:bg-opacity-50" />
        <div className="w-96 h-96 bg-sky-500 rounded-2xl absolute left-20 -bottom-72 rotate-45 bg-opacity-20 sm:bg-opacity-50" />
        <FloatingNav page={page} language={language} />
      </footer>
    </section>
  );
};

export default Footer;
