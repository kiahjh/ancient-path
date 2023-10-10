import React from 'react';
import { BookOpenIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { SignalIcon } from '@heroicons/react/24/solid';

const OGImage: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-white to-slate-100 w-[1200px] h-[630px] border border-white relative overflow-hidden flex flex-col">
      <div className="w-128 h-128 bg-sky-300 dark:bg-sky-400 rounded-2xl absolute left-20 -bottom-80 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50"></div>
      <div className="w-96 h-96 bg-sky-500 rounded-2xl absolute -left-8 -bottom-64 rotate-45 bg-opacity-20 dark:bg-opacity-5 sm:dark:bg-opacity-10 sm:bg-opacity-50"></div>
      <h1 className="font-inter text-8xl p-16 relative leading-[105px]">
        <span className="text-slate-700">The</span>
        <br />
        <span className="text-sky-500">Ancient Path</span>
      </h1>
      <div className="flex flex-row items-center gap-6 py-4 px-4 bg-white/70 backdrop-blur-xl rounded-full absolute left-8 bottom-8 w-fit shadow border border-sky-200">
        <div className="flex justify-center items-center gap-2 bg-white/50 border border-sky-200 shadow-inner w-20 h-20 rounded-full">
          <BookOpenIcon className="h-12 text-sky-500" />
        </div>
        <div className="flex justify-center items-center gap-2 bg-white/50 border border-sky-200 shadow-inner w-20 h-20 rounded-full">
          <SpeakerWaveIcon className="h-12 text-sky-500" />
        </div>
        <div className="flex justify-center items-center gap-2 bg-white/50 border border-sky-200 shadow-inner w-20 h-20 rounded-full">
          <SignalIcon className="h-12 text-sky-500" />
        </div>
      </div>
      <span className="absolute bottom-12 right-12 text-5xl font-bold text-slate-700">
        Jason R. Henderson
      </span>
    </div>
  );
};

export default OGImage;
