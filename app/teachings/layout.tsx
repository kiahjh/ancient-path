import React from "react";
import Link from "next/link";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import { getAllSeries } from "@/lib/get-data";

const TeachingsLayout: React.FC<{ children: React.ReactNode }> = async ({
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
      <nav className="w-72 flex flex-col p-4 shrink-0">
        <h2 className="font-medium text-2xl text-slate-800 mx-4 mt-4 mb-2">
          Series
        </h2>
        <div className="flex flex-col">
          {series.map((s) => (
            <Link
              href={`/teachings/series/${s.en.slug}`}
              className="text-lg hover:bg-sky-200/50 active:bg-sky-200 active:scale-[98%] transition-[background-color,transform] px-4 py-2 rounded-2xl text-sky-700 font-medium"
            >
              {s.en.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default TeachingsLayout;
