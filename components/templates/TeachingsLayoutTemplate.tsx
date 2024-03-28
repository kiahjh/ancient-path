import React from "react";
import cx from "classnames";
import type { Language, Series } from "@/lib/types";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import SeriesNav from "@/components/SeriesNav";
import { useGlobalState } from "@/lib/hooks";

interface Props {
  children: React.ReactNode;
  series: Series[];
  language: Language;
}

const TeachingsLayoutTemplate: React.FC<Props> = ({
  children,
  language,
  series,
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
          `flex-grow bg-sky-50 xl:rounded-br-3xl overflow-scroll`,
          audio?.isPlaying ? `h-[calc(100vh-96px)]` : `h-[calc(100vh-96px)]`,
        )}
      >
        {children}
      </main>
      <SeriesNav series={series} language={language} />
    </div>
  );
};

export default TeachingsLayoutTemplate;
