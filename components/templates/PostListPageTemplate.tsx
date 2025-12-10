import React from "react";
import type { Language, PostListItem, Series } from "@/lib/types";
import PostPreview from "@/components/PostPreview";

type Props = {
  language: Language;
} & (
  | { category: "posts"; posts: PostListItem[] }
  | { category: "teachings"; posts: PostListItem[]; series: Series[] }
);

const PostListPageTemplate: React.FC<Props> = (props) => {
  const c = content[props.language];

  return (
    <div className="flex flex-col">
      <main className="flex-grow px-6 xs:px-8 md:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-16 xl:pt-20 pb-4 lg:pb-16 xl:pb-20">
        <h1 className="text-4xl font-bold text-sky-950">
          {props.category === `posts` ? c.postsTitle : c.teachingsTitle}
        </h1>
        <p className="text-lg mt-2 text-sky-800/80 max-w-4xl">
          {props.category === `posts`
            ? c.postsDescription
            : c.teachingsDescription}
        </p>
        <div className="grid grid-cols-1 gap-4 mt-8 -mx-6 xs:mx-0">
          {props.posts
            .sort(
              (a, b) =>
                orderFromSlug(a[props.language].slug) -
                orderFromSlug(b[props.language].slug),
            )
            .map((post) => {
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
                const thisSeries = props.series.find(
                  (s) => s.id === post.series,
                );
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
                        part:
                          postsInSeries.length - postsInSeries.indexOf(post),
                      }}
                    />
                  );
                }
              }
            })}
        </div>
      </main>
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

function orderFromSlug(slug: string): number {
  switch (slug) {
    case "two-kinds-of-believers":
    case "dos-tipos-de-creyentes":
      return 0;
    case "two-births-in-man":
    case "dos-nacimientos-en-el-hombre":
      return 1;
    case "grace-should-reign":
    case "la-gracia-debe-reinar":
      return 2;
    case "coming-unto-jesus":
    case "ir-a-jesus":
      return 3;
    case "the-appearings-of-christ":
    case "las-apariciones-de-cristo":
      return 4;
    case "self-discipline":
    case "auto-disciplina":
      return 5;
    case "freedom-from-sin":
    case "libertad-del-pecado":
      return 6;
    case "creating-ishmaels":
    case "creando-ismaeles":
      return 7;
    case "the-nature-of-mans-freedom":
    case "la-naturaleza-de-la-libertad-del-hombre":
      return 8;
    case "who-chooses-who":
    case "quien-escoge-a-quien":
      return 9;
    case "losing-your-guide":
    case "perder-a-tu-guia":
      return 10;
    case "striving-and-diligence":
    case "esfuerzo-y-diligencia":
      return 11;
    case "why-christians-dont-change-0e283880-20c0-11ed-abde-29fdedf3cb84":
    case "por-que-los-cristianos-no-cambian":
      return 12;
    case "justification-and-condemnation-l7dq47x9":
    case "justificacion-y-condenacion":
      return 13;
    case "after-new-birth":
    case "despues-del-nuevo-nacimiento":
      return 14;
    case "the-conscience-vs-the-light-of-christ":
    case "la-conciencia-vs-la-luz-de-cristo":
      return 15;
    case "relationship-with-god":
    case "relacion-con-dios":
      return 16;
    case "spiritual-light":
    case "luz-espiritual":
      return 17;
    case "the-biggest-lie":
    case "la-gran-mentira":
      return 18;
    case "obedience-must-keep-pace-with-knowledge":
    case "la-obediencia-tiene-que-ir-de-la-mano-con-el-conocimiento":
      return 19;
    case "the-implanted-word":
    case "la-palabra-implantada":
      return 20;
    case "spiritual-discernment":
    case "discernimiento-espiritual":
      return 21;
    case "the-bruiser-of-the-serpent":
    case "la-semilla-que-hiere-a-la-serpiente":
      return 22;
    case "the-work-of-faith":
    case "la-obra-de-la-fe":
      return 23;
    case "self-love":
    case "el-amor-al-yo":
      return 24;
    default:
      return 1000;
  }
}
