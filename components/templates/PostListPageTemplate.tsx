import React from "react";
import type { Metadata } from "next";
import type { Language, Post, Series } from "@/lib/types";
import { paginate } from "@/lib/helpers";
import Paginator from "@/components/Paginator";
import PostPreview from "@/components/PostPreview";
import { initializeLanguage } from "@/lib/actions";

type Props = {
  language: Language;
  currentPage: number;
  numPages: number;
  posts: Post[];
} & ({ category: "posts" } | { category: "teachings"; series: Series[] });

const PostListPageTemplate: React.FC<Props> = (props) => {
  const c = content[props.language];

  return (
    <div className="flex flex-col">
      <main className="flex-grow px-6 xs:px-8 md:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-16 xl:pt-20 pb-4 lg:pb-16 xl:pb-20">
        <h1 className="text-4xl font-bold text-slate-800">
          {props.category === `posts` ? c.postsTitle : c.teachingsTitle}
        </h1>
        <h2 className="text-lg font-medium text-slate-800">
          {props.language === `en`
            ? `Page ${props.currentPage} of ${Math.ceil(
                props.posts.length / 8,
              )}`
            : `Página ${props.currentPage} de ${Math.ceil(
                props.posts.length / 8,
              )}`}
        </h2>
        <p className="text-lg mt-2 text-slate-500 max-w-4xl">
          {props.category === `posts`
            ? c.postsDescription
            : c.teachingsDescription}
        </p>
        <div className="grid grid-cols-1 gap-4 mt-8 -mx-6 xs:mx-0">
          {paginate(props.posts, props.currentPage, 8).map((post) => {
            if (props.category === `posts`) {
              return (
                <PostPreview
                  key={post.id}
                  category="post"
                  post={post}
                  language={props.language}
                />
              );
            } else {
              const thisSeries = props.series.find((s) => s.id === post.series);
              if (!thisSeries || !post.series) {
                return (
                  <PostPreview
                    key={post.id}
                    category="teaching"
                    teaching={post}
                    language={props.language}
                  />
                );
              } else {
                const postsInSeries = props.posts.filter(
                  (p) => p.series === post.series,
                );
                return (
                  <PostPreview
                    key={post.id}
                    category="teaching"
                    teaching={post}
                    language={props.language}
                    series={{
                      series: thisSeries,
                      part: postsInSeries.length - postsInSeries.indexOf(post),
                    }}
                  />
                );
              }
            }
          })}
        </div>
      </main>
      <footer className="p-4 lg:border-t-2 border-sky-100 flex justify-center items-center">
        <Paginator
          language={props.language}
          numPages={props.numPages}
          currentPage={props.currentPage}
          basePath={
            props.category === `posts` ? c.postsBasePath : c.teachingsBasePath
          }
        />
      </footer>
    </div>
  );
};

export default PostListPageTemplate;

const content = {
  en: {
    postsTitle: `Posts`,
    postsDescription: `The majority of these posts are my replies to emails, text messages, or other questions brought up in various settings. Any names or personal information have of course been removed.`,
    teachingsTitle: `Teachings`,
    teachingsDescription: `The teachings on this site are either stand-alone messages on various subjects, or series composed of several parts.`,
    postsBasePath: `/posts/page`,
    teachingsBasePath: `/teachings/page`,
  },
  es: {
    postsTitle: `Publicaciones`,
    postsDescription: `La mayoría de estos mensajes son mis respuestas a correos electrónicos, mensajes de texto u otras preguntas planteadas en diversos contextos. Por supuesto, se ha eliminado cualquier nombre o información personal.`,
    teachingsTitle: `Enseñanzas`,
    teachingsDescription: `Las enseñanzas de este sitio son mensajes independientes sobre diversos temas, o series compuestas de varias partes.`,
    postsBasePath: `/publicaciones/pagina`,
    teachingsBasePath: `/ensenanzas/pagina`,
  },
};
