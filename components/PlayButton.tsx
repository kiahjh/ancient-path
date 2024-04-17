"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import React from "react";

interface Props {
  playing: boolean;
  onClick: () => void;
}

const PlayButton: React.FC<Props> = ({ playing, onClick }) => (
  <button
    onClick={onClick}
    className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center shrink-0"
  >
    {playing ? (
      <PauseIcon fill="white" className="w-6 text-white" />
    ) : (
      <PlayIcon fill="white" className="w-6 text-white" />
    )}
  </button>
);

export default PlayButton;
