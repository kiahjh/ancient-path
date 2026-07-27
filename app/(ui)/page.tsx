import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import type { Metadata, NextPage } from "next";
import { initializeLanguage } from "../../lib/actions";
import Button from "@/components/Button";
import { authoredBooks, homeAuthoredBookOrder } from "@/lib/authored-books";

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
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-full flex-grow flex-col items-center px-6 pb-12 pt-20 xs:px-8 sm:px-12 sm:pb-16 sm:pt-28">
        <h1 className="font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-800 text-center">
          {c.title}
        </h1>
        <h2 className="mt-4 md:mt-6 text-xl md:text-2xl max-w-2xl text-center text-slate-800/70">
          {c.subtitlePrefix}
          <span className="whitespace-nowrap">{c.name}</span>
        </h2>
        <div className="mt-12 flex w-full flex-col gap-4 xs:w-96 md:w-auto md:flex-row">
          <div className="flex max-w-2xl flex-col flex-wrap justify-center gap-4 xs:flex-row">
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
        <section
          aria-label={c.authoredBooks.ariaLabel}
          className="mt-12 grid grid-cols-2 gap-4 xs:gap-8 sm:mt-16 sm:gap-14"
        >
          {homeAuthoredBookOrder.map((id) => {
            const book = authoredBooks[id].translations[language];
            return (
              <Link
                key={id}
                href={`${c.buttons.books.to}#${id}`}
                className="group flex min-w-0 flex-col items-center rounded-2xl px-1 py-2 text-center outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60"
              >
                <Image
                  src={book.cover}
                  alt={`${c.authoredBooks.coverAltPrefix} ${book.title}`}
                  className="h-40 w-auto drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none xs:h-52 sm:h-60 md:h-64"
                />
                <span className="mt-4 flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold tracking-wide text-sky-600 transition-colors group-hover:text-sky-700 xs:text-lg">
                  <BookOpenIcon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0"
                  />
                  {c.authoredBooks.cta}
                </span>
              </Link>
            );
          })}
        </section>
        <div className="mt-12 flex max-w-3xl flex-col items-center gap-2 rounded-3xl bg-sky-100/50 p-8 xs:mt-16 sm:mt-20 sm:p-12">
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
    metaDescription: `A blog and podcast containing the writings and teachings of Jason R. Henderson.`,
    recentPostsLabel: `Coming soon: recent posts`,
    authoredBooks: {
      ariaLabel: `Books by Jason Henderson`,
      coverAltPrefix: `Cover of`,
      cta: `Get this book`,
    },
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
    metaDescription: `Un blog y podcast que contiene los escritos y enseñanzas de Jason R. Henderson.`,
    recentPostsLabel: `Próximamente: publicaciones recientes`,
    authoredBooks: {
      ariaLabel: `Libros de Jason Henderson`,
      coverAltPrefix: `Portada de`,
      cta: `Obtener libro`,
    },
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
