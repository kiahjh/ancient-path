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
        'flex justify-center items-center space-x-1 bg-slate-100 dark:bg-black dark:bg-opacity-20 shadow-inner rounded-xl outline-none focus:outline focus:outline-sky-500',
        className,
      )}
      onClick={toggleLanguage}
    >
      <span
        className={cx(
          'py-2 px-4 text-slate-500 dark:text-slate-500',
          language === 'en' &&
            'bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 text-sky-500/100 dark:text-sky-500 font-medium transition duration-150',
        )}
      >
        English
      </span>
      <span
        className={cx(
          'py-2 px-4 text-slate-500 dark:text-slate-500',
          language === 'es' &&
            'bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 text-sky-500/100 dark:text-sky-500 font-medium transition duration-150',
        )}
      >
        Español
      </span>
    </button>
  );
};

export default LanguageToggler;
