"use client";

import React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";
import cx from "classnames";

interface Props {
  playing: boolean;
  onClick: () => void;
  shrinkOnSmallScreens?: boolean;
}

const PlayButton: React.FC<Props> = ({
  playing,
  onClick,
  shrinkOnSmallScreens,
}) => (
  <button
    onClick={onClick}
    className={cx(
      `rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center shrink-0`,
      shrinkOnSmallScreens ? `w-10 xs:w-12 h-10 xs:h-12` : `w-12 h-12`,
    )}
  >
    {playing ? (
      <PauseIcon fill="white" className="w-6 text-white" />
    ) : (
      <PlayIcon fill="white" className="w-6 text-white" />
    )}
  </button>
);

export default PlayButton;
