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
        `flex items-center gap-4 hover:bg-sky-200/70 active:bg-sky-300/50 active:scale-[98%] transition-[background-color,transform] duration-200 px-6 py-4 rounded-3xl`,
        selected && `bg-sky-200/50`,
      )}
    >
      <Icon className="w-6 text-sky-600" />
      <span className={cx(`text-xl font-medium text-sky-800`)}>{children}</span>
    </Link>
  );
};

export default NavLink;
