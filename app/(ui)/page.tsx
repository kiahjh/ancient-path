import React from "react";
import type { Metadata, NextPage } from "next";
import { initializeLanguage } from "../../lib/actions";
import Button from "@/components/Button";

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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-16 px-8 sm:px-12 flex flex-col items-center justify-center min-h-full flex-grow">
        <h1 className="font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-800 text-center">
          {c.title}
        </h1>
        <h2 className="mt-4 md:mt-6 text-xl md:text-2xl max-w-2xl text-center text-slate-800/70">
          {c.subtitlePrefix}
          <span className="whitespace-nowrap">{c.name}</span>
          {c.subtitleSuffix}
        </h2>
        <div className="mt-12 w-full xs:w-96 md:w-auto flex flex-col md:flex-row gap-4">
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-4 max-w-2xl">
            <Button
              type="link"
              to={c.buttons.teachings.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.teachings.text}
            </Button>
            <Button
              type="link"
              to={c.buttons.posts.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.posts.text}
            </Button>
            <Button
              type="link"
              to={c.buttons.meetings.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.meetings.text}
            </Button>
            <Button
              type="link"
              to={c.buttons.books.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.books.text}
            </Button>
            <Button
              type="link"
              to={c.buttons.parenting.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.parenting.text}
            </Button>
            <Button
              type="link"
              to={c.buttons.aboutMe.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.aboutMe.text}
            </Button>
            <Button
              type="link"
              to={c.buttons.contact.to}
              color="secondary"
              size="lg"
            >
              {c.buttons.contact.text}
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
    </div>
  );
};

export default Home;

const content = {
  en: {
    title: `The Ancient Path`,
    subtitlePrefix: `Writings, teachings, and recommended resources from `,
    name: `Jason Henderson`,
    subtitleSuffix: ``,
    metaDescription: `A blog and podcast containing the writings and teachings of Jason R. Henderson.`,
    recentPostsLabel: `Coming soon: recent posts`,
    buttons: {
      teachings: {
        text: `Teachings`,
        to: `/teachings`,
      },
      posts: {
        text: `Posts`,
        to: `/posts`,
      },
      meetings: {
        text: `Live meetings`,
        to: `/meetings`,
      },
      books: {
        text: `Books`,
        to: `/books`,
      },
      parenting: {
        text: `Parenting`,
        to: `/parenting`,
      },
      aboutMe: {
        text: `About me`,
        to: `/about`,
      },
      contact: {
        text: `Contact`,
        to: `/contact`,
      },
    },
    verse: {
      text: `Stand by the ways and see and ask for the ancient paths, where the good way is, and walk in it; and you will find rest for your souls. But they said, “We will not walk in it.”`,
      reference: `Jeremiah 6:16`,
    },
  },
  es: {
    title: `La Senda Antigua`,
    subtitlePrefix: `Escritos, enseñanzas y recursos recomendados de `,
    name: `Jason Henderson`,
    subtitleSuffix: ``,
    metaDescription: `Un blog y podcast que contiene los escritos y enseñanzas de Jason R. Henderson.`,
    recentPostsLabel: `Próximamente: publicaciones recientes`,
    buttons: {
      teachings: {
        text: `Enseñanzas`,
        to: `/ensenanzas`,
      },
      posts: {
        text: `Publicaciones`,
        to: `/publicaciones`,
      },
      meetings: {
        text: `Reuniones`,
        to: `/reuniones`,
      },
      books: {
        text: `Libros`,
        to: `/libros`,
      },
      parenting: {
        text: `Parenting`,
        to: `/crianza`,
      },
      aboutMe: {
        text: `Acerca de mi`,
        to: `/acerca-de-mi`,
      },
      contact: {
        text: `Contacto`,
        to: `/contacto`,
      },
    },
    verse: {
      text: `Párense en los caminos y miren, y pregunten por los senderos antiguos, cuál es el buen camino, y anden por él; y hallarán descanso para sus almas. Pero dijeron: "No andaremos en él"`,
      reference: `Jeremías 6:16`,
    },
  },
};
