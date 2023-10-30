"use client";

import Link from "next/link";
import cx from "classnames";
import type { HeroIcon } from "@/lib/types";

interface Props {
  href: string;
  selected: boolean;
  children: React.ReactNode;
  DefaultIcon: HeroIcon;
  SelectedIcon: HeroIcon;
}

const NavLink: React.FC<Props> = ({
  href,
  selected,
  children,
  DefaultIcon,
  SelectedIcon,
}) => {
  const Icon = selected ? SelectedIcon : DefaultIcon;
  return (
    <Link
      href={href}
      className={cx(
        `flex items-center gap-4 hover:bg-sky-200/70 active:bg-sky-300/50 dark:hover:bg-sky-500/5 dark:active:bg-sky-500/10 active:scale-[98%] transition-[background-color,transform] duration-200 px-6 py-4 rounded-3xl`,
        selected && `bg-sky-200/50 dark:bg-sky-500/10`,
      )}
    >
      <Icon className="w-6 text-sky-600 dark:text-sky-500" />
      <span
        className={cx(`text-xl font-medium text-sky-800 dark:text-slate-400`)}
      >
        {children}
      </span>
    </Link>
  );
};

export default NavLink;
