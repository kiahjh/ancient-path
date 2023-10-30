import React from "react";
import Link from "next/link";
import cx from "classnames";

interface Props {
  numPages: number;
  currentPage: number;
  basePath: string;
}

const Paginator: React.FC<Props> = ({ numPages, currentPage, basePath }) => (
  <div className="flex items-center">
    <div className="flex items-center gap-4">
      {new Array(numPages).fill(0).map((_, i) => (
        <Link
          href={`${basePath}/${i + 1}`}
          className={cx(
            `rounded-full w-8 h-8 flex justify-center items-center font-medium text-lg active:scale-90 transition-[background-color,transform] duration-200`,
            currentPage === i + 1
              ? `bg-sky-200 text-sky-800 hover:bg-sky-300 active:bg-sky-400`
              : `bg-white text-sky-500 hover:bg-sky-100 active:bg-sky-200`,
          )}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  </div>
);

export default Paginator;
