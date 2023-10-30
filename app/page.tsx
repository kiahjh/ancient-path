import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { initializeLanguage } from "./actions";
import Button from "@/components/Button";

const Home: NextPage = async () => {
  const language = await initializeLanguage();
  const c = content[language];

  return (
    <div className="py-28 px-12 flex flex-col items-center justify-center h-full">
      <h1 className="font-black text-8xl text-slate-800">{c.title}</h1>
      <h2 className="mt-6 text-2xl max-w-2xl text-center text-slate-800/70">
        {c.subtitle}
      </h2>
      <div className="mt-12 flex gap-4">
        <Button
          type="link"
          to={c.buttons.whereToStart.to}
          color="primary"
          size="lg"
          icon={MapPinIcon}
        >
          {c.buttons.whereToStart.text}
        </Button>
        <Button type="link" to={c.buttons.posts.to} color="secondary" size="lg">
          {c.buttons.posts.text}
        </Button>
        <Button
          type="link"
          to={c.buttons.teachings.to}
          color="secondary"
          size="lg"
        >
          {c.buttons.teachings.text}
        </Button>
      </div>
      <div className="w-176 mt-24 bg-sky-100/50 p-12 rounded-3xl flex flex-col items-center gap-2">
        <p className="text-xl text-sky-800 text-center">{c.verse.text}</p>
        <span className="font-bold text-xl text-sky-900">
          {c.verse.reference}
        </span>
      </div>
    </div>
  );
};

export default Home;

const content = {
  en: {
    title: `The Ancient Path`,
    subtitle: `Writings and teachings of Jason Henderson`,
    recentPostsLabel: `Coming soon: recent posts`,
    buttons: {
      whereToStart: {
        text: `Where to start`,
        to: `/where-to-start`,
      },
      posts: {
        text: `Posts`,
        to: `/posts/page/1`,
      },
      teachings: {
        text: `Teachings`,
        to: `/teachings/page/1`,
      },
    },
    verse: {
      text: `Stand by the ways and see and ask for the ancient paths, where the good way is, and walk in it; and you will find rest for your souls. But they said, “We will not walk in it.”`,
      reference: `Jeremiah 6:16`,
    },
  },
  es: {
    title: `La Senda Antigua`,
    subtitle: `Un lugar para compartir mis pensamientos y experiencias sobre la forma en que Dios obra en el alma del hombre.`,
    recentPostsLabel: `Próximamente: publicaciones recientes`,
    buttons: {
      whereToStart: {
        text: `Dónde empezar`,
        to: `/donde-empezar`,
      },
      posts: {
        text: `Publicaciones`,
        to: `/publicaciones/pagina/1`,
      },
      teachings: {
        text: `Enseñanzas`,
        to: `/ensenanzas/pagina/1`,
      },
    },
    verse: {
      text: `Párense en los caminos y miren, y pregunten por los senderos antiguos, cuál es el buen camino, y anden por él; y hallarán descanso para sus almas. Pero dijeron: "No andaremos en él"`,
      reference: `Jeremías 6:16`,
    },
  },
};
