import React, { useContext } from 'react';
import cx from 'classnames';
import { LanguageContext } from '../lib/LanguageContext';
import { useRouter } from 'next/router';

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
        <button
          className={cx(
            'transition duration-100 border-r dark:border-slate-700 font-bold rounded-l-lg hidden md:flex px-4 py-4 w-16 lg:w-32 items-center justify-center',
            page === 1
              ? 'bg-slate-50 dark:bg-gray-900/30 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              : 'bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-sky-500 dark:text-sky-400',
          )}
          onClick={() => {
            if (page > 1) {
              router.push(
                language === 'en'
                  ? `/posts/page/${page - 1}`
                  : `/publicaciones/pagina/${page - 1}`,
              );
            }
          }}
        >
          <i className="fa-solid fa-arrow-left lg:mr-3" />
          <span className="hidden lg:block">
            {language === 'en' ? 'Previous' : 'Anterior'}
          </span>
        </button>
        <div className="flex space-x-4 justify-center p-2 md:p-0">
          {new Array(numPages).fill(0).map((_, index) => (
            <button
              key={index}
              className={cx(
                'border dark:border-slate-700 w-10 h-10 rounded-full font-medium hover:bg-slate-50 transition duration-100',
                index + 1 === page
                  ? 'text-sky-500 border-sky-200 bg-sky-50 dark:bg-slate-700'
                  : 'text-slate-400 dark:text-slate-500 dark:hover:bg-slate-700/50',
              )}
              onClick={() => {
                router.push(
                  language === 'en'
                    ? `/posts/page/${index + 1}`
                    : `/publicaciones/pagina/${index + 1}`,
                );
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className={cx(
            'transition duration-100 border-l dark:border-slate-700 font-bold rounded-r-lg hidden md:flex px-4 py-4 w-16 lg:w-32 items-center justify-center',
            page === numPages
              ? 'bg-slate-50 dark:bg-gray-900/30 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              : 'bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-sky-500 dark:text-sky-400',
          )}
          onClick={() => {
            if (page < numPages) {
              router.push(
                language === 'en'
                  ? `/posts/page/${page + 1}`
                  : `/publicaciones/pagina/${page + 1}`,
              );
            }
          }}
        >
          <span className="hidden lg:block">
            {language === 'en' ? 'Next' : 'Siguiente'}
          </span>
          <i className="fa-solid fa-arrow-right lg:ml-3" />
        </button>
      </div>
      <div className="md:hidden flex justify-between p-2 md:p-0 bg-slate-50 dark:bg-slate-700/20 rounded-b-xl">
        <button
          className={cx(
            'text-lg rounded-full flex justify-center items-center w-12 h-12 transition duration-100',
            page === 1
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-sky-500 dark:bg-sky-700 text-white shadow-md hover:bg-sky-600 dark:hover:bg-sky-600',
          )}
          onClick={() => {
            if (page > 1) {
              router.push(
                language === 'en'
                  ? `/posts/page/${page - 1}`
                  : `/publicaciones/pagina/${page - 1}`,
              );
            }
          }}
        >
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button
          className={cx(
            'text-lg rounded-full flex justify-center items-center w-12 h-12 transition duration-100',
            page === numPages
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-sky-500 dark:bg-sky-700 text-white shadow-md hover:bg-sky-600 dark:hover:bg-sky-600',
          )}
          onClick={() => {
            if (page < numPages) {
              router.push(
                language === 'en'
                  ? `/posts/page/${page + 1}`
                  : `/publicaciones/pagina/${page + 1}`,
              );
            }
          }}
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default Paginator;
