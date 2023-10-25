import React from "react";
import type { NextPage } from "next";
import { initializeLanguage } from "./actions";
import HomePageRecentPost from "@/components/HomePageRecentPost";
import { getAllPosts } from "@/lib/get-data";

const Home: NextPage = async () => {
  const language = await initializeLanguage();
  const recentPosts = (await getAllPosts()).slice(0, 3);

  const c = content[language];

  return (
    <div className="py-28 px-12 flex flex-col items-center justify-center gap-20 h-full">
      <div className="flex flex-col items-center">
        <h1 className="font-black text-6xl text-slate-800">{c.title}</h1>
        <h2 className="mt-6 text-xl max-w-2xl text-center text-slate-800/70">
          {c.subtitle}
        </h2>
      </div>
      <div className="p-8 border border-dashed border-sky-500/40 rounded-3xl flex flex-col items-center relative">
        <span className="text-lg text-sky-500/70 absolute -top-4 bg-sky-50 px-4">
          {c.recentPostsLabel}
        </span>
        <div className="flex gap-8 flex-wrap justify-center">
          <HomePageRecentPost post={recentPosts[0]} />
          <HomePageRecentPost post={recentPosts[1]} />
          <HomePageRecentPost post={recentPosts[2]} />
        </div>
      </div>
    </div>
  );
};

export default Home;

const content = {
  en: {
    title: `The Ancient Path`,
    subtitle: `A place to share my thoughts and experiences about the way God works in the soul of man.`,
    recentPostsLabel: `Coming soon: recent posts`,
  },
  es: {
    title: `La Senda Antigua`,
    subtitle: `Un lugar para compartir mis pensamientos y experiencias sobre la forma en que Dios obra en el alma del hombre.`,
    recentPostsLabel: `Próximamente: publicaciones recientes`,
  },
};
