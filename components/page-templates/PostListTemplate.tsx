import React from "react";
import type { Language, Post } from "@/lib/types";
import { paginate } from "@/lib/helpers";
import Paginator from "@/components/Paginator";
import PostPreview from "@/components/PostPreview";

interface Props {
  language: Language;
  posts: Post[];
  currentPage: number;
  numPages: number;
}

const PostListTemplate: React.FC<Props> = ({
  language,
  posts,
  currentPage,
  numPages,
}) => {
  const c = content[language];

  return (
    <div className="flex flex-col">
      <main className="flex-grow p-20">
        <h1 className="text-4xl font-bold text-slate-800">{c.title}</h1>
        <h2 className="text-lg font-medium text-slate-800">
          {language === `en`
            ? `Page ${currentPage} of ${Math.ceil(posts.length / 8)}`
            : `Página ${currentPage} de ${Math.ceil(posts.length / 8)}`}
        </h2>
        <p className="text-lg mt-2 text-slate-500 max-w-4xl">{c.description}</p>
        <div className="grid grid-cols-1 gap-4 mt-8">
          {paginate(posts, currentPage, 8).map((teaching) => (
            <PostPreview post={teaching} language={language} />
          ))}
        </div>
      </main>
      <footer className="p-4 border-t-2 border-sky-100 flex justify-center items-center">
        <Paginator
          numPages={numPages}
          currentPage={currentPage}
          basePath={c.basePath}
        />
      </footer>
    </div>
  );
};

export default PostListTemplate;

const content = {
  en: {
    title: `Posts`,
    description: `The majority of these posts are my replies to emails, text messages, or other questions brought up in various settings. Any names or personal information have of course been removed.`,
    basePath: `/posts/page`,
  },
  es: {
    title: `Publicaciones`,
    description: `La mayoría de estos mensajes son mis respuestas a correos electrónicos, mensajes de texto u otras preguntas planteadas en diversos contextos. Por supuesto, se ha eliminado cualquier nombre o información personal.`,
    basePath: `/publicaciones/pagina`,
  },
};
