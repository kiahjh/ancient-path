import React, { useContext } from 'react';
import cx from 'classnames';
import { LanguageContext } from '../lib/LanguageContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Lang } from '../lib/types';

interface Props {
  page: number;
  numPages: number;
}

const Paginator: React.FC<Props> = ({ page, numPages }) => {
  const language = useContext(LanguageContext);
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-slate-800 border-[0.5px] dark:border-slate-700 rounded-xl md:rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-x-4">
        <PageTurner
          mode="prev"
          size="large"
          currentPage={page}
          numPages={numPages}
          language={language}
        />
        <div className="flex space-x-4 justify-center p-2 md:p-0">
          {new Array(numPages).fill(0).map((_, index) => (
            <Link
              className={cx(
                'border dark:border-slate-700 w-10 h-10 rounded-full font-medium hover:bg-slate-50 transition duration-100 flex justify-center items-center cursor-pointer select-none',
                index + 1 === page
                  ? 'text-sky-500 border-sky-200 bg-sky-50 dark:bg-slate-700'
                  : 'text-slate-400 dark:text-slate-500 dark:hover:bg-slate-700/50',
              )}
              href={
                language === 'en'
                  ? `/posts/page/${index + 1}`
                  : `/publicaciones/pagina/${index + 1}`
              }
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
    mode === `prev` ? 'border-r rounded-l-lg' : 'border-l rounded-r-lg',
    (mode === 'prev' ? currentPage === 1 : currentPage === numPages)
      ? 'bg-slate-50 dark:bg-gray-900/30 text-slate-400 dark:text-slate-500 cursor-not-allowed'
      : 'bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-sky-500 dark:text-sky-400',
    className,
  );
  const smallStyles = cx(
    'text-lg rounded-full flex justify-center items-center w-12 h-12 transition duration-100 select-none',
    (mode === 'prev' ? currentPage === 1 : currentPage === numPages)
      ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
      : 'bg-sky-500 dark:bg-sky-700 text-white shadow-md hover:bg-sky-600 dark:hover:bg-sky-600',
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
