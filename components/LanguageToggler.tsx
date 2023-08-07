import React from 'react';
import cx from 'classnames';
import { Lang } from '../lib/types';

interface Props {
  language: Lang;
  toggleLanguage(): unknown;
  className?: string;
}

const LanguageToggler: React.FC<Props> = ({ language, toggleLanguage, className }) => {
  return (
    <button
      className={cx(
        'flex justify-center items-center gap-1 bg-slate-100 dark:bg-black dark:bg-opacity-20 shadow-inner rounded-2xl outline-none focus:outline focus:outline-sky-500 dark:focus:outline-sky-700 p-1.5 transition duration-200',
        className,
      )}
      onClick={toggleLanguage}
    >
      <span
        className={cx(
          'py-1.5 px-4 text-slate-500 dark:text-slate-500',
          language === 'en' &&
            'bg-white dark:bg-slate-800/50 rounded-xl !text-sky-500 dark:text-sky-500 font-medium shadow transition duration-150 backdrop-blur-lg',
        )}
      >
        English
      </span>
      <span
        className={cx(
          'py-1.5 px-4 text-slate-500 dark:text-slate-500',
          language === 'es' &&
            'bg-white dark:bg-slate-800/50 rounded-xl !text-sky-500 dark:text-sky-500 font-medium shadow transition duration-150 backdrop-blur-lg',
        )}
      >
        Español
      </span>
    </button>
  );
};

export default LanguageToggler;
