import React from "react";
import type { Language } from "@/lib/types";
import RecommendedPost from "../RecommendedPost";
import { getAllPosts } from "@/lib/get-data";

const WhereToStartTemplate: React.FC<{ language: Language }> = async ({
  language,
}) => {
  const c = content[language];
  const allPosts = await getAllPosts();
  const recommendedShorts = allPosts.filter((p) =>
    c.recommended.shorts.includes(p[language].slug),
  );
  const recommendedSeries = allPosts
    .filter((p) => c.recommended.series.includes(p[language].slug))
    .reverse();

  return (
    <div className="min-h-full px-8 md:px-12 xl:px-20 py-20 flex flex-col items-center">
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-slate-800 text-center">
        {c.title}
      </h1>
      <p className="xs:text-lg max-w-3xl mt-7 text-slate-500 text-center">
        {c.paragraph}
      </p>
      <div className="mt-12 gap-4 sm:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg+:grid-cols-2 2xl:grid-cols-3 -mx-8 xs:mx-0">
        {recommendedShorts.map((short) => (
          <RecommendedPost post={short} language={language} key={short.id} />
        ))}
      </div>
      <div className="mt-20 px-0 xs:px-8 sm:px-10 py-10 border border-dashed rounded-3xl border-sky-400/60 flex justify-center relative gap-4 sm:gap-8 -mx-10 flex-wrap 2xl:flex-nowrap">
        <h2 className="absolute -top-3 text-xl bg-sky-50 px-4 font-medium text-sky-500">
          {c.recommended.seriesName}
        </h2>
        {recommendedSeries.map((post, i) => (
          <RecommendedPost
            post={post}
            language={language}
            key={post.id}
            mainTitle={`${c.recommended.seriesName} pt. ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhereToStartTemplate;

const content = {
  en: {
    title: `Not sure where to start?`,
    paragraph: `If you’re new to this site, I recommend that you start by reading or listening to one of the five shorter posts below, or with the three-part teaching series called The Gospel.`,
    recommended: {
      shorts: [
        `christ-died-for-us-not-instead-of-us`,
        `leaving-egypt`,
        `grace-should-reign`,
        `the-appearings-of-christ`,
        `two-births-in-man`,
      ],
      series: [`the-gospel-pt-1`, `the-gospel-pt-2`, `the-gospel-pt-3`],
      seriesName: `The Gospel`,
    },
  },
  es: {
    title: `¿No estás seguro por dónde empezar?`,
    paragraph: `Si eres nuevo en este sitio, te recomiendo que empieces leyendo o escuchando una de las cinco publicaciones breves que aparecen a continuación, o con la serie de enseñanzas en tres partes titulada El Evangelio.`,
    recommended: {
      shorts: [
        `cristo-murio-por-nosotros-no-en-lugar-de-nosotros`,
        `dejar-egipto`,
        `la-gracia-debe-reinar`,
        `las-apariciones-de-cristo`,
        `dos-nacimientos-en-el-hombre`,
      ],
      series: [`el-evangelio-pt-1`, `el-evangelio-pt-2`, `el-evangelio-pt-3`],
      seriesName: `El Evangelio`,
    },
  },
};
