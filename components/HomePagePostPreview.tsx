import React from 'react';
import striptags from 'striptags';
import { relativeTime } from '../lib/dates';
import { DualPost, Lang } from '../lib/types';
import TeachingBadge from './TeachingBadge';

interface Props {
  post: DualPost;
  language: Lang;
}

const HomePagePostPreview: React.FC<Props> = ({ post, language }) => {
  return (
    <div className="p-3 sm:p-6 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 shrink-0 mb-1 sm:mb-0">
          <h2 className="text-2xl font-bold text-white">
            {language === 'en' ? post.en.title : post.es.title}
          </h2>
          {post.category === 'teaching' && <TeachingBadge language={language} onDark />}
        </div>
        <h3 className="text-white text-opacity-70 font-medium shrink-0">
          {relativeTime(post.createdAt, language)}
        </h3>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html:
            striptags(language === 'en' ? post.en.content : post.es.content)
              .substring(0, 400)
              .trim() + '...',
        }}
        className="text-white text-opacity-80 sm:text-lg mt-2 mb-4"
      ></p>
      <a
        className="flex justify-center items-center self-start space-x-2 transition duration-100 text-sky-100 hover:text-sky-300 cursor-pointer py-2"
        href={
          language === 'en' ? `/posts/${post.en.slug}` : `/publicaciones/${post.es.slug}`
        }
      >
        <span>{language === 'en' ? 'Read post' : 'Leer publicación'}</span>
        <i className="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  );
};

export default HomePagePostPreview;
