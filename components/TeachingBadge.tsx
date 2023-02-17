import React from 'react';
import cx from 'classnames';
import { Lang } from '../lib/types';

interface Props {
  language: Lang;
  onDark?: boolean;
  className?: string;
}

const TeachingBadge: React.FC<Props> = ({ language, onDark = false, className }) => {
  return (
    <span
      className={cx(
        'py-0.5 px-4 text-sm border rounded-full font-medium',
        onDark
          ? 'border-sky-300 bg-sky-400/60 dark:bg-sky-800/50 text-white dark:text-sky-200'
          : 'border-sky-300 dark:border-sky-500/50 bg-sky-50 dark:bg-sky-500/10 text-sky-500 dark:text-sky-400',
        className,
      )}
    >
      {language === 'en' ? 'teaching' : 'enseñanza'}
    </span>
  );
};

export default TeachingBadge;
