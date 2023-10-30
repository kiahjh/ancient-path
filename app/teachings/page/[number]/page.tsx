import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import { paginate } from "@/lib/helpers";
import Paginator from "@/components/Paginator";
import PostPreview from "@/components/PostPreview";
import { initializeLanguage } from "@/app/actions";

const TeachingsPage: NextPage<{ params: { number: string } }> = async ({
  params,
}) => {
  const language = await initializeLanguage();
  const teachings = (await getAllPosts()).filter(
    (post) => post.category === `teaching`,
  );
  const numPages = Math.ceil(teachings.length / 8);
  const pageNum = Number(params.number);
  if (isNaN(pageNum)) return notFound();

  if (pageNum < 1 || pageNum > numPages) return notFound();

  const c = content[language];

  return (
    <div className="flex flex-col">
      <main className="flex-grow p-20">
        <h1 className="text-4xl font-bold text-slate-800">{c.title}</h1>
        <h2 className="text-lg font-medium text-slate-800">
          {language === `en`
            ? `Page ${pageNum} of ${Math.ceil(teachings.length / 8)}`
            : `Página ${pageNum} de ${Math.ceil(teachings.length / 8)}`}
        </h2>
        <p className="text-lg mt-2 text-slate-500 max-w-4xl">{c.description}</p>
        <div className="grid grid-cols-1 gap-4 mt-8">
          {paginate(teachings, pageNum, 8).map((teaching) => (
            <PostPreview post={teaching} language={language} />
          ))}
        </div>
      </main>
      <footer className="p-4 border-t-2 border-sky-100 flex justify-center items-center">
        <Paginator
          numPages={numPages}
          currentPage={pageNum}
          basePath={`/teachings/page`}
        />
      </footer>
    </div>
  );
};

export default TeachingsPage;

const content = {
  en: {
    title: `Teachings`,
    description: `The teachings on this site are either stand-alone messages on various subjects, or series composed of several parts. I offer these teachings in a degree of “fear and trembling”, feeling it to be a serious thing to teach the Lord’s body, and knowing the imperfection of my understanding. But I find some encouragement to make these teachings available, sincerely believing the following two things: 1) that I speak my own experiences, and not the ideas and opinions of other men; and 2) that I desire not only to know the Truth, but to live it, and to be clothed in it when I stand before the Lord.`,
  },
  es: {
    title: `Enseñanzas`,
    description: `Las enseñanzas de este sitio son mensajes independientes sobre diversos temas, o series compuestas de varias partes. Ofrezco estas enseñanzas con cierto “temor y temblor”, sintiendo que es algo serio enseñar al cuerpo del Señor, y conociendo la imperfección de mi entendimiento. Pero encuentro cierto ánimo para ofrecer estas enseñanzas, creyendo sinceramente las dos cosas siguientes: 1) que hablo de mis propias experiencias, y no de las ideas y opiniones de otros hombres; y 2) que deseo no sólo conocer la Verdad, sino vivirla, y estar revestido de ella cuando me presente ante el Señor.`,
  },
};
