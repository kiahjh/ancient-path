import React, { useContext } from 'react';
import cx from 'classnames';
import { LanguageContext } from '../lib/LanguageContext';
import Link from 'next/link';
import { Lang } from '../lib/types';

interface Props {
  page: number;
  numPages: number;
}

const Paginator: React.FC<Props> = ({ page, numPages }) => {
  const language = useContext(LanguageContext);
  return (
    <div className="bg-white dark:bg-slate-800 border-[0.5px] dark:border-slate-700 rounded-xl md:rounded-2xl shadow shadow-slate-300/50 dark:shadow-black/50 mx-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-x-4">
        <PageTurner
          mode="prev"
          size="large"
          currentPage={page}
          numPages={numPages}
          language={language}
        />
        <div className="flex gap-4 justify-center p-2 md:p-0 md:px-4 flex-wrap">
          {new Array(numPages).fill(0).map((_, index) => (
            <Link
              className={cx(
                'w-10 h-10 rounded-full font-medium transition duration-100 flex justify-center items-center cursor-pointer select-none',
                index + 1 === page
                  ? 'text-sky-500 bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20'
                  : 'text-slate-300 dark:text-slate-500 dark:hover:bg-slate-700/50 hover:bg-slate-50 hover:text-slate-400 dark:hover:text-slate-400',
              )}
              href={
                language === 'en'
                  ? `/posts/page/${index + 1}`
                  : `/publicaciones/pagina/${index + 1}`
              }
              key={index}
            >
              {index + 1}
            </Link>
          ))}
        </div>
        <PageTurner
          mode="next"
          size="large"
          currentPage={page}
          numPages={numPages}
          language={language}
        />
      </div>
      <div className="md:hidden flex justify-between p-2 md:p-0 bg-slate-50 dark:bg-slate-700/20 rounded-b-xl">
        <PageTurner
          mode="prev"
          size="small"
          currentPage={page}
          numPages={numPages}
          language={language}
        />
        <PageTurner
          mode="next"
          size="small"
          currentPage={page}
          numPages={numPages}
          language={language}
        />
      </div>
    </div>
  );
};

export default Paginator;

interface PageTurnerProps {
  currentPage: number;
  numPages: number;
  mode: 'next' | 'prev';
  size: 'large' | 'small';
  language: Lang;
  className?: string;
}

const PageTurner: React.FC<PageTurnerProps> = ({
  mode,
  numPages,
  currentPage,
  size,
  language,
  className,
}) => {
  const bigStyles = cx(
    'transition duration-100 dark:border-slate-700 font-bold hidden md:flex px-4 py-4 w-16 lg:w-32 items-center justify-center select-none',
    mode === `prev` ? 'border-r rounded-l-2xl' : 'border-l rounded-r-2xl',
    (mode === 'prev' ? currentPage === 1 : currentPage === numPages)
      ? 'bg-slate-50 dark:bg-gray-900/30 text-slate-400 dark:text-slate-500 cursor-not-allowed'
      : 'bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700/50 text-sky-500 dark:text-sky-400',
    className,
  );
  const smallStyles = cx(
    'text-lg rounded-full flex justify-center items-center w-12 h-12 transition duration-100 select-none',
    (mode === 'prev' ? currentPage === 1 : currentPage === numPages)
      ? 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-500 cursor-not-allowed'
      : 'bg-sky-100 dark:bg-sky-600 text-sky-500 dark:text-sky-200 hover:bg-sky-600 dark:hover:bg-sky-600',
    className,
  );

  if (mode === 'next') {
    return currentPage < numPages ? (
      <Link
        href={
          language === 'en'
            ? `/posts/page/${currentPage + 1}`
            : `/publicaciones/pagina/${currentPage + 1}`
        }
        className={cx(size === 'large' ? bigStyles : smallStyles)}
      >
        {size === 'large' ? (
          <>
            <span className="hidden lg:block">
              {language === 'en' ? 'Next' : 'Siguiente'}
            </span>
            <i className="fa-solid fa-arrow-right lg:ml-3" />
          </>
        ) : (
          <i className="fa-solid fa-chevron-right" />
        )}
      </Link>
    ) : (
      <button className={cx(size === 'large' ? bigStyles : smallStyles)}>
        {size === 'large' ? (
          <>
            <span className="hidden lg:block">
              {language === 'en' ? 'Next' : 'Siguiente'}
            </span>
            <i className="fa-solid fa-arrow-right lg:ml-3" />
          </>
        ) : (
          <i className="fa-solid fa-chevron-right" />
        )}
      </button>
    );
  } else {
    return currentPage > 1 ? (
      <Link
        href={
          language === 'en'
            ? `/posts/page/${currentPage - 1}`
            : `/publicaciones/pagina/${currentPage - 1}`
        }
        className={cx(size === 'large' ? bigStyles : smallStyles)}
      >
        {size === 'large' ? (
          <>
            <i className="fa-solid fa-arrow-left lg:mr-3" />
            <span className="hidden lg:block">
              {language === 'en' ? 'Previous' : 'Anterior'}
            </span>
          </>
        ) : (
          <i className="fa-solid fa-chevron-left" />
        )}
      </Link>
    ) : (
      <button className={cx(size === 'large' ? bigStyles : smallStyles)}>
        {size === 'large' ? (
          <>
            <i className="fa-solid fa-arrow-left lg:mr-3" />
            <span className="hidden lg:block">
              {language === 'en' ? 'Previous' : 'Anterior'}
            </span>
          </>
        ) : (
          <i className="fa-solid fa-chevron-left" />
        )}
      </button>
    );
  }
};
