import React from "react";
import type { Language } from "@/lib/types";
import MeetingAudio from "../MeetingAudio";
import { getAllMeetingAudios } from "@/lib/get-data";

const MeetingAudiosPageTemplate: React.FC<{ language: Language }> = async ({
  language,
}) => {
  const audios = (await getAllMeetingAudios()).filter(
    (audio) => audio.language === language,
  );
  const c = content[language];

  return (
    <div className="py-20 px-6 sm:px-8 md:px-12 xl:px-20">
      <h1 className="text-4xl font-bold text-slate-900">{c.title}</h1>
      <p className="text-lg text-sky-900/80 mt-2">{c.description}</p>
      <main className="mt-8 flex flex-col gap-8 -mx-6 sm:mx-0">
        {audios.length > 0 ? (
          audios.map((audio) => <MeetingAudio audio={audio} key={audio.id} />)
        ) : (
          <div className="bg-sky-100 border-2 border-sky-500 border-dashed rounded-3xl p-12 flex justify-center items-center">
            <h2 className="text-3xl font-bold text-sky-900">{c.comingSoon}</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingAudiosPageTemplate;

const content = {
  en: {
    title: `Meeting audios`,
    description: `Below are audio recordings of live meetings from various settings.`,
    comingSoon: `Coming soon!`,
  },
  es: {
    title: `Audios de reuniones`,
    description: `A continuación se encuentran grabaciones de audio de reuniones en vivo de diversos entornos.`,
    comingSoon: `¡Próximamente!`,
  },
};
