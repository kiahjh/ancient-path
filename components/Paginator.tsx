import React from "react";
import Link from "next/link";
import cx from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Language } from "@/lib/types";

interface Props {
  numPages: number;
  currentPage: number;
  basePath: string;
  language: Language;
}

const Paginator: React.FC<Props> = ({
  numPages,
  currentPage,
  basePath,
  language,
}) => (
  <div className="flex items-center">
    <div className="flex items-center gap-4">
      {currentPage > 1 && (
        <Link
          href={`${basePath}/${currentPage - 1}`}
          className="flex items-center gap-1 text-sky-500 px-3 py-1 rounded-full hover:bg-sky-100 active:bg-sky-200 transition-[background-color] duration-200 sm:mr-6"
        >
          <ArrowLeftIcon size={20} />
          <span className="hidden xs:block">
            {language === `en` ? `Previous` : `Anterior`}
          </span>
        </Link>
      )}
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
      {currentPage < numPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="flex items-center gap-1 text-sky-500 px-3 py-1 rounded-full hover:bg-sky-100 active:bg-sky-200 transition-[background-color] duration-200 sm:ml-6"
        >
          <span className="hidden xs:block">
            {language === `en` ? `Next` : `Siguiente`}
          </span>
          <ArrowRightIcon size={20} />
        </Link>
      )}
    </div>
  </div>
);

export default Paginator;
