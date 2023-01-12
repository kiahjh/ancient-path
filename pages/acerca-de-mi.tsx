import Image from 'next/image';
import React from 'react';
import Chrome from '../components/Chrome';

interface Props {}

const AcercaDeMi: React.FC<Props> = ({}) => {
  return (
    <Chrome page="/acerca-de-mi" smallFooter>
      <section className="flex justify-center items-center py-8 px-3 sm:px-8 relative">
        <div className="absolute w-full h-112 bg-sky-100 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 z-0"></div>
        <div className="py-10 px-6 sm:px-10 border-[0.5px] shadow-xl rounded-2xl relative bg-white max-w-4xl">
          <h1 className="text-3xl font-inter text-opacity-70 text-center mb-8">
            Acerca de mí
          </h1>
          <Image
            src="/profile.jpg"
            alt="photo of Jason Henderson"
            width={288}
            height={288}
            className="rounded-3xl hidden sm:block w-52 md:w-72 float-left mr-6 mb-4 shadow-xl"
          />
          <p className="mt-5 text-lg text-black text-opacity-60 text-justify">
            No tengo mucho que decir acerca de mí, pero comprendo que algunos de los que
            llegan a este sitio, para su propia tranquilidad, pueden desear conocer algo
            acerca del autor. A éstos entonces déjenme decirles: Soy un Cristiano, un
            sincero creyente en Jesucristo, que desea con todo su corazón caminar en el
            camino nuevo y vivo que Él ha abierto para los redimidos. Mi honesto deseo y
            única aspiración es amar al Señor mi Dios con todo mi corazón, alma, mente y
            fuerza; honrarlo mediante la perfecta entrega de mi voluntad, temerle como el
            Juez de todo los vivos, buscarlo por medio de una incesante oración del
            corazón, conocerlo por la revelación y formación de Su vida en mí, servirle a
            través de la operación de Su gracia y agradarlo ofreciéndole el incremento de
            Su propia semilla celestial.
          </p>
          <p className="mt-5 text-lg text-black text-opacity-60 text-justify">
            No tengo credenciales, títulos, conexiones, prestigio, coberturas o historias
            de éxito que ofrecer para su consideración, y nunca recomendaría mis escritos
            basándome en tales cosas. Sólo puedo decir, que por la misericordia de Dios, y
            en respuesta a una gran ansiedad y desesperación, un día comencé a ver, más
            allá de la cáscara de la religión, una medida de la semilla viva, y encontré y
            sentí que toda la religión en el mundo es como una hoja que se marchita cuando
            carece de la vida pura y poder vivo de Dios que salva del pecado, transforma
            el alma y lleva a la unión con Él. Esto es todo lo que quiero compartir—mi
            pequeña medida de Su luz y vida—para el aliento y comunión de aquellos que
            pueden sentir algo detrás de las palabras. No estoy buscando que me den un “me
            gusta” o que se suscriban; no tengo motivos monetarios y les tengo una gran
            aversión a los debates teológicos. Mi único objetivo y esperanza es que al
            compartir estas cosas, algunos de ustedes experimenten el movimiento de la
            vida de Cristo en sus corazones, el resplandor de Su luz sobre el antiguo
            Camino de Santidad, y que encuentran una disposición forjada en sus corazones
            de seguirlo a Él más plenamente en el camino estrecho (y cada vez más
            impopular) de la cruz.
          </p>
          <p className="mt-5 text-lg text-black text-opacity-60 text-justify">
            Estoy casado, tengo cuatro hijos y vivo en Ohio, Estados Unidos; donde estoy
            muy involucrado en una pequeña iglesia local.
          </p>
          <p className="mt-5 text-lg italic text-right font-medium text-black/80">
            &ndash; Jason Henderson, agosto 2022
          </p>
        </div>
      </section>
    </Chrome>
  );
};

export default AcercaDeMi;
