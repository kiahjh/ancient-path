import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import cx from "classnames";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { useGlobalState } from "@/lib/hooks";

const BottomBar: React.FC = () => {
  const { dispatch, state } = useGlobalState();
  let audioLink = ``;
  if (state.audio.postType === `post` && state.language === `en`)
    audioLink = `/posts/${state.audio.slug}`;
  else if (state.audio.postType === `post` && state.language === `es`)
    audioLink = `/publicaciones/${state.audio.slug}`;
  else if (state.audio.postType === `teaching` && state.language === `en`)
    audioLink = `/teachings/${state.audio.slug}`;
  else if (state.audio.postType === `teaching` && state.language === `es`)
    audioLink = `/ensenanzas/${state.audio.slug}`;

  return (
    <div className="h-24 flex flex-col sm:flex-row items-center sm:pr-8">
      <div className="h-full sm:w-72 flex items-center justify-center gap-4 translate-y-3 sm:translate-y-0 z-10 sm:shrink-0">
        <button
          className={cx(
            `w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform,opacity] duration-200 active:bg-sky-300/70 active:scale-95`,
            !state.audio.source &&
              `opacity-40 cursor-not-allowed pointer-events-none`,
          )}
        >
          <BackwardIcon className="w-7 sm:w-8 ml-0.5 text-sky-500" />
        </button>
        <button
          onClick={() =>
            dispatch({
              type: `toggleAudioPlaying`,
            })
          }
          className={cx(
            `w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform,opacity] duration-200 flex justify-center items-center`,
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
          <ForwardIcon className="w-7 sm:w-8 ml-0.5 text-sky-500" />
        </button>
      </div>
      <div className="flex-grow h-full flex flex-col justify-center sm:py-4 self-stretch px-4 sm:px-0">
        <div
          className={cx(
            `transition-[height,opacity] duration-700 text-xl font-medium hover:underline hidden sm:block whitespace-nowrap overflow-hidden bg-gradient-to-r from-sky-900 to-transparent via-sky-900 bg-clip-text max-w-full relative`,
            state.audio.title ? `h-7 opacity-100` : `h-0 opacity-0`,
            !state.audio.isPlaying && state.audio.title && `!opacity-50`,
          )}
        >
          <Link href={audioLink} className="absolute left-0 top-0 text-sky-900">
            {state.audio.title}
          </Link>
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-sky-100 pointer-events-none" />
        </div>
        <AudioPlayer
          className={cx(
            state.audio.title && `sm:translate-y-1`,
            !state.audio.source && `opacity-40`,
            `transition-[transform,opacity] duration-700`,
          )}
        />
      </div>
    </div>
  );
};

export default BottomBar;
