import React from 'react';
import { Lang, Post } from '../lib/types';

interface Props {
  featuredPosts: Array<Pick<Post<Lang>, 'title' | 'description' | 'slug'>>;
  language: Lang;
}

const StartHereBlock: React.FC<Props> = ({ featuredPosts, language }) => {
  return (
    <section className="p-2 lg:p-8 pt-16 lg:pt-28 relative bg-gradient-to-b from-sky-500/30 dark:from-sky-600/30 to-sky-500 dark:to-sky-950 backdrop-blur-2xl">
      <h2 className="text-3xl lg:text-4xl font-inter text-sky-900 dark:text-sky-200 pl-8 lg:pl-12 mr-12">
        {language === 'en'
          ? 'New here? Start with one of these:'
          : '¿Eres nuevo aquí? Empieza con uno de estos:'}
      </h2>
      <div className="pt-8 md:pt-12 pb-12 md:pb-20 px-4 xl:px-12 rounded-3xl bg-gradient-to-t from-white/20 dark:from-sky-600/20 to-transparent mt-8 flex flex-wrap justify-center gap-8">
        {featuredPosts.map((post) => (
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl lg:w-112 xl:w-[30%] flex flex-col justify-between"
            key={post.slug}
          >
            <div className="flex-grow p-8 pb-4">
              <h3 className="text-2xl font-bold max-w-[280px] dark:text-white">
                {post.title}
              </h3>
              <p className="mt-4 text-slate-500 dark:text-slate-400 text-[15px]">
                {post.description}...
              </p>
            </div>
            <div className="flex justify-end p-4 bg-slate-50 dark:bg-slate-800/40 rounded-b-3xl">
              <a
                className="block self-end px-4 py-2 text-sky-500 dark:text-sky-300 transition duration-100 hover:text-sky-600 dark:hover:text-sky-200 cursor-pointer rounded-lg bg-sky-100 dark:bg-sky-500/10"
                href={
                  language === `en`
                    ? `/posts/${post.slug}`
                    : `/publicaciones/${post.slug}`
                }
              >
                {language === `en` ? `View post` : `Ver publicación`}
                {` `}
                <i className="fa-solid fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartHereBlock;
