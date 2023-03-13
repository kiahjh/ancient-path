import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from '../styles/AudioPlayer.module.css';
import SoundAnimation from './SoundAnimation';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface Props {
  src: string;
  postTitle: string;
  className?: string;
}

const AudioPlayer: React.FC<Props> = ({ src, postTitle, className }) => {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioPlayer.current && progressBar.current) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = String(seconds);
    }
  }, [
    audioPlayer.current?.readyState,
    audioPlayer.current?.onloadeddata,
    audioPlayer.current?.onloadedmetadata,
  ]);

  function toggleIsPlaying(): void {
    const previousValue = isPlaying;
    setIsPlaying(!previousValue);
    if (!previousValue) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current!);
    }
  }

  function whilePlaying(): void {
    if (progressBar.current && audioPlayer.current) {
      progressBar.current.value = String(audioPlayer.current.currentTime);
      setCurrentTime(Number(progressBar.current?.value));
      animationRef.current = requestAnimationFrame(whilePlaying);
      if (audioPlayer.current.ended) {
        setIsPlaying(false);
      }
    }
  }

  return (
    <div
      className={cx(
        'rounded-xl border-[0.5px] dark:shadow-black/10 border-slate-200 dark:border-slate-700 shadow relative dark:bg-slate-700/10',
        className,
      )}
    >
      <audio src={src} ref={audioPlayer}>
        AudioPlayer
      </audio>
      <div className="flex justify-center items-center p-4 overflow-hidden relative border-b-[0.5px] border-slate-200 dark:border-slate-700">
        <SoundAnimation className="absolute bottom-0" animate={isPlaying} />
        <button
          className="flex items-center hover:bg-sky-400/10 transition duration-100 py-2 px-4 rounded-lg relative text-sky-500 hover:text-sky-600"
          onClick={() => {
            if (audioPlayer.current) {
              if (currentTime > 15) {
                setCurrentTime(currentTime - 15);
                audioPlayer.current.currentTime -= 15;
              } else {
                setCurrentTime(0);
                audioPlayer.current.currentTime = 0;
              }
            }
          }}
        >
          <i className="fa-solid fa-backward text-xl" />
        </button>
        <button
          onClick={toggleIsPlaying}
          className="w-16 h-16 rounded-full bg-sky-500 text-white flex justify-center items-center hover:bg-sky-600 transition duration-100 mx-4 relative active:scale-95"
        >
          <i className={`fa-solid fa-${isPlaying ? 'pause' : 'play'} text-2xl`} />
        </button>
        <button
          className="flex items-center hover:bg-sky-400/10 transition duration-100 py-2 px-4 rounded-lg relative text-sky-500 hover:text-sky-600"
          onClick={() => {
            if (audioPlayer.current) {
              if (currentTime < duration - 15) {
                setCurrentTime(currentTime + 15);
                audioPlayer.current.currentTime += 15;
              } else {
                setCurrentTime(duration);
                audioPlayer.current.currentTime = duration;
              }
            }
          }}
        >
          <i className="fa-solid fa-forward text-xl" />
        </button>
      </div>
      <div className="flex items-center bg-slate-50 dark:bg-slate-700/50 p-3 space-x-8 rounded-b-xl">
        <div className="shrink-0 flex justify-center items-center">
          <a
            download
            href={`/api/download?url=${src}&title=${encodeURIComponent(postTitle)}`}
            className="hover:bg-slate-200/50 dark:hover:bg-slate-700 w-8 h-8 flex justify-center items-center rounded-full text-slate-400 dark:text-slate-500 dark:hover:text-slate-400 cursor-pointer transition duration-100"
            onClick={() => setLoadingDownload(true)}
          >
            <i
              className={`fa-solid fa-${
                loadingDownload ? 'spinner animate-spin' : 'cloud-arrow-down'
              }`}
            />
          </a>
        </div>
        <div className="flex-grow flex items-center shrink-0 space-x-2">
          <span className="w-16 text-slate-400">{formatDuration(currentTime)}</span>
          <div className="relative flex-grow -mt-2">
            <input
              ref={progressBar}
              type="range"
              className={styles.progressBar}
              value={currentTime}
              onChange={() => {
                if (audioPlayer.current) {
                  audioPlayer.current.currentTime = Number(progressBar.current?.value);
                  setCurrentTime(Number(progressBar.current?.value));
                }
              }}
            />
            <div
              className="absolute h-[8.4px] left-0 top-0 rounded-l-full z-10 bg-sky-500"
              style={{
                width: `calc(${(100 * currentTime) / duration}% - ${
                  (20 * currentTime) / duration
                }px + 1px)`,
              }}
            />
          </div>
          <span className="w-16 text-slate-400 flex justify-end">
            {formatDuration(duration)}
          </span>
        </div>
        <div className="shrink-0 flex justify-center items-center">
          <button
            className="hover:bg-slate-200/50 dark:hover:bg-slate-700 w-8 h-8 flex justify-center items-center rounded-full text-slate-400 dark:text-slate-500 dark:hover:text-slate-400  transition duration-100"
            onClick={() => {
              if (audioPlayer.current) {
                const prevValue = muted;
                setMuted(!prevValue);
                audioPlayer.current.volume = prevValue ? 1 : 0;
              }
            }}
          >
            {muted ? (
              <SpeakerXMarkIcon className="w-5" />
            ) : (
              <SpeakerWaveIcon className="w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

function formatDuration(seconds: number): string {
  const hourPart = Math.floor(seconds / 3600);
  const minutePart = Math.floor((seconds - hourPart * 3600) / 60);
  const secondPart = seconds % 60;
  return `${hourPart ? `${hourPart}:` : ''}${addZero(minutePart)}:${addZero(secondPart)}`;
}

function addZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
