import React from "react";
import type { NextPage } from "next";
import { getAllMeetingAudios } from "@/lib/get-data";
import MeetingAudio from "@/components/MeetingAudio";

export const revalidate = 0;

export const metadata = {
  title: `Meetings | The Ancient Path`,
  description: `Audio recordings from some meetings.`,
  openGraph: {
    title: `Meetings | The Ancient Path`,
    description: `Audio recordings from some meetings.`,
  },
};

const Meetings: NextPage = async () => {
  const audios = await getAllMeetingAudios();

  return (
    <div className="p-20">
      <h1 className="text-4xl font-bold text-slate-900">Meeting audios</h1>
      <p className="text-lg text-sky-900/80 mt-2">
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </p>
      <main className="mt-8 flex flex-col gap-8">
        {audios.map((audio) => (
          <MeetingAudio audio={audio} key={audio.id} />
        ))}
      </main>
    </div>
  );
};

export default Meetings;
