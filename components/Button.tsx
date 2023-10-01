import React from 'react';
import cx from 'classnames';
import Link from 'next/link';

type Props = {
  color: 'primary' | 'secondary' | 'tertiary';
  size?: 'lg' | 'md' | 'sm';
  icon?: string;
  className?: string;
  children?: React.ReactNode;
  shadow?: boolean;
} & ({ type: 'button'; onClick(): void } | { type: 'link'; to: string });

const Button: React.FC<Props> = (props) => {
  const classes = cx(
    `font-medium tracking-wider flex items-center rounded-xl transition-colors duration-100 border justify-center`,
    props.shadow && `shadow-md`,
    {
      'bg-sky-500 text-white hover:bg-sky-600 border-sky-500 hover:border-sky-600 shadow-sky-600/40 active:bg-sky-700 active:border-sky-700':
        props.color === `primary`,
      'bg-sky-100 text-sky-600 hover:bg-sky-200 border-sky-100 hover:border-sky-200 shadow-sky-500/20 active:bg-sky-300 active:border-sky-300':
        props.color === `secondary`,
      'bg-transparent text-sky-500 border-sky-200 hover:border-sky-400 hover:text-sky-600 shadow-slate-300/30 active:bg-sky-500/10':
        props.color === `tertiary`,
    },
    props.size === `lg`
      ? `text-xl gap-3 px-6 py-3.5`
      : props.size === `sm`
      ? `text-base gap-2 px-3 py-1.5`
      : `text-lg gap-2.5 px-5 py-2`,
    props.className,
  );
  if (props.type === 'button') {
    return (
      <button onClick={props.onClick} className={cx(classes)}>
        <span>{props.children}</span>
        {props.icon && <i className={`fa-solid fa-${props.icon}`} />}
      </button>
    );
  }
  return (
    <Link href={props.to} className={cx(classes, props.className)}>
      <span>{props.children}</span>
      {props.icon && <i className={`fa-solid fa-${props.icon}`} />}
    </Link>
  );
};

export default Button;
