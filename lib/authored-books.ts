import type { StaticImageData } from "next/image";
import type { Language } from "./types";
import LivingUnderGraceCover from "@/public/books/living-under-grace/living-under-grace-cover.png";
import VivirBajoLaGraciaCover from "@/public/books/living-under-grace/vivir-bajo-la-gracia-cover.png";
import ThePowerOfTheGospelCover from "@/public/books/power-of-the-gospel/the-power-of-the-gospel-cover.png";
import ElPoderDelEvangelioCover from "@/public/books/power-of-the-gospel/el-poder-del-evangelio-cover.png";

export const authoredBookIds = [
  `living-under-grace`,
  `power-of-the-gospel`,
] as const;

export type AuthoredBookId = (typeof authoredBookIds)[number];

export interface AuthoredBookAudio {
  mp3Url: string;
  fileName: string;
  fileSize: number;
  duration: number;
}

export interface AuthoredBookTranslation {
  title: string;
  cover: StaticImageData;
  blurb: string;
  pdfHref: string;
  epubHref: string;
  printedHref: string;
  audio?: AuthoredBookAudio;
}

export interface AuthoredBook {
  id: AuthoredBookId;
  translations: Record<Language, AuthoredBookTranslation>;
}

export const authoredBooks: Record<AuthoredBookId, AuthoredBook> = {
  "living-under-grace": {
    id: `living-under-grace`,
    translations: {
      en: {
        title: `Living Under Grace`,
        cover: LivingUnderGraceCover,
        blurb:
          `When circumstances become painful, when sin has ruined lives, or when the world can offer no remedy for sickness, confusion, grief, and fear, many will descend for a time and dip a foot into the river of God’s grace. But as soon as they recover a little bit of strength, or find an outward plan that distracts from inward distress, they rise again above the place where grace is known. Then they speak of grace, sing of grace, and testify of having felt the power of God in the day of trial. Yet although many will praise the God who met them in that low place, few will continue to walk with Him there. Paul, however, was a man who lived under grace. He said, “By the grace of God I am what I am,” and he refused to be more. And because he was willing to be nothing, grace could be everything. Because he stayed low, grace was always above. Grace triumphed in Paul, and it will triumph in all who remain under its power.`,
        pdfHref: `/books/living-under-grace/living-under-grace.pdf`,
        epubHref: `/books/living-under-grace/living-under-grace.epub`,
        printedHref: `https://www.amazon.com/dp/1644763699`,
      },
      es: {
        title: `Vivir bajo la gracia`,
        cover: VivirBajoLaGraciaCover,
        blurb:
          `Cuando las circunstancias se vuelven dolorosas, cuando el pecado ha arruinado vidas, o cuando el mundo no puede ofrecer remedio para la enfermedad, la confusión, el dolor o el temor, muchos descienden por un tiempo y meten un pie en el río de la gracia de Dios. Pero tan pronto como recuperan un poco de fuerzas, o encuentran algún plan externo que los distraiga del sufrimiento interior, vuelven a levantarse por encima del lugar donde la gracia se experimenta. Hablan de la gracia, cantan acerca de la gracia y dan testimonio de haber sentido el poder de Dios en el día de la prueba. Sin embargo, aunque muchos alaban al Dios que los encontró en ese lugar bajo, pocos permanecen con Él allí. Pablo, en cambio, vivía bajo la gracia. Decía: “Por la gracia de Dios soy lo que soy”, y se negó a ser más. Porque estuvo dispuesto a no ser nada, la gracia pudo serlo todo. Porque permaneció abajo, la gracia siempre estuvo por encima. La gracia triunfó en Pablo, y triunfará también en todos los que permanezcan bajo su poder.`,
        pdfHref: `/books/living-under-grace/vivir-bajo-la-gracia.pdf`,
        epubHref: `/books/living-under-grace/vivir-bajo-la-gracia.epub`,
        printedHref: `/contacto`,
        audio: {
          mp3Url: `https://nyc3.digitaloceanspaces.com/hender-blog/audios/Vivir_bajo_gracia.mp3`,
          fileName: `vivir-bajo-la-gracia-audiolibro.mp3`,
          fileSize: 255260782,
          duration: 14088,
        },
      },
    },
  },
  "power-of-the-gospel": {
    id: `power-of-the-gospel`,
    translations: {
      en: {
        title: `The Power of the Gospel`,
        cover: ThePowerOfTheGospelCover,
        blurb:
          `The gospel is not words. It can be described by words, and declared with words. But the substance of the gospel is the power of Jesus Christ—a power that crucifies the flesh with its passions and desires, circumcises the heart, purifies the conscience, and changes the soul into a temple of God. Yet the first workings of this power are often felt in quiet convictions, small reproofs, and inward drawings that are easily overlooked or resisted. The Power of the Gospel invites the sincere seeker to recognize, receive, and obey these first and lowest manifestations of Christ’s inward appearing. Because it is only as His light is loved and followed that the gospel becomes, in true experience, “the power of God unto salvation.”`,
        pdfHref: `/books/power-of-the-gospel/the-power-of-the-gospel.pdf`,
        epubHref: `/books/power-of-the-gospel/the-power-of-the-gospel.epub`,
        printedHref: `https://www.amazon.com/dp/1644763648`,
        audio: {
          mp3Url: `https://nyc3.digitaloceanspaces.com/hender-blog/audios/Power_of_the_Gospel.mp3`,
          fileName: `the-power-of-the-gospel-audiobook.mp3`,
          fileSize: 96717018,
          duration: 5287,
        },
      },
      es: {
        title: `El poder del evangelio`,
        cover: ElPoderDelEvangelioCover,
        blurb:
          `El evangelio no son palabras. Puede ser descrito en palabras y declarado con palabras, pero la sustancia del evangelio es el poder de Jesucristo—un poder que crucifica la carne con sus pasiones y deseos, circuncida el corazón, purifica la conciencia y transforma el alma en templo de Dios. Sin embargo, las primeras manifestaciones de este poder suelen sentirse en silenciosas convicciones, pequeñas reprensiones e invitaciones interiores que fácilmente pasamos por alto o resistimos. El poder del evangelio invita al buscador sincero a reconocer, recibir y obedecer estas primeras y más pequeñas manifestaciones de la aparición interior de Cristo. Porque solo cuando Su luz es amada y seguida, el evangelio llega a ser, en la verdadera experiencia, “poder de Dios para salvación”.`,
        pdfHref: `/books/power-of-the-gospel/el-poder-del-evangelio.pdf`,
        epubHref: `/books/power-of-the-gospel/el-poder-del-evangelio.epub`,
        printedHref: `/contacto`,
        audio: {
          mp3Url: `https://nyc3.digitaloceanspaces.com/hender-blog/audios/El_poder_del_evangelio.mp3`,
          fileName: `el-poder-del-evangelio-audiolibro.mp3`,
          fileSize: 121288738,
          duration: 6651,
        },
      },
    },
  },
};

export const homeAuthoredBookOrder: readonly AuthoredBookId[] = [
  `living-under-grace`,
  `power-of-the-gospel`,
];

export const booksPageAuthoredBookOrder: readonly AuthoredBookId[] = [
  `power-of-the-gospel`,
  `living-under-grace`,
];
