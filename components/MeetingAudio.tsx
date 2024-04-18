"use client";

import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { SparklesIcon } from "lucide-react";
import PlayButton from "./PlayButton";
import { MeetingAudio } from "@/lib/types";
import { useGlobalState } from "@/lib/hooks";
import { relativeTime } from "@/lib/dates";

const MeetingAudio: React.FC<{ audio: MeetingAudio }> = ({ audio }) => {
  const { state, dispatch } = useGlobalState();

  const [selected, setSelected] = useState(false);
  const [highlightedSegments, setHighlightedSegments] = useState<
    HTMLSpanElement[]
  >([]);

  const transcriptionContainer = useRef<HTMLDivElement>(null);

  const highlightedSegmentOffset =
    highlightedSegments.reduce<null | HTMLSpanElement>((acc, seg) => {
      if (acc === null) return seg;
      if (Number(seg.id) < Number(acc.id)) return seg;
      return acc;
    }, null)?.offsetTop;

  useEffect(() => {
    setHighlightedSegments([
      ...document.querySelectorAll<HTMLSpanElement>(`.__highlighted-segment`),
    ]);
  }, [state.audio?.currentTime]);

  useEffect(() => {
    setSelected(
      state.audio?.type === `meetingAudio` &&
        state.audio.meetingAudio.id === audio.id,
    );
  }, [state.audio]);

  return (
    <div
      className={cx(
        `transition-[height,background-color] duration-500 rounded-[40px] bg-sky-100 flex flex-col overflow-hidden`,
        selected ? `h-112` : `h-20`,
      )}
      id={audio.id}
    >
      <div
        className={cx(
          `p-4 rounded-full flex items-center gap-8 justify-between`,
        )}
      >
        <div className="flex gap-4 items-center">
          <PlayButton
            playing={Boolean(selected && state.audio?.isPlaying)}
            onClick={() => {
              dispatch({
                type: `playButtonClicked`,
                audio: {
                  isPlaying: !(selected && state.audio?.isPlaying),
                  currentTime: 0,
                  type: `meetingAudio`,
                  meetingAudio: audio,
                },
                from: {
                  component: `MeetingAudio`,
                  context: `play button onClick()`,
                },
              });
            }}
          />
          <h2 className="text-xl font-semibold text-sky-900/90 leading-5">
            {audio.title}
          </h2>
        </div>
        <span className="mr-6 text-sky-800/50 font-medium leading-4">
          {relativeTime(audio.dateOfMeeting, `en`)}
        </span>
      </div>
      <div
        className="flex-grow relative overflow-hidden flex justify-center items-center"
        ref={transcriptionContainer}
      >
        {!audio.transcription && (
          <div className="flex flex-col items-center -mt-8">
            <div className="w-16 h-16 bg-sky-200 rounded-full flex justify-center items-center">
              <SparklesIcon size={35} className="text-sky-700" />
            </div>
            <div className="flex items-center mt-8 mb-4">
              {`Generating transcription...`.split(``).map((char, i) => (
                <span
                  className="text-3xl font-medium text-sky-800 animate-pulse mx-[1px]"
                  style={{
                    animation: `shimmer 2s ${
                      i * 100 - 4000
                    }ms ease-in-out infinite`,
                  }}
                >
                  {char.replace(` `, `\u00a0`)}
                </span>
              ))}
            </div>
            <p className="text-lg text-sky-900/70">
              Check back later and it should be ready for you.
            </p>
          </div>
        )}
        {selected && audio.transcription && (
          <p
            className="text-justify text-xl sm:text-2xl text-sky-900/50 absolute left-4 sm:left-8 w-[calc(100%-32px)] sm:w-[calc(100%-64px)] transition-[top] duration-1000"
            style={{
              top: `calc(50% - ${highlightedSegmentOffset}px - 1.5rem)`,
            }}
          >
            {audio.transcription.segments.map(
              (seg) =>
                state.audio && (
                  <span
                    className={cx(`transition-colors duration-500 relative`, {
                      "text-sky-950 __highlighted-segment":
                        seg.start < state.audio.currentTime &&
                        seg.end > state.audio.currentTime,
                    })}
                    key={seg.id}
                    id={String(seg.id)}
                  >
                    {seg.text}
                  </span>
                ),
            )}
          </p>
        )}
        <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-b from-sky-100 via-transparent to-sky-100 pointer-events-none" />
      </div>
    </div>
  );
};

export default MeetingAudio;
