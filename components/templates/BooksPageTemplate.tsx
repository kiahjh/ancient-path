import { Language } from "@/lib/types";
import { ArrowRightIcon, BookIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Button from "../Button";

const BooksPageTemplate: React.FC<{ language: Language }> = ({ language }) => {
  const c = content[language];
  return (
    <div className="flex flex-col px-6 xs:px-8 md:px-12 xl:px-20 py-20">
      <div className="h-12 w-12 bg-sky-200 rounded-full items-center justify-center flex text-sky-600">
        <BookIcon size={24} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mt-6">{c.title}</h1>
      <p className="mt-4 text-xl text-sky-900/60 max-w-2xl">{c.description}</p>
      <div className="mt-8 -mx-6 xs:-mx-8 sm:mx-0 p-6 xs:p-8 lg:p-12 bg-white rounded-3xl">
        <h2 className="text-2xl font-medium text-slate-900">
          {c.earlyFriends.title}
        </h2>
        <p className="text-slate-500 text-lg mt-1">
          {c.earlyFriends.description}
        </p>
        <div className="flex gap-8 mt-8 flex-wrap">
          <Book
            title={c.earlyFriends.books[0]?.title ?? ""}
            author={c.earlyFriends.books[0]?.author ?? ""}
            description={c.earlyFriends.books[0]?.description ?? ""}
            href={c.earlyFriends.books[0]?.href ?? ""}
          />
          <Book
            title={c.earlyFriends.books[1]?.title ?? ""}
            author={c.earlyFriends.books[1]?.author ?? ""}
            description={c.earlyFriends.books[1]?.description ?? ""}
            href={c.earlyFriends.books[1]?.href ?? ""}
          />
          <Book
            title={c.earlyFriends.books[2]?.title ?? ""}
            author={c.earlyFriends.books[2]?.author ?? ""}
            description={c.earlyFriends.books[2]?.description ?? ""}
            href={c.earlyFriends.books[2]?.href ?? ""}
          />
          <Book
            title={c.earlyFriends.books[3]?.title ?? ""}
            author={c.earlyFriends.books[3]?.author ?? ""}
            description={c.earlyFriends.books[3]?.description ?? ""}
            href={c.earlyFriends.books[3]?.href ?? ""}
          />
        </div>
        <div className="flex justify-end mt-8">
          <Button
            type="link"
            to={c.earlyFriends.button.href}
            color="primary"
            icon={ArrowRightIcon}
          >
            {c.earlyFriends.button.text}
          </Button>
        </div>
      </div>
      <div className="mt-8 -mx-6 xs:-mx-8 sm:mx-0 p-6 xs:p-8 md:p-12 bg-white rounded-3xl">
        <h2 className="text-2xl font-medium text-slate-900">
          {c.otherWritings.title}
        </h2>
        <div className="border-2 border-dashed p-20 rounded-2xl mt-4 border-sky-200 bg-sky-50/50 flex justify-center items-center text-3xl font-medium text-sky-800 text-center">
          <span>{c.otherWritings.description}</span>
        </div>
      </div>
    </div>
  );
};

export default BooksPageTemplate;

interface BookProps {
  title: string;
  author: string;
  description: string;
  href: string;
}

const Book: React.FC<BookProps> = ({ title, author, description, href }) => {
  return (
    <Link
      href={href}
      className="flex flex-col bg-sky-100/70 hover:bg-sky-100 active:bg-sky-200 active:scale-95 transition-[background-color,transform] duration-200 p-4 rounded-2xl md:max-w-[260px]"
    >
      <h3 className="text-xl font-medium leading-6 text-sky-900">{title}</h3>
      <span className="text-sky-800/70 font-medium">{author}</span>
      <p className="text-sm text-sky-900/60 mt-2">{description}</p>
    </Link>
  );
};

const content = {
  en: {
    title: "Recommended reading",
    description:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    earlyFriends: {
      title: "Early Friends' Writings",
      description:
        "Great stuff, really like them, etc. We have over 180 books available for free, but here are some I recommend starting with:",
      button: {
        text: "See 180+ more",
        href: "https://friendslibrary.com",
      },
      books: [
        {
          title: "Truth in the Inward Parts",
          author: "Compilation",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.friendslibrary.com/compilations/truth-in-the-inward-parts-v1",
        },
        {
          title: "The Writings of Isaac Penington",
          author: "Isaac Penington",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.friendslibrary.com/isaac-penington/writings-volume-1",
        },
        {
          title: "Walk in the Spirit",
          author: "Hugh Turford",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.friendslibrary.com/hugh-turford/walk-in-the-spirit",
        },
        {
          title: "No Cross, No Crown",
          author: "William Penn",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.friendslibrary.com/william-penn/no-cross-no-crown",
        },
      ],
    },
    otherWritings: {
      title: "Other writings",
      description: "Coming soon",
    },
  },
  es: {
    title: "Lectura recomendada",
    description:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    earlyFriends: {
      title: "Early Friends' Writings (spanish, todo)",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      button: {
        text: "Ver 50+ más",
        href: "https://bibliotecadelosamigos.org",
      },
      books: [
        {
          title: "La Verdad en Lo Íntimo",
          author: "Compilación",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.bibliotecadelosamigos.org/compilaciones/verdad-en-lo-intimo-v1",
        },
        {
          title: "Los Escritos de Isaac Penington",
          author: "Isaac Penington",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.bibliotecadelosamigos.org/isaac-penington/escritos-volumen-1",
        },
        {
          title: "Andad en el Espíritu",
          author: "Hugh Turford",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.bibliotecadelosamigos.org/hugh-turford/andar-en-el-espiritu",
        },
        {
          title: "No Cruz, No Corona",
          author: "William Penn",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
          href: "https://www.bibliotecadelosamigos.org/william-penn/no-cruz-no-corona",
        },
      ],
    },
    otherWritings: {
      title: "Otros escritos",
      description: "Próximamente",
    },
  },
};
