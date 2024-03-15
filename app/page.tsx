import React from "react";
import { MapPinIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata, NextPage } from "next";
import { initializeLanguage } from "./actions";
import Button from "@/components/Button";
import { getAllPosts } from "@/lib/get-data";
import { relativeTime } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const language = await initializeLanguage();
  const c = content[language];
  return {
    title: c.title,
    description: c.metaDescription,
    openGraph: {
      title: c.title,
      description: c.metaDescription,
    },
  };
}

const Home: NextPage = async () => {
  const language = await initializeLanguage();
  const c = content[language];
  const latestPost = (await getAllPosts())[0];
  let latestPostLink = `/`;
  if (latestPost.category === `post` && language === `en`) {
    latestPostLink = `/posts/${latestPost[language].slug}`;
  } else if (latestPost.category === `post` && language === `es`) {
    latestPostLink = `/publicaciones/${latestPost[language].slug}`;
  } else if (latestPost.category === `teaching` && language === `en`) {
    latestPostLink = `/teachings/${latestPost[language].slug}`;
  } else if (latestPost.category === `teaching` && language === `es`) {
    latestPostLink = `/ensenanzas/${latestPost[language].slug}`;
  }

  return (
    <div className="py-16 px-8 sm:px-12 flex flex-col items-center justify-center min-h-full">
      <Link
        href={latestPostLink}
        className="flex items-center justify-between gap-16 bg-sky-200/70 hover:bg-sky-200 transition-colors duration-300 rounded-full p-1 mb-12 group"
      >
        <div className="gap-3 flex items-center">
          <span className="capitalize text-sky-800 bg-sky-300/50 rounded-full px-4 py-0.5 font-medium hidden xs:block">
            {relativeTime(latestPost.createdAt, language)}:
          </span>
          <span className="font-semibold text-sky-800 pl-4 xs:pl-0">
            {latestPost[language].title}
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-white/50 flex items-center justify-center text-sky-600">
          <ArrowRightIcon className="w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
      <h1 className="font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-800 text-center">
        {c.title}
      </h1>
      <h2 className="mt-4 md:mt-6 text-xl md:text-2xl max-w-2xl text-center text-slate-800/70">
        {c.subtitle}
      </h2>
      <div className="mt-12 w-full xs:w-96 md:w-auto flex flex-col md:flex-row gap-4">
        <Button
          type="link"
          to={c.buttons.whereToStart.to}
          color="primary"
          size="lg"
          icon={MapPinIcon}
        >
          {c.buttons.whereToStart.text}
        </Button>
        <div className="flex flex-col xs:flex-row gap-4">
          <Button
            type="link"
            to={c.buttons.posts.to}
            color="secondary"
            size="lg"
            className="flex-grow"
          >
            {c.buttons.posts.text}
          </Button>
          <Button
            type="link"
            to={c.buttons.teachings.to}
            color="secondary"
            size="lg"
            className="flex-grow"
          >
            {c.buttons.teachings.text}
          </Button>
        </div>
      </div>
      <div className="max-w-3xl mt-12 xs:mt-16 sm:mt-24 bg-sky-100/50 p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-2">
        <p className="text-lg xs:text-xl text-sky-800 text-center">
          {c.verse.text}
        </p>
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
    metaDescription: `A blog and podcast containing the writings and teachings of Jason R. Henderson.`,
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
    metaDescription: `Un blog y podcast que contiene los escritos y enseñanzas de Jason R. Henderson.`,
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
