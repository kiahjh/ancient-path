import Link from 'next/link';
import React from 'react';

interface Props {
  to: string;
  selected?: boolean;
  isNew?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<Props> = ({ to, selected, isNew, children }) => {
  return (
    <Link
      href={to}
      className={`${
        selected
          ? 'text-slate-600 dark:text-slate-200'
          : 'text-slate-400 dark:text-slate-500'
      } hover:text-sky-400 dark:hover:text-sky-400 transition duration-100 select-none mx-3 my-1 flex items-center`}
    >
      {children}
      {isNew && (
        <span className="text-xs uppercase bg-sky-300 text-white rounded-full px-1 py-0.5 ml-1.5">
          new
        </span>
      )}
    </Link>
  );
};

export default NavLink;
