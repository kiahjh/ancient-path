import React from "react";
import cx from "classnames";
import Link from "next/link";
import type { LucideIcon } from "@/lib/types";

type Props = {
  color: "primary" | "secondary" | "tertiary";
  size?: "lg" | "md" | "sm";
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  shadow?: boolean;
} & (
  | { type: "button"; onClick(): void }
  | { type: "link"; to: string }
  | { type: "submit" }
);

const Button: React.FC<Props> = (props) => {
  const classes = cx(
    `font-medium tracking-wider flex items-center transition-[background-color,color,transform,border-radius] duration-200 justify-center active:scale-95 active:rounded-[28px] select-none`,
    props.shadow && `shadow-md`,
    {
      "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-600/40 dark:shadow-500/50 active:bg-sky-700":
        props.color === `primary`,
      "bg-sky-100 dark:bg-sky-500/20 dark:hover:bg-sky-500/10 text-sky-600 dark:text-sky-300 hover:bg-sky-200 shadow-sky-500/20 dark:shadow-black/10 active:bg-sky-300":
        props.color === `secondary`,
      "bg-transparent text-sky-500 hover:text-sky-600 hover:bg-sky-500/10 shadow-slate-300/30 active:bg-sky-500/20":
        props.color === `tertiary`,
    },
    props.size === `lg`
      ? `text-xl gap-3 px-6 py-3.5 rounded-3xl`
      : props.size === `sm`
        ? `text-base gap-2 px-3 py-1.5 rounded-xl`
        : `text-lg gap-2.5 px-5 py-2 rounded-2xl`,
    props.className,
  );
  if (props.type === `button`) {
    return (
      <button onClick={props.onClick} className={cx(classes)}>
        <span>{props.children}</span>
        {props.icon && (
          <props.icon
            className={cx(
              props.size === `lg` ? `w-6` : props.size === `md` ? `w-5` : `w-4`,
            )}
          />
        )}
      </button>
    );
  }
  if (props.type === `submit`) {
    return (
      <button type="submit" className={cx(classes)}>
        <span>{props.children}</span>
        {props.icon && (
          <props.icon
            className={cx(
              props.size === `lg` ? `w-6` : props.size === `md` ? `w-5` : `w-4`,
            )}
          />
        )}
      </button>
    );
  }
  return (
    <Link href={props.to} className={cx(classes, props.className)}>
      <span>{props.children}</span>
      {props.icon && (
        <props.icon
          className={cx(
            props.size === `lg` ? `w-6` : props.size === `md` ? `w-5` : `w-4`,
          )}
        />
      )}
    </Link>
  );
};

export default Button;
