import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import ProfilePic from '../public/profile.jpg';
import FloatingNav from './FloatingNav';
import Footer from './Footer';
import Link from 'next/link';
import LanguageToggler from './LanguageToggler';
import { Lang } from '../lib/types';
import { LanguageContext } from '../lib/LanguageContext';

interface Props {
  page: string;
  smallFooter?: boolean;
  children: React.ReactNode;
}

const Chrome: React.FC<Props> = ({ page, smallFooter, children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [language, setLanguage] = useState<Lang | null>(null);

  useEffect(() => {
    const detectedLang = localStorage.getItem('language');
    if (!detectedLang || (detectedLang !== 'en' && detectedLang !== 'es')) {
      if (window.navigator.language.startsWith('es')) {
        localStorage.setItem('language', 'es');
        setLanguage('es');
      } else {
        localStorage.setItem('language', 'en');
        setLanguage('en');
      }
    } else {
      localStorage.setItem('language', detectedLang);
      setLanguage(detectedLang);
    }
  }, []);

  if (!language) {
    return (
      <div className="h-screen flex justify-center items-center font-inter text-3xl text-gray-500 animate-pulse">
        loading...
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={language}>
      <div className="flex flex-col min-h-screen relative">
        <div
          className={cx(
            'z-40 bg-black left-0 top-0 w-screen h-screen md-lg:hidden bg-opacity-70 fixed',
            navOpen ? 'block' : 'hidden',
          )}
          onClick={() => setNavOpen(false)}
        />
        <nav
          className={cx(
            'fixed md-lg:hidden h-screen w-72 bg-white shadow-xl z-50 left-0 top-0 [transition:150ms] rounded-r-xl overflow-hidden',
            navOpen ? 'ml-0' : '-ml-80',
          )}
        >
          <button
            className="absolute top-0 right-0 p-4 text-gray-300 hover:text-gray-400 transition duration-100"
            onClick={() => setNavOpen(false)}
          >
            <i className="fa-solid fa-times text-2xl" />
          </button>
          <div className="p-6 mt-10 flex flex-col space-y-4">
            {language === 'en' ? (
              <>
                <SidebarNavLink to="/">Home</SidebarNavLink>
                <SidebarNavLink to="/posts">Posts</SidebarNavLink>
                <SidebarNavLink to="/en-podcast">Podcast</SidebarNavLink>
                <SidebarNavLink to="/about">About</SidebarNavLink>
                <SidebarNavLink to="/contact">Contact me</SidebarNavLink>
              </>
            ) : (
              <>
                <SidebarNavLink to="/">Home</SidebarNavLink>
                <SidebarNavLink to="/publicaciones">Publicaciones</SidebarNavLink>
                <SidebarNavLink to="/es-podcast">Podcast</SidebarNavLink>
                <SidebarNavLink to="/acerca-de-mi">Acerca de mí</SidebarNavLink>
                <SidebarNavLink to="/contacto">Contacto</SidebarNavLink>
              </>
            )}
          </div>
          <div className="flex justify-center items-center mt-8">
            <LanguageToggler language={language} setLanguage={setLanguage} page={page} />
          </div>
          <div className="w-96 h-96 bg-sky-300 rounded-2xl absolute right-8 -bottom-72 rotate-45 bg-opacity-30"></div>
          <div className="w-96 h-96 bg-sky-500 rounded-2xl absolute -right-28 -bottom-96 rotate-45 bg-opacity-30"></div>
        </nav>
        <header className="flex flex-row-reverse md-lg:flex-row justify-between items-center py-5 px-5 sm:px-10 top-0 bg-white bg-opacity-20">
          <div className="lg:w-[182px]">
            <Image
              src={ProfilePic.src}
              alt="photo of Jason Henderson"
              width={70}
              height={70}
              className="w-12 h-12 rounded-full shadow-lg"
            />
          </div>
          <button
            className="md-lg:hidden border-[0.5px] w-12 h-12 rounded-full shadow-lg flex justify-center items-center transition duration-100 hover:bg-sky-50 text-gray-400 hover:text-gray-500 text-lg"
            onClick={() => setNavOpen(true)}
          >
            <i className="fa-solid fa-bars" />
          </button>
          <FloatingNav page={page} language={language} />
          <LanguageToggler
            className="hidden md-lg:flex w-[182px]"
            language={language}
            setLanguage={setLanguage}
            page={page}
          />
        </header>
        <section className="flex-grow flex flex-col">{children}</section>
        <Footer page={page} small={smallFooter} language={language} />
      </div>
    </LanguageContext.Provider>
  );
};

export default Chrome;

interface SidebarNavLinkProps {
  to: string;
  children: React.ReactNode;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ to, children }) => {
  return (
    <Link
      href={to}
      className="text-lg font-medium border-b-2 border-gray-100 hover:border-sky-200 p-2 text-gray-500 hover:text-gray-600 transition duration-100"
    >
      {children}
    </Link>
  );
};
