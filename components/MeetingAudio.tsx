"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import PlayButton from "./PlayButton";
import { Language, type MeetingAudio } from "@/lib/types";
import { useGlobalState } from "@/lib/hooks";
import { formatShort } from "@/lib/dates";

const MeetingAudio: React.FC<{ audio: MeetingAudio; language: Language }> = ({
  audio,
  language,
}) => {
  const { state, dispatch } = useGlobalState();

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(
      state.audio?.type === `meetingAudio` &&
        state.audio.meetingAudio.id === audio.id,
    );
  }, [state.audio]);

  return (
    <div
      className={cx(
        `transition-[height,background-color] duration-500 rounded-[40px] bg-sky-100 flex flex-col overflow-hidden h-20`,
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
          {formatShort(audio.dateOfMeeting, language)}
        </span>
      </div>
    </div>
  );
};

export default MeetingAudio;
