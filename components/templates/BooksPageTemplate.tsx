import { Language } from "@/lib/types";
import {
  ArrowRightIcon,
  BookIcon,
  BookOpenIcon,
  FileTextIcon,
  SmartphoneIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../Button";
import SpanishTersteegenCover from "@/public/vida-de-tersteegen/vida-de-tersteegen-cover.png";
import EnglishTersteegenCover from "@/public/life-of-tersteegen/life-of-tersteegen-cover.jpg";

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
        <p className="text-slate-500 text-lg mt-1">
          {c.otherWritings.description}
        </p>
        {language === "en" ? (
          <div className="rounded-3xl p-6 xs:p-8 sm:p-12 mt-12 overflow-hidden relative -mx-6 xs:mx-0 bg-sky-50">
            <div className="relative flex flex-col xl:flex-row">
              <Image
                src={EnglishTersteegenCover}
                alt=""
                className="h-32 xl:h-52 w-fit shadow-lg shadow-slate-400/40 border border-slate-300 xl:mr-12 rounded-xl mb-8 xl:mb-0"
              />
              <div>
                <h2 className="font-semibold text-2xl xs:text-3xl">
                  The Life of Gerhard Tersteegen
                </h2>
                <p className="mt-4 text-sky-900/90 xs:text-lg">
                  <b>Gerhard Tersteegen (1697-1769)</b> was a German author,
                  preacher, and hymn writer whose life and works left a powerful
                  testimony to the reality of inward, spiritual, and substantial
                  Christianity. Tersteegen never affiliated with any particular
                  Christian group or denomination, nor did he ever seek an
                  audience, but he was sought out by thousands of hungry souls
                  who came from far and wide to hear him speak about the “the
                  sure, essential, and precious truths of internal religion.”
                  His sermons, letters and writings are filled with experiential
                  truths concerning subjects like the narrow way of inward
                  prayer and self-denial, the work of Christ’s light and grace
                  in the heart, the necessity of complete resignation to the
                  will of God, and the mystery of the inward and outward cross.
                  <br />
                  <br />
                  Download an EPUB or PDF file, or contact me to request a
                  printed book.
                </p>
                <div className="mt-6 flex gap-2 flex-wrap">
                  <Button
                    type="link"
                    to="/contact"
                    color="secondary"
                    icon={BookOpenIcon}
                    iconOnLeft
                  >
                    Paperback
                  </Button>
                  <Button
                    type="link"
                    to="/life-of-tersteegen/life-of-tersteegen.pdf"
                    color="secondary"
                    icon={FileTextIcon}
                    iconOnLeft
                  >
                    PDF
                  </Button>
                  <Button
                    type="link"
                    to="/life-of-tersteegen/life-of-tersteegen.epub"
                    color="secondary"
                    icon={SmartphoneIcon}
                    iconOnLeft
                  >
                    EPUB
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl p-6 xs:p-8 sm:p-12 mt-12 overflow-hidden relative -mx-6 xs:mx-0 bg-sky-50">
            <div className="relative flex flex-col xl:flex-row">
              <Image
                src={SpanishTersteegenCover}
                alt=""
                className="h-32 xl:h-52 w-fit shadow-lg shadow-slate-400/40 border border-slate-300 xl:mr-12 rounded-xl mb-8 xl:mb-0"
              />
              <div>
                <h2 className="font-semibold text-2xl xs:text-3xl">
                  La Vida de Gerhard Tersteegen
                </h2>
                <p className="mt-4 text-sky-900/90 xs:text-lg">
                  <b>Gerhard Tersteegen (1697–1769)</b> fue un autor, predicador
                  y escritor de himnos alemán, cuya vida y obras dejaron un
                  poderoso testimonio de la realidad de un cristianismo interno,
                  espiritual y sustancial. Tersteegen nunca se afilió a ningún
                  grupo o denominación cristiana en particular, ni tampoco buscó
                  atraer audiencia alguna; sin embargo, miles de almas sedientas
                  lo buscaban desde lugares lejanos para oírlo hablar sobre “las
                  verdades seguras, esenciales y preciosas de la religión
                  interna”. Sus sermones, cartas y escritos están llenos de
                  realidades aprendidas por experiencia, sobre temas como el
                  camino estrecho de la oración interior y la negación al yo, la
                  obra de la luz y la gracia de Cristo en el corazón, la
                  necesidad de una completa entrega a la voluntad de Dios, y el
                  misterio de la cruz interna y externa.
                  <br />
                  <br />
                  Descarga un archivo EPUB o PDF, o contáctame para solicitar un
                  libro impreso.
                </p>
                <div className="mt-6 flex gap-2 flex-wrap">
                  <Button
                    type="link"
                    to="/contacto"
                    color="secondary"
                    icon={BookOpenIcon}
                    iconOnLeft
                  >
                    Libro impreso
                  </Button>
                  <Button
                    type="link"
                    to="/vida-de-tersteegen/vida-de-tersteegen.pdf"
                    color="secondary"
                    icon={FileTextIcon}
                    iconOnLeft
                  >
                    PDF
                  </Button>
                  <Button
                    type="link"
                    to="/vida-de-tersteegen/vida-de-tersteegen.epub"
                    color="secondary"
                    icon={SmartphoneIcon}
                    iconOnLeft
                  >
                    EPUB
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
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
      "Below are some of the books that have had the greatest impact on my life and my knowledge of Jesus Christ.",
    earlyFriends: {
      title: "Writings of the Early Society of Friends",
      description:
        "I sincerely believe that there is no other collection of Christian writings that more accurately communicates and powerfully illustrates the soul-transforming power of the gospel of Jesus Christ. Here are a few that I recommend starting with:",
      button: {
        text: "See 180+ more",
        href: "https://friendslibrary.com",
      },
      books: [
        {
          title: "Truth in the Inward Parts",
          author: "Compilation",
          description:
            "Incredible stories of ten men and women who knew the transforming work of “Truth in the inward parts.”",
          href: "https://www.friendslibrary.com/compilations/truth-in-the-inward-parts-v1",
        },
        {
          title: "The Writings of Isaac Penington",
          author: "Isaac Penington",
          description:
            "Some of the most deeply reaching and truly helpful writings that have ever been penned by a follower of Jesus Christ.",
          href: "https://www.friendslibrary.com/isaac-penington/writings-volume-1",
        },
        {
          title: "Walk in the Spirit",
          author: "Hugh Turford",
          description:
            "A practical explanation of Galatians 5:16 — “Walk in the Spirit, and you shall not fulfill the lust of the flesh.”",
          href: "https://www.friendslibrary.com/hugh-turford/walk-in-the-spirit",
        },
        {
          title: "No Cross, No Crown",
          author: "William Penn",
          description:
            "A Christian classic, describing the nature, power, and experience of the daily cross of Christ, explaining what it is, where and how it is carried.",
          href: "https://www.friendslibrary.com/william-penn/no-cross-no-crown",
        },
      ],
    },
    otherWritings: {
      title: "Other writings",
      description:
        "Below are other exceptional books or selections from books that were written by authors of other Christian denominations.",
      comingSoon: "Coming soon",
    },
  },
  es: {
    title: "Lectura recomendada",
    description:
      "A continuación figuran algunos de los libros que más han influido en mi vida y en mi conocimiento de Jesucristo.",
    earlyFriends: {
      title: "Escritos de la primitiva Sociedad de los Amigos",
      description:
        "Creo sinceramente que no hay otra colección de escritos cristianos que comunique con mayor precisión, o que ilustre con más pureza, el poder del evangelio de Jesucristo que transforma el alma. Recomiendo empezar por los siguientes.",
      button: {
        text: "Ver 50+ más",
        href: "https://bibliotecadelosamigos.org",
      },
      books: [
        {
          title: "La Verdad en Lo Íntimo",
          author: "Compilación",
          description:
            "Historias increíbles de diez hombres y mujeres que conocieron la obra transformadora de “la Verdad en lo íntimo”.",
          href: "https://www.bibliotecadelosamigos.org/compilaciones/verdad-en-lo-intimo-v1",
        },
        {
          title: "Los Escritos de Isaac Penington",
          author: "Isaac Penington",
          description:
            "Algunos de los escritos más profundos y verdaderamente útiles que jamás hayan sido escritos por un seguidor de Jesucristo.",
          href: "https://www.bibliotecadelosamigos.org/isaac-penington/escritos-volumen-1",
        },
        {
          title: "Andad en el Espíritu",
          author: "Hugh Turford",
          description:
            "Una explicación muy práctica de Gálatas 5:16 — “Andad por el Espíritu, y no cumpliréis el deseo de la carne.”",
          href: "https://www.bibliotecadelosamigos.org/hugh-turford/andar-en-el-espiritu",
        },
        {
          title: "No Cruz, No Corona",
          author: "William Penn",
          description:
            "Un clásico cristiano, que describe la naturaleza, el poder y la experiencia de la cruz diaria de Cristo, explicando qué es, y dónde y cómo tomarla.",
          href: "https://www.bibliotecadelosamigos.org/william-penn/no-cruz-no-corona",
        },
      ],
    },
    otherWritings: {
      title: "Otros escritos",
      description:
        "A continuación ofrezco otros libros o selecciones de libros extraordinarios que fueron escritos por autores de otras denominaciones cristianas.",
      comingSoon: "Próximamente",
    },
  },
};
