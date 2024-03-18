import React from "react";
import type { Language } from "@/lib/types";

const AboutPageTemplate: React.FC<{ language: Language }> = ({ language }) => {
  const c = content[language];
  return (
    <div className="min-h-full px-0 md:px-12 xl:px-20 py-16 lg:py-12 lg+:py-20 flex justify-center">
      <div className="bg-white px-6 xs:px-8 sm:px-12 lg+:px-20 py-12 md:py-20 rounded-3xl flex flex-col max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-semibold">{c.heading}</h1>
        <p className="text-base sm:text-lg mt-8 text-slate-600 text-justify">
          {c.paragraph1}
        </p>
        <p className="text-base sm:text-lg mt-4 text-slate-600 text-justify">
          {c.paragraph2}
        </p>
        <p className="text-base sm:text-lg mt-4 text-slate-600 text-justify">
          {c.paragraph3}
        </p>
        <span className="text-base sm:text-lg font-medium text-slate-700 mt-8 self-end">
          {c.signature}
        </span>
      </div>
    </div>
  );
};

const content = {
  en: {
    heading: `About Jason Henderson`,
    paragraph1: `I don’t have much to say about myself. But I understand that some who come across this site may, for their own peace of mind, desire to know something about the author. To these then, let me say: I am a Christian, a sincere believer in Jesus Christ, and one who desires with all his heart to walk in the new and living way that He has opened for the redeemed. My honest desire and sole aspiration is to love the Lord my God with all of my heart, soul, mind and strength, to honor Him by the perfect surrender of my will, to fear Him as the Judge of all the living, to seek Him by an incessant prayer of the heart, to know Him by the revelation and formation of His life in me, to serve Him by the operation of His grace, and to please Him by offering Him the increase of His own heavenly seed.`,
    paragraph2: `I have no credentials, degrees, connections, prestige, endorsements, or success stories to offer for your consideration, and would never recommend my writings based upon such things. I can only say that, by the mercy of God, and in response to great anxiety and desperation, there was a day when I began to see past the shell of religion, into a measure of the living kernel, and to find and feel that all the religion in the world is like a fading leaf when it lacks the pure life and living power of God which saves from sin, transforms the soul, and brings into oneness with Him. This is all I want to share—my small measure of His light and life—for the encouragement and the fellowship of those who can feel something behind the words. I am not looking for “likes” or subscribers; I have no monetary motives, and have the greatest aversion to theological debates. My one objective and hope, is that by sharing these things, some of you may feel the stirring of Christ’s life in your hearts, the shining of His light upon the ancient Highway of Holiness, and find a willingness wrought in your hearts to follow Him more fully in the narrow (and increasingly unpopular) way of the cross.`,
    paragraph3: `I am married, have four children, and live in Ohio, USA, where I am very involved in a small local church.`,
    signature: `– Jason Henderson, August 2022`,
  },
  es: {
    heading: `Acerca de Jason Henderson`,
    paragraph1: `No tengo mucho que decir acerca de mí, pero comprendo que algunos de los que llegan a este sitio, para su propia tranquilidad, pueden desear conocer algo acerca del autor. A éstos entonces déjenme decirles: Soy un Cristiano, un sincero creyente en Jesucristo, que desea con todo su corazón caminar en el camino nuevo y vivo que Él ha abierto para los redimidos. Mi honesto deseo y única aspiración es amar al Señor mi Dios con todo mi corazón, alma, mente y fuerza; honrarlo mediante la perfecta entrega de mi voluntad, temerle como el Juez de todo los vivos, buscarlo por medio de una incesante oración del corazón, conocerlo por la revelación y formación de Su vida en mí, servirle a través de la operación de Su gracia y agradarlo ofreciéndole el incremento de Su propia semilla celestial.`,
    paragraph2: `No tengo credenciales, títulos, conexiones, prestigio, coberturas o historias de éxito que ofrecer para su consideración, y nunca recomendaría mis escritos basándome en tales cosas. Sólo puedo decir, que por la misericordia de Dios, y en respuesta a una gran ansiedad y desesperación, un día comencé a ver, más allá de la cáscara de la religión, una medida de la semilla viva, y encontré y sentí que toda la religión en el mundo es como una hoja que se marchita cuando carece de la vida pura y poder vivo de Dios que salva del pecado, transforma el alma y lleva a la unión con Él. Esto es todo lo que quiero compartir—mi pequeña medida de Su luz y vida—para el aliento y comunión de aquellos que pueden sentir algo detrás de las palabras. No estoy buscando que me den un “me gusta” o que se suscriban; no tengo motivos monetarios y les tengo una gran aversión a los debates teológicos. Mi único objetivo y esperanza es que al compartir estas cosas, algunos de ustedes experimenten el movimiento de la vida de Cristo en sus corazones, el resplandor de Su luz sobre el antiguo Camino de Santidad, y que encuentran una disposición forjada en sus corazones de seguirlo a Él más plenamente en el camino estrecho (y cada vez más impopular) de la cruz.`,
    paragraph3: `Estoy casado, tengo cuatro hijos y vivo en Ohio, Estados Unidos; donde estoy muy involucrado en una pequeña iglesia local.`,
    signature: `– Jason Henderson, agosto 2022`,
  },
};

export default AboutPageTemplate;
