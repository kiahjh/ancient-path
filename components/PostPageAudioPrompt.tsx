"use client";

import React, { useState } from "react";
import cx from "classnames";
import { DownloadIcon, Loader2Icon, PauseIcon, PlayIcon } from "lucide-react";
import { useGlobalState } from "@/lib/hooks";

const PostPageAudioPrompt: React.FC = () => {
  const {
    state: { audio, language, cachedPost },
    dispatch,
  } = useGlobalState();
  const [downloading, setDownloading] = useState(false);

  if (!cachedPost) {
    return (
      <div className="h-20 bg-sky-50 rounded-full flex justify-start items-center animate-pulse pl-6">
        <Loader2Icon className="animate-spin text-sky-400" size={30} />
        <span className="ml-6 text-xl text-sky-600 font-medium">
          Loading audio...
        </span>
      </div>
    );
  }

  const currentlyPlayingMp3 =
    audio?.type === `post` ? audio.post[language].mp3Url : null;
  const thisMp3Url = cachedPost[language].mp3Url;
  const isPlaying = audio?.isPlaying && currentlyPlayingMp3 === thisMp3Url;

  return (
    <div className="flex items-center gap-3 xs:gap-4 bg-sky-50 p-2.5 xs:p-4 rounded-full">
      <button
        onClick={() => {
          if (currentlyPlayingMp3 !== thisMp3Url) {
            console.log(`new audio`);
            dispatch({
              type: `playButtonClicked`,
              audio: {
                isPlaying: true,
                currentTime: 0,
                post: cachedPost,
                type: `post`,
              },
              from: {
                component: `PostPageAudioPrompt`,
                context: `play button onClick()`,
              },
            });
          } else {
            console.log(`same audio`);
            dispatch({
              type: `playButtonClicked`,
              from: {
                component: `PostPageAudioPrompt`,
                context: `play button onClick()`,
              },
            });
          }
        }}
        className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center shrink-0"
      >
        {audio?.isPlaying && currentlyPlayingMp3 === thisMp3Url ? (
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
          {new Array(36).fill(0).map((_, i) => (
            <div
              key={i}
              className={cx(
                `w-[3px] xs:w-1 sm:w-1.5 lg:w-2 bg-sky-200 rounded-full`,
              )}
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
            `relative text-xl xs:text-2xl font-medium text-sky-900/90 transition-[opacity,transform] duration-500 block`,
            isPlaying && `translate-y-4 opacity-0 pointer-events-none`,
          )}
        >
          {language === `en` ? `Listen online` : `Escuchar en línea`}
        </span>
      </div>
      <button
        onClick={async () => {
          setDownloading(true);
          const res = await fetch(
            `/api/download-audio/${encodeURIComponent(thisMp3Url)}`,
          );
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement(`a`);
          link.href = url;
          link.download = `${cachedPost[language].title}.mp3`;
          link.click();
          URL.revokeObjectURL(url);
          link.remove();
          setDownloading(false);
        }}
        className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-sky-200/70 hover:bg-sky-200 active:bg-sky-300 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center shrink-0"
      >
        {downloading ? (
          <Loader2Icon
            className="text-sky-400 animate-spin"
            strokeWidth={2.5}
          />
        ) : (
          <DownloadIcon className="text-sky-600" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
};

export default PostPageAudioPrompt;
