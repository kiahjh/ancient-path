"use client";

import React from "react";
import cx from "classnames";
import type { Language, Series, PostListItem } from "@/lib/types";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import SeriesNav from "@/components/SeriesNav";
import { useGlobalState } from "@/lib/hooks";

interface Props {
  children: React.ReactNode;
  series: Series[];
  allTeachings: PostListItem[];
  language: Language;
}

const TeachingsLayoutTemplate: React.FC<Props> = ({
  children,
  language,
  series,
  allTeachings,
}) => {
  const {
    state: { audio },
  } = useGlobalState();

  return (
    <div
      className="flex min-h-full"
      style={{ background: `#e0f2fe url(${NoiseBg.src})` }}
    >
      <main
        className={cx(
          `flex-grow bg-sky-50 overflow-scroll transition-[height,border-radius] duration-500`,
          audio ? `h-[calc(100dvh-96px)] xl:rounded-br-3xl` : `h-dvh`,
        )}
      >
        {children}
      </main>
      <SeriesNav
        allTeachings={allTeachings}
        series={series}
        language={language}
      />
    </div>
  );
};

export default TeachingsLayoutTemplate;
