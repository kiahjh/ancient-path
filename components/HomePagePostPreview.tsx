import React from 'react';
import striptags from 'striptags';
import { relativeTime } from '../lib/dates';
import { getExcerpt } from '../lib/helpers';
import { DualPost, Lang } from '../lib/types';
import TeachingBadge from './TeachingBadge';

interface Props {
  post: DualPost;
  language: Lang;
}

const HomePagePostPreview: React.FC<Props> = ({ post, language }) => {
  return (
    <div className="p-3 sm:p-6 rounded-2xl flex flex-col">
      <div className="flex flex-row flex-wrap items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mr-3 mb-2">
          {language === 'en' ? post.en.title : post.es.title}
        </h2>
        <div className="flex-grow flex justify-between items-center mb-2">
          {post.category === 'teaching' ? (
            <TeachingBadge language={language} onDark className="mr-2" />
          ) : (
            <div />
          )}
          <h3 className="text-white text-opacity-70 font-medium shrink-0">
            {relativeTime(post.createdAt, language)}
          </h3>
        </div>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: getExcerpt(language === 'en' ? post.en.content : post.es.content, 400),
        }}
        className="text-white text-opacity-80 sm:text-lg mt-2 mb-4"
      ></p>
      <div className="flex justify-start">
        <a
          className="flex justify-center items-center self-start space-x-2 bg-white bg-opacity-10 dark:bg-sky-800/70 dark:bg-opacity-100 dark:hover:bg-sky-800 py-2 px-4 rounded-lg font-medium transition duration-100 text-white dark:text-opacity-90 hover:bg-opacity-30 cursor-pointer"
          href={
            language === 'en'
              ? `/posts/${post.en.slug}`
              : `/publicaciones/${post.es.slug}`
          }
        >
          <span>{language === 'en' ? 'Read post' : 'Leer publicación'}</span>
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default HomePagePostPreview;
