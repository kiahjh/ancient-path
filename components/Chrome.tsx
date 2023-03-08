import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { setCookie } from 'cookies-next';
import FloatingNav from './FloatingNav';
import Footer from './Footer';
import Link from 'next/link';
import LanguageToggler from './LanguageToggler';
import { Lang, Theme } from '../lib/types';
import ThemeSwitcher from './ThemeSwitcher';

interface Props {
  page: string;
  smallFooter?: boolean;
  language: Lang;
  setLanguage: (l: Lang) => unknown;
  theme: Theme;
  setTheme: (t: Theme) => unknown;
  children: React.ReactNode;
  redirectTo: string;
}

const Chrome: React.FC<Props> = ({
  page,
  smallFooter,
  children,
  language,
  setLanguage,
  theme,
  setTheme,
  redirectTo,
}) => {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  if (!language) {
    return (
      <div className="h-screen flex justify-center items-center font-inter text-3xl text-slate-500 animate-pulse">
        loading...
      </div>
    );
  }

  function toggleLanguage(): void {
    if (language === 'en') {
      setLanguage('es');
      setCookie('languageOverride', 'es', {
        maxAge: 60 * 60 * 24 * 365, // one year
      });
    } else {
      setLanguage('en');
      setCookie('languageOverride', 'en', {
        maxAge: 60 * 60 * 24 * 365, // one year
      });
    }
    router.push(redirectTo);
  }

  return (
    <div className="flex flex-col min-h-screen relative z-30">
      <div
        className={cx(
          'z-40 bg-black left-0 top-0 w-screen h-screen md-lg:hidden bg-opacity-70 fixed',
          navOpen ? 'block' : 'hidden',
        )}
        onClick={() => setNavOpen(false)}
      />
      <nav
        className={cx(
          'fixed md-lg:hidden h-screen w-72 bg-white dark:bg-slate-900 shadow-xl z-50 left-0 top-0 [transition:150ms] rounded-r-xl overflow-hidden',
          navOpen ? 'ml-0' : '-ml-80',
        )}
      >
        <button
          className="absolute top-0 right-0 p-4 text-slate-300 dark:text-slate-500 hover:text-slate-400 dark:hover:text-slate-400 transition duration-100"
          onClick={() => setNavOpen(false)}
        >
          <i className="fa-solid fa-times text-2xl" />
        </button>
        <div className="p-6 mt-10 flex flex-col space-y-4">
          {language === 'en' ? (
            <>
              <SidebarNavLink to="/">Home</SidebarNavLink>
              <SidebarNavLink to="/posts/page/1">Posts</SidebarNavLink>
              <SidebarNavLink to="/en-podcast">Podcast</SidebarNavLink>
              <SidebarNavLink to="/about">About</SidebarNavLink>
              <SidebarNavLink to="/contact">Contact me</SidebarNavLink>
            </>
          ) : (
            <>
              <SidebarNavLink to="/">Inicio</SidebarNavLink>
              <SidebarNavLink to="/publicaciones/pagina/1">Publicaciones</SidebarNavLink>
              <SidebarNavLink to="/es-podcast">Podcast</SidebarNavLink>
              <SidebarNavLink to="/acerca-de-mi">Acerca de mí</SidebarNavLink>
              <SidebarNavLink to="/contacto">Contacto</SidebarNavLink>
            </>
          )}
        </div>
        <div className="flex justify-center items-center mt-8">
          <LanguageToggler
            language={language}
            toggleLanguage={toggleLanguage}
            page={page}
          />
        </div>
        <div className="w-96 h-96 bg-sky-300 dark:bg-sky-400 rounded-2xl absolute right-8 -bottom-72 rotate-45 bg-opacity-30 dark:bg-opacity-20"></div>
        <div className="w-96 h-96 bg-sky-500 rounded-2xl absolute -right-28 -bottom-96 rotate-45 bg-opacity-30 dark:bg-opacity-20"></div>
      </nav>
      <header className="flex flex-row-reverse md-lg:flex-row justify-between items-center py-5 px-5 sm:px-10 top-0 bg-white bg-opacity-20 dark:bg-slate-900 z-20">
        <div className="lg:w-[182px]">
          <ThemeSwitcher theme={theme} setTheme={setTheme} language={language} />
        </div>
        <button
          className="md-lg:hidden border-[0.5px] w-12 h-12 rounded-full shadow-lg flex justify-center items-center transition duration-100 hover:bg-sky-50 text-slate-400 hover:text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-300 text-lg"
          onClick={() => setNavOpen(true)}
        >
          <i className="fa-solid fa-bars" />
        </button>
        <FloatingNav page={page} language={language} />
        <LanguageToggler
          className="hidden md-lg:flex w-[182px]"
          language={language}
          toggleLanguage={toggleLanguage}
          page={page}
        />
      </header>
      <section className="flex-grow flex flex-col dark:bg-slate-900 z-0">
        {children}
      </section>
      <Footer page={page} small={smallFooter} language={language} />
    </div>
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
      className="text-lg font-medium border-b-2 border-slate-100 dark:border-slate-800/50 hover:border-sky-200 dark:hover:border-slate-800 p-2 text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition duration-100"
    >
      {children}
    </Link>
  );
};
