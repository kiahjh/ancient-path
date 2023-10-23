import React from "react";
import type { NextPage } from "next";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import { getAllSeries } from "@/lib/get-data";
import SeriesNav from "@/components/SeriesNav";

const TeachingsLayout: NextPage<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const series = await getAllSeries();
  return (
    <div
      className="flex min-h-full"
      style={{ background: `#e0f2fe url(${NoiseBg.src})` }}
    >
      <main className="flex-grow bg-sky-50 rounded-br-3xl h-[calc(100vh-96px)] overflow-scroll">
        {children}
      </main>
      <SeriesNav series={series} />
    </div>
  );
};

export default TeachingsLayout;
