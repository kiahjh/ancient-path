import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import cx from "classnames";
import AudioPlayer from "./AudioPlayer";
import { useGlobalState } from "@/state/hooks";

const BottomBar: React.FC = () => {
  const { dispatch, state } = useGlobalState();
  return (
    <div className="h-24 flex items-center pr-8">
      <div className="h-full w-72 flex items-center justify-center gap-4">
        <button
          className={cx(
            `w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform,opacity] duration-200 active:bg-sky-300/70 active:scale-95`,
            !state.audio.source &&
              `opacity-40 cursor-not-allowed pointer-events-none`,
          )}
        >
          <BackwardIcon className="w-8 ml-0.5 text-sky-500" />
        </button>
        <button
          onClick={() =>
            dispatch({
              type: `toggleAudioPlaying`,
            })
          }
          className={cx(
            `w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform,opacity] duration-200 flex justify-center items-center`,
            !state.audio.source &&
              `opacity-40 cursor-not-allowed pointer-events-none`,
          )}
        >
          {state.audio.isPlaying ? (
            <PauseIcon className="w-6 text-white" />
          ) : (
            <PlayIcon className="w-6 text-white" />
          )}
        </button>
        <button
          className={cx(
            `w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform,opacity] duration-200 active:bg-sky-300/70 active:scale-95`,
            !state.audio.source &&
              `opacity-40 cursor-not-allowed pointer-events-none`,
          )}
        >
          <ForwardIcon className="w-8 ml-0.5 text-sky-500" />
        </button>
      </div>
      <div className="flex-grow h-full flex flex-col justify-center py-4">
        <span
          className={cx(
            `transition-[height,opacity] duration-700 text-xl font-medium text-sky-900`,
            state.audio.title ? `h-4 opacity-100` : `h-0 opacity-0`,
            !state.audio.isPlaying && state.audio.title && `!opacity-50`,
          )}
        >
          {state.audio.title}
        </span>
        <AudioPlayer
          className={cx(
            state.audio.title && `translate-y-2`,
            !state.audio.source && `opacity-40`,
            `transition-[transform,opacity] duration-700`,
          )}
        />
      </div>
    </div>
  );
};

export default BottomBar;
