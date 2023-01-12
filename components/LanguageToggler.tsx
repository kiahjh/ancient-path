import React from 'react';
import cx from 'classnames';
import { Lang } from '../lib/types';
import { useRouter } from 'next/router';

interface Props {
  language: Lang;
  setLanguage(l: Lang): unknown;
  page: string;
  className?: string;
}

const LanguageToggler: React.FC<Props> = ({ language, setLanguage, className, page }) => {
  const router = useRouter();
  return (
    <button
      className={cx(
        'flex justify-center items-center space-x-1 bg-gray-100 shadow-inner rounded-xl',
        className,
      )}
      onClick={() => {
        if (language === 'en') {
          setLanguage('es');
          localStorage.setItem('language', 'es');
        } else {
          setLanguage('en');
          localStorage.setItem('language', 'en');
        }
        switch (page) {
          case '/posts':
            router.push('/publicaciones');
            break;
          case '/publicaciones':
            router.push('/posts');
            break;
          case '/contact':
            router.push('/contacto');
            break;
          case '/contacto':
            router.push('/contact');
            break;
          case '/about':
            router.push('/acerca-de-mi');
            break;
          case '/acerca-de-mi':
            router.push('/about');
            break;
          case '/en-podcast':
            router.push('/es-podcast');
            break;
          case '/es-podcast':
            router.push('/en-podcast');
            break;
        }
      }}
    >
      <span
        className={cx(
          'py-2 px-4 text-gray-500',
          language === 'en' &&
            'bg-white rounded-xl border text-sky-500 font-medium transition duration-150',
        )}
      >
        English
      </span>
      <span
        className={cx(
          'py-2 px-4 text-gray-500',
          language === 'es' &&
            'bg-white rounded-xl border text-sky-500 font-medium transition duration-150',
        )}
      >
        Español
      </span>
    </button>
  );
};

export default LanguageToggler;
