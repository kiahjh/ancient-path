"use client";

import React from "react";
import cx from "classnames";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useGlobalState } from "@/lib/hooks";

interface Props {
  mp3Url: string;
  title: string;
  slug: string;
  type: "post" | "teaching";
}

const PostPageAudioPrompt: React.FC<Props> = ({
  mp3Url,
  title,
  slug,
  type,
}) => {
  const {
    state: { audio, language },
    dispatch,
  } = useGlobalState();
  const isPlaying = audio.isPlaying && audio.source === mp3Url;

  return (
    <div className="flex items-center gap-3 xs:gap-4 bg-sky-50 p-2.5 xs:p-4 pr-4 rounded-full">
      <button
        onClick={() => {
          if (audio.source !== mp3Url && audio.isPlaying) {
            dispatch({ type: `setCurrentTime`, time: 0 });
            dispatch({
              type: `setAudio`,
              source: mp3Url,
              title,
              slug,
              postType: type,
            });
          } else if (audio.source !== mp3Url && !audio.isPlaying) {
            dispatch({ type: `setCurrentTime`, time: 0 });
            dispatch({
              type: `setAudio`,
              source: mp3Url,
              title,
              slug,
              postType: type,
            });
            dispatch({ type: `toggleAudioPlaying` });
          } else {
            dispatch({ type: `toggleAudioPlaying` });
          }
        }}
        className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center shrink-0"
      >
        {audio.isPlaying && audio.source === mp3Url ? (
          <PauseIcon fill="white" className="w-6 text-white" />
        ) : (
          <PlayIcon fill="white" className="w-6 text-white" />
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
              className={cx(`w-1 sm:w-1.5 lg:w-2 bg-sky-200 rounded-full`)}
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
            `relative text-xl xs:text-2xl font-medium text-slate-600 transition-[opacity,transform] duration-500 block`,
            isPlaying && `translate-y-4 opacity-0 pointer-events-none`,
          )}
        >
          {language === `en` ? `Listen online` : `Escuchar en línea`}
        </span>
      </div>
    </div>
  );
};

export default PostPageAudioPrompt;
