import { FastForwardIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import type { State } from "@/lib/state/store";
import PlayButton from "./PlayButton";
import { useGlobalState } from "@/lib/hooks";
import styles from "@/styles/AudioPlayer.module.css";
import { formatTime } from "@/lib/dates";
import { saveAudiobookProgress } from "@/lib/audiobook-progress";

const AudioPlayer: React.FC = () => {
  const { dispatch, state } = useGlobalState();

  const audioRef = useRef<HTMLAudioElement>(null);
  const activeAudioRef = useRef(state.audio);
  const lastSavedAudiobookTime = useRef(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const source = audioSource(state);

  useEffect(() => {
    activeAudioRef.current = state.audio;
  }, [state.audio]);

  useEffect(() => {
    setAudio(audioRef.current);
  }, [audioRef, state.audio]);

  useEffect(() => {
    if (state.audio?.isPlaying) {
      void audio?.play();
    } else {
      audio?.pause();
    }
  }, [state.audio?.isPlaying, audio]);

  useEffect(() => {
    if (!audio) return;

    const handleTimeUpdate = (): void => {
      dispatch({
        type: `audioTimeUpdated`,
        time: audio.currentTime,
        from: {
          component: `AudioPlayer`,
          context: `timeupdate event`,
        },
      });

      const activeAudio = activeAudioRef.current;
      if (
        activeAudio?.type === `audiobook` &&
        Math.abs(audio.currentTime - lastSavedAudiobookTime.current) >= 5
      ) {
        saveAudiobookProgress(activeAudio.audiobook, audio.currentTime);
        lastSavedAudiobookTime.current = audio.currentTime;
      }
    };

    audio.addEventListener(`timeupdate`, handleTimeUpdate);
    return () => audio.removeEventListener(`timeupdate`, handleTimeUpdate);
  }, [audio, dispatch]);

  useEffect(() => {
    if (!audio || !activeAudioRef.current) return;

    const restoreCurrentTime = (): void => {
      const currentTime = activeAudioRef.current?.currentTime ?? 0;
      if (currentTime > 0) audio.currentTime = currentTime;
    };

    audio.addEventListener(`loadedmetadata`, restoreCurrentTime, {
      once: true,
    });

    if (
      audio.readyState >= HTMLMediaElement.HAVE_METADATA &&
      audio.currentSrc === source
    ) {
      audio.removeEventListener(`loadedmetadata`, restoreCurrentTime);
      restoreCurrentTime();
      return;
    }

    return () =>
      audio.removeEventListener(`loadedmetadata`, restoreCurrentTime);
  }, [audio, source]);

  return (
    <div
      className={cx(
        `h-24 flex flex-col sm:flex-row items-center sm:pr-8 relative z-50 transition-[margin-bottom] duration-500`,
        !state.audio ? `-mb-24` : `mb-0`,
      )}
    >
      {state.audio && (
        <>
          <div className="h-full sm:w-72 flex items-center justify-center gap-4 translate-y-3 sm:translate-y-0 z-10 sm:shrink-0">
            <button
              className={cx(
                `w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform,opacity] duration-200 active:bg-sky-300/70 active:scale-95`,
              )}
              onClick={() => {
                dispatch({
                  type: `skip15sBackClicked`,
                  from: {
                    component: `AudioPlayer`,
                    context: `skip backwards button onClick()`,
                  },
                });
                audio && (audio.currentTime -= 15);
              }}
            >
              <FastForwardIcon
                fill="#0ea5e9"
                className="w-7 sm:w-8 ml-0.5 text-sky-500 rotate-180"
              />
            </button>
            <PlayButton
              playing={state.audio.isPlaying}
              onClick={() => {
                dispatch({
                  type: `playButtonClicked`,
                  from: {
                    component: `AudioPlayer`,
                    context: `play button onClick()`,
                  },
                });
              }}
            />
            <button
              className={cx(
                `w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform,opacity] duration-200 active:bg-sky-300/70 active:scale-95`,
              )}
              onClick={() => {
                dispatch({
                  type: `skip15sClicked`,
                  from: {
                    component: `AudioPlayer`,
                    context: `skip forwards button onClick()`,
                  },
                });
                audio && (audio.currentTime += 15);
              }}
            >
              <FastForwardIcon
                fill="#0ea5e9"
                className="w-7 sm:w-8 ml-0.5 text-sky-500"
              />
            </button>
          </div>
          <div className="flex-grow h-full flex flex-col justify-center sm:py-4 self-stretch px-4 sm:px-0">
            <div
              className={cx(
                `transition-[height,opacity] duration-700 text-xl font-medium hover:underline hidden sm:block whitespace-nowrap overflow-hidden bg-gradient-to-r from-sky-900 to-transparent via-sky-900 bg-clip-text max-w-full relative h-7`,
                !state.audio?.isPlaying && `!opacity-50`,
              )}
            >
              <Link
                href={playingAudioDetails(state).href}
                className="absolute left-0 top-0 text-sky-900"
              >
                {playingAudioDetails(state).title}
                <span className="font-normal text-sky-900/50 capitalize">{` • ${playingAudioDetails(state).category}`}</span>
              </Link>
              <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-sky-100 pointer-events-none" />
            </div>
            <div
              className={cx(
                `relative flex-grow flex items-center gap-4 transition-opacity`,
              )}
            >
              <audio ref={audioRef} src={source} />
              <span className="text-sky-700">
                {formatTime(state.audio.currentTime ?? 0)}
              </span>
              <div className="flex-grow flex relative">
                <input
                  type="range"
                  className={cx(styles.progressBar, `w-full`)}
                  min={0}
                  max={audioDuration(audio, state)}
                  value={state.audio.currentTime ?? 0}
                  onChange={(event) => {
                    dispatch({
                      type: `audioTimeUpdated`,
                      time: Number(event.target.value),
                      from: {
                        component: `AudioPlayer`,
                        context: `progress bar onChange()`,
                      },
                    });
                    audio && (audio.currentTime = Number(event.target.value));
                  }}
                />
                <div
                  className="bg-sky-500 h-[6px] z-10 rounded-l-full pointer-events-none"
                  style={{
                    width: `${((state.audio.currentTime ?? 0) / (audioDuration(audio, state) || 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-slate-800/50">
                {formatTime(audioDuration(audio, state))}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;

type PlayingAudio = NonNullable<State[`audio`]>;

function audioSource(state: State): string | undefined {
  if (state.audio?.type === `post`) {
    return state.audio.post[state.language].mp3Url;
  }
  if (state.audio?.type === `meetingAudio`) {
    return state.audio.meetingAudio.mp3Url;
  }
  return state.audio?.audiobook.mp3Url;
}

function audioDuration(audio: HTMLAudioElement | null, state: State): number {
  if (audio?.duration && Number.isFinite(audio.duration)) return audio.duration;
  return state.audio?.type === `audiobook` ? state.audio.audiobook.duration : 0;
}

function playingAudioDetails(state: State): {
  title: string;
  category: string;
  href: string;
} {
  const audio = state.audio as PlayingAudio;

  if (audio.type === `audiobook`) {
    return {
      title: audio.audiobook.title,
      category: audio.audiobook.language === `en` ? `Audiobook` : `Audiolibro`,
      href: audio.audiobook.href,
    };
  }

  if (audio.type === `meetingAudio`) {
    return {
      title: audio.meetingAudio.title,
      category: state.language === `en` ? `Meeting` : `Reunión`,
      href:
        state.language === `en`
          ? `/meetings#${audio.meetingAudio.id}`
          : `/reuniones#${audio.meetingAudio.id}`,
    };
  }

  const post = audio.post[state.language];
  const basePath =
    audio.post.category === `post`
      ? state.language === `en`
        ? `/posts`
        : `/publicaciones`
      : state.language === `en`
        ? `/teachings`
        : `/ensenanzas`;

  return {
    title: post.title,
    category: audio.post.category,
    href: `${basePath}/${post.slug}`,
  };
}
