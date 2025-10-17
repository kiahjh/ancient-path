import React from "react";
import type { Language, Post, Series } from "@/lib/types";
import PostPreview from "@/components/PostPreview";

type Props = {
  language: Language;
  posts: Post[];
} & ({ category: "posts" } | { category: "teachings"; series: Series[] });

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
      return 0;
    case "two-births-in-man":
      return 1;
    case "grace-should-reign":
      return 2;
    case "coming-unto-jesus":
      return 3;
    case "the-appearings-of-christ":
      return 4;
    case "self-discipline":
      return 5;
    case "freedom-from-sin":
      return 6;
    case "creating-ishmaels":
      return 7;
    case "the-nature-of-mans-freedom":
      return 8;
    case "who-chooses-who":
      return 9;
    case "losing-your-guide":
      return 10;
    case "striving-and-diligence":
      return 11;
    case "why-christians-dont-change-0e283880-20c0-11ed-abde-29fdedf3cb84":
      return 12;
    case "justification-and-condemnation-l7dq47x9":
      return 13;
    case "after-new-birth":
      return 14;
    case "the-conscience-vs-the-light-of-christ":
      return 15;
    case "relationship-with-god":
      return 16;
    case "spiritual-light":
      return 17;
    case "the-biggest-lie":
      return 18;
    case "obedience-must-keep-pace-with-knowledge":
      return 19;
    case "the-implanted-word":
      return 20;
    case "spiritual-discernment":
      return 21;
    case "the-bruiser-of-the-serpent":
      return 22;
    case "the-work-of-faith":
      return 23;
    case "self-love":
      return 24;
    default:
      return 1000;
  }
}
