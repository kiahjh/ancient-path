import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import AudioPlayer from "./AudioPlayer";
import { useGlobalState } from "@/state/hooks";

const BottomBar: React.FC = () => {
  const { dispatch, state } = useGlobalState();
  return (
    <div className="h-24 flex items-center pr-8">
      <div className="h-full w-72 flex items-center justify-center gap-4">
        <button className="w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform] duration-200 active:bg-sky-300/70 active:scale-95">
          <BackwardIcon className="w-8 ml-0.5 text-sky-500" />
        </button>
        <button
          onClick={() =>
            dispatch({
              type: `toggleAudioPlaying`,
            })
          }
          className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center"
        >
          {state.audio.isPlaying ? (
            <PauseIcon className="w-6 text-white" />
          ) : (
            <PlayIcon className="w-6 text-white" />
          )}
        </button>
        <button className="w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform] duration-200 active:bg-sky-300/70 active:scale-95">
          <ForwardIcon className="w-8 ml-0.5 text-sky-500" />
        </button>
      </div>
      <div className="flex-grow flex items-center h-full">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default BottomBar;
