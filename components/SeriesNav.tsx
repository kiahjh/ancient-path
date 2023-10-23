"use client";

import React from "react";
import Link from "next/link";
import cx from "classnames";
import { usePathname } from "next/navigation";
import type { Series } from "@/lib/types";

interface Props {
  series: Series[];
}

const SeriesNav: React.FC<Props> = ({ series }) => {
  const path = usePathname();
  return (
    <nav className="w-72 flex flex-col py-4 shrink-0">
      <h2 className="font-medium text-2xl text-slate-800 mx-8 mt-4 mb-2">
        Series
      </h2>
      <div className="flex flex-col">
        {series.map((s) => (
          <div className="pr-4 gap-2.5 flex items-center">
            <div
              className={cx(
                `bg-sky-500/50 w-1.5 h-5 rounded-r-full`,
                path.endsWith(s.en.slug) ? `opacity-100` : `opacity-0`,
              )}
            />
            <Link
              href={`/teachings/series/${s.en.slug}`}
              className={cx(
                `text-lg active:scale-[98%] transition-[background-color,transform] px-4 py-2 rounded-2xl text-sky-700 font-medium flex-grow`,
                path.endsWith(s.en.slug)
                  ? `bg-sky-200/50 hover:bg-sky-200/70 active:bg-sky-200`
                  : `hover:bg-sky-200/50 active:bg-sky-200`,
              )}
            >
              {s.en.title}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SeriesNav;
