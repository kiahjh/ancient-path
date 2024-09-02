import {
  ArrowRightIcon,
  AudioLinesIcon,
  BabyIcon,
  BookOpenIcon,
  FileTextIcon,
  SmartphoneIcon,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import cx from "classnames";
import type { Language } from "@/lib/types";
import Button from "../Button";
import EnCoverImage from "@/public/that-they-might-know-him.jpg";
import EsCoverImage from "@/public/que-le-conozcan-a-el.jpg";

const ParentingPageTemplate: React.FC<{ language: Language }> = ({
  language,
}) => {
  const c = content[language];
  return (
    <div className="flex flex-col px-6 xs:px-8 md:px-12 xl:px-20 py-20">
      <div className="h-12 w-12 bg-sky-200 rounded-full items-center justify-center flex text-sky-600">
        <BabyIcon size={24} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mt-6">{c.title}</h1>
      <p className="mt-4 text-xl text-sky-900/60 max-w-2xl">{c.description}</p>
      <div className="bg-white rounded-3xl p-6 xs:p-8 sm:p-12 mt-12 overflow-hidden relative -mx-6 xs:mx-0">
        <Image
          src={EnCoverImage}
          alt=""
          className="absolute right-0 -top-[275px] w-[600px] [transform:rotateY(180deg)] hidden sm:block"
        />
        <div className="absolute right-0 top-0 h-full w-[600px] bg-gradient-to-r from-white via-white/90 to-white/50" />
        <div className="relative flex flex-col md:flex-row">
          <Image
            src={language === `en` ? EnCoverImage : EsCoverImage}
            alt=""
            className="h-32 md:h-52 w-fit shadow-lg shadow-slate-400/40 border border-slate-300 md:mr-12 rounded-md mb-8 md:mb-0"
          />
          <div>
            <h2 className="font-semibold text-2xl xs:text-3xl">
              {c.thatTheyMightKnowHim.title}
            </h2>
            <h3 className="text-sky-800/70 mt-1">
              {c.thatTheyMightKnowHim.authors}
            </h3>
            <p className="max-w-xl mt-4 text-sky-900/90 xs:text-lg">
              {c.thatTheyMightKnowHim.description}
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              <Button
                type="link"
                to={c.thatTheyMightKnowHim.buttons.paperback.link}
                color="secondary"
                icon={BookOpenIcon}
                iconOnLeft
              >
                {c.thatTheyMightKnowHim.buttons.paperback.text}
              </Button>
              <Button
                type="link"
                to={c.thatTheyMightKnowHim.buttons.audiobook.link}
                color="secondary"
                icon={AudioLinesIcon}
                iconOnLeft
              >
                {c.thatTheyMightKnowHim.buttons.audiobook.text}
              </Button>
              <Button
                type="link"
                to={c.thatTheyMightKnowHim.buttons.pdf.link}
                color="secondary"
                icon={FileTextIcon}
                iconOnLeft
              >
                {c.thatTheyMightKnowHim.buttons.pdf.text}
              </Button>
              <Button
                type="link"
                to={c.thatTheyMightKnowHim.buttons.epub.link}
                color="secondary"
                icon={SmartphoneIcon}
                iconOnLeft
              >
                {c.thatTheyMightKnowHim.buttons.epub.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 xs:p-8 sm:p-12 mt-8 -mx-6 xs:mx-0">
        <h2 className="text-2xl xs:text-3xl font-semibold">
          {c.internetSafetyResources.title}
        </h2>
        <p className="mt-4 text-sky-900/90 xs:text-lg">
          {c.internetSafetyResources.p1}
        </p>
        {language === `en` && (
          <div className="flex justify-center sm:bg-slate-100 mt-8 sm:p-8 rounded-3xl">
            <iframe
              src="https://www.youtube.com/embed/syC94X5LBIc"
              className="h-[300px] xs:h-[400px] w-[710px] sm:rounded-2xl -mx-6 xs:-mx-8 sm:mx-0"
            />
          </div>
        )}
        <p
          className={cx(
            `text-sky-900/90 xs:text-lg`,
            language === `en` ? `mt-8` : `mt-4`,
          )}
        >
          {c.internetSafetyResources.p2}
        </p>
        <div className="flex justify-end mt-6">
          <Button
            type="link"
            to="https://gertrude.app"
            color="secondary"
            icon={ArrowRightIcon}
          >
            {c.internetSafetyResources.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParentingPageTemplate;

const content = {
  en: {
    title: `Parenting`,
    description: `Below are some highly recommended resources for parents who sincerely desire to “bring up their children in the nurture and admonition of the Lord,” and avoid the snares and pitfalls that are particular to the age we live in.`,
    thatTheyMightKnowHim: {
      title: `That they might know Him`,
      authors: `Jessie Henderson and Keren Alvarado Fernández`,
      description: `Written by my wife Jessie and our dear friend Keren Alvarado Fernández from Costa Rica, this book helps parents understand what it means to create a home environment where God is at liberty to teach, correct, change, and form His own life in the hearts of our sons and daughters.`,
      buttons: {
        paperback: {
          text: `Paperback`,
          link: `https://www.amazon.com/dp/B0DFP6RFPB`,
        },
        audiobook: {
          text: `Audiobook`,
          link: `https://cdn.cosmicjs.com/a91a2110-6965-11ef-b5ae-a594bb4a8e67-ttmkh-en.mp3`,
        },
        pdf: {
          text: `PDF`,
          link: `/ttmkh/ttmkh-en.pdf`,
        },
        epub: {
          text: `EPUB`,
          link: `/ttmkh/ttmkh-en.epub`,
        },
      },
    },
    internetSafetyResources: {
      title: `Internet safety resources`,
      p1: `My sincere conviction is that giving our children regular and unguarded access to the internet is the greatest mistake that parents are making in our generation. Below is a helpful and hopeful talk that my brother Jared gave on this subject in May of 2024:`,
      p2: `My brother has also spent years creating what I believe to be the best parental control software in existence for Apple computers. I spent years trying out different programs for my four kids (on both Macs and PCs) and never found anything that made me feel peaceful and secure about my kids’ online activities until I started using the app Gertrude.`,
      buttonText: `More about Gertrude`,
    },
  },
  es: {
    title: `Crianza`,
    description: `A continuación se presentan algunos recursos muy recomendables para los padres que desean sinceramente “criar a sus hijos en disciplina y amonestación del Señor”, y evitar las trampas y peligros propios de la época en que vivimos.`,
    thatTheyMightKnowHim: {
      title: `Que le conozcan a Él`,
      authors: `Keren Alvarado Fernández y Jessie Henderson`,
      description: `Escrito por mi esposa Jessie y nuestra querida amiga Keren Alvarado Fernández de Costa Rica, este libro ayuda a los padres a entender lo que significa crear un ambiente en el hogar donde Dios tiene la libertad de enseñar, corregir, cambiar y formar Su propia vida en los corazones de nuestros hijos e hijas.`,
      buttons: {
        paperback: {
          text: `Libro impreso`,
          link: `https://www.amazon.com/Que-conozcan-%25C3%2589l-pr%25C3%25A1cticos-cristianos/dp/B0DDSVSCM2`,
        },
        audiobook: {
          text: `Audiolibro`,
          link: `https://cdn.cosmicjs.com/ac97fd30-6965-11ef-b5ae-a594bb4a8e67-ttmkh-es.mp3`,
        },
        pdf: {
          text: `PDF`,
          link: `/ttmkh/ttmkh-es.pdf`,
        },
        epub: {
          text: `EPUB`,
          link: `/ttmkh/ttmkh-es.epub`,
        },
      },
    },
    internetSafetyResources: {
      title: `Recursos de seguridad en internet`,
      p1: `Mi sincera convicción es, que permitir a nuestros hijos el acceso regular y sin vigilancia a Internet es el mayor error que los padres están cometiendo en nuestra generación. Mi hermano ha pasado años creando lo que creo que es el mejor software de control parental que existe para las computadoras Apple. Pasé años probando diferentes programas para mis cuatro hijos (tanto en Mac como en PC) y nunca encontré nada que me hiciera sentir tranquilo y seguro en cuanto a las actividades en línea de mis hijos hasta que empecé a usar la aplicación Gertrude.`,
      p2: ``,
      buttonText: `Más sobre Gertrude`,
    },
  },
};
