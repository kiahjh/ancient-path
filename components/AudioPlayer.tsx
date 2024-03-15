"use client";

import React, { useEffect, useRef } from "react";
import cx from "classnames";
import styles from "@/styles/AudioPlayer.module.css";
import { useGlobalState } from "@/lib/hooks";
import { formatTime } from "@/lib/dates";

const AudioPlayer: React.FC<{ className?: string }> = ({ className }) => {
  const {
    state: { audio },
    dispatch,
  } = useGlobalState();

  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (audioRef.current) {
      dispatch({
        type: `setAudioDuration`,
        duration: audioRef.current.duration,
      });
    }
  }, [dispatch, audioRef.current?.duration]);

  useEffect(() => {
    if (audioRef.current) {
      if (audio.isPlaying) {
        audioRef.current?.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioRef.current?.pause();
        cancelAnimationFrame(animationRef.current ?? 0);
      }
    }
    function whilePlaying(): void {
      if (audioRef.current) {
        dispatch({
          type: `setCurrentTime`,
          time: audioRef.current.currentTime,
        });
        if (audioRef.current.ended && audio.isPlaying) {
          dispatch({ type: `toggleAudioPlaying` });
        }
      }
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }, [
    audio.isPlaying,
    audio.currentTime,
    dispatch,
    audioRef.current?.currentTime,
  ]);

  return (
    <div
      className={cx(
        `relative flex-grow flex items-center gap-4 transition-opacity`,
        className,
      )}
    >
      {audio.source && <audio ref={audioRef} src={audio.source} />}
      <span className="text-sky-700">{formatTime(audio.currentTime)}</span>
      <div className="flex-grow flex relative">
        <input
          type="range"
          className={cx(styles.progressBar, `w-full`)}
          min={0}
          max={String(audio.duration)}
          value={audio.currentTime}
          onChange={(event) => {
            dispatch({
              type: `setCurrentTime`,
              time: Number(event.target.value),
            });
            if (audioRef.current) {
              audioRef.current.currentTime = Number(event.target.value);
            }
          }}
        />
        <div
          className="bg-sky-500 h-[6px] z-10 rounded-l-full pointer-events-none"
          style={{
            width: `calc(${(audio.currentTime * 100) / audio.duration}%)`,
          }}
        />
      </div>
      <span className="text-slate-800/50">{formatTime(audio.duration)}</span>
    </div>
  );
};

export default AudioPlayer;
