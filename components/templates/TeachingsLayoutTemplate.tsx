import React from "react";
import type { Language, Series } from "@/lib/types";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import SeriesNav from "@/components/SeriesNav";

interface Props {
  children: React.ReactNode;
  series: Series[];
  language: Language;
}

const TeachingsLayoutTemplate: React.FC<Props> = ({
  children,
  language,
  series,
}) => (
  <div
    className="flex min-h-full"
    style={{ background: `#e0f2fe url(${NoiseBg.src})` }}
  >
    <main className="flex-grow bg-sky-50 rounded-br-3xl h-[calc(100vh-96px)] overflow-scroll">
      {children}
    </main>
    <SeriesNav series={series} language={language} />
  </div>
);

export default TeachingsLayoutTemplate;
