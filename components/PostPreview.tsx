import React, { useContext } from 'react';
import striptags from 'striptags';
import cx from 'classnames';
import type { DualPost } from '../lib/types';
import { englishMonths, spanishMonths } from '../lib/dates';
import { LanguageContext } from '../lib/LanguageContext';
import TeachingBadge from './TeachingBadge';

interface Props {
  post: DualPost;
}

const PostPreview: React.FC<Props> = ({ post }) => {
  const language = useContext(LanguageContext);
  const previewText =
    striptags(post[language].content).replace(`&nbsp;`, ` `).substring(0, 400).trim() +
    `...`;

  return (
    <div className="shadow-lg border-[0.5px] rounded-xl relative bg-white flex flex-col justify-start items-start md:ml-10">
      {new Date().getTime() - new Date(post.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7 && (
        <div
          className={cx(
            'w-12 h-12 bg-sky-400 rounded-full flex justify-center items-center text-white right-4 -top-4 absolute shadow-md uppercase font-medium rotate-12',
            language === 'en' ? 'text-sm' : 'text-xs',
          )}
        >
          {language === 'en' ? 'New' : 'Nuevo'}
        </div>
      )}
      <div className="absolute w-20 h-20 rounded-full shadow-md bg-white md:-left-10 md:top-6 -top-10 left-4 flex flex-col items-center justify-center border-[0.5px]">
        <h3 className="uppercase text-gray-400 text-sm font-light">
          {(language === `en` ? englishMonths : spanishMonths)[
            new Date(post.createdAt).getMonth()
          ].substring(0, 3)}
        </h3>
        <h3 className="text-2xl text-sky-500">{new Date(post.createdAt).getDate()}</h3>
      </div>
      <div className="p-6 md:pl-16 pt-16 md:pt-6 pb-4">
        <div className="flex justify-start items-center flex-wrap">
          <h2 className="text-xl font-inter text-gray-900 mr-3 mb-2">
            {post[language].title}
          </h2>
          {post.category === 'teaching' && (
            <TeachingBadge language={language} className="mb-2" />
          )}
        </div>
        <p
          className="mt-3 mb-3 text-gray-500"
          dangerouslySetInnerHTML={{ __html: previewText }}
        />
      </div>
      <div className="p-4 flex justify-end w-full bg-slate-50 rounded-b-xl">
        <a
          className="block self-end px-4 py-2 text-sky-500 transition duration-100 hover:text-sky-600 cursor-pointer rounded-lg bg-sky-100"
          href={
            language === `en`
              ? `/posts/${post.en.slug}`
              : `/publicaciones/${post.es.slug}`
          }
        >
          {language === `en` ? `Read post` : `Leer publicación`}
          {` `}
          <i className="fa-solid fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  );
};

export default PostPreview;
