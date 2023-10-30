"use client";

import React from "react";
import cx from "classnames";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useGlobalState } from "@/state/hooks";

interface Props {
  mp3Url: string;
  title: string;
}

const PostPageAudioPrompt: React.FC<Props> = ({ mp3Url, title }) => {
  const {
    state: { audio },
    dispatch,
  } = useGlobalState();
  const isPlaying = audio.isPlaying && audio.source === mp3Url;

  return (
    <div className="flex items-center gap-4 bg-sky-50 p-4 rounded-full">
      <button
        onClick={() => {
          if (audio.source !== mp3Url && audio.isPlaying) {
            dispatch({ type: `setCurrentTime`, time: 0 });
            dispatch({ type: `setAudio`, source: mp3Url, title });
          } else if (audio.source !== mp3Url && !audio.isPlaying) {
            dispatch({ type: `setCurrentTime`, time: 0 });
            dispatch({ type: `setAudio`, source: mp3Url, title });
            dispatch({ type: `toggleAudioPlaying` });
          } else {
            dispatch({ type: `toggleAudioPlaying` });
          }
        }}
        className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center"
      >
        {audio.isPlaying && audio.source === mp3Url ? (
          <PauseIcon className="w-6 text-white" />
        ) : (
          <PlayIcon className="w-6 text-white" />
        )}
      </button>
      <div className="flex-grow relative">
        <div
          className={cx(
            `absolute left-0 top-0 w-full h-full flex items-center justify-between transition-opacity duration-500`,
            !isPlaying && `opacity-0`,
          )}
        >
          {new Array(40).fill(0).map((_, i) => (
            <div
              key={i}
              className={cx(`w-2 bg-sky-200 rounded-full`)}
              style={{
                animation: `audio-playing 1.5s ${
                  i * 150
                }ms ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <span
          className={cx(
            `relative text-2xl font-medium text-slate-600 transition-[opacity,transform] duration-500 block`,
            isPlaying && `translate-y-4 opacity-0 pointer-events-none`,
          )}
        >
          Listen online
        </span>
      </div>
    </div>
  );
};

export default PostPageAudioPrompt;
