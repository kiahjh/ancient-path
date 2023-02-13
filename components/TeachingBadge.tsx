import React from 'react';
import cx from 'classnames';
import { Lang } from '../lib/types';

interface Props {
  language: Lang;
  onDark?: boolean;
}

const TeachingBadge: React.FC<Props> = ({ language, onDark = false }) => {
  return (
    <span
      className={cx(
        'py-0.5 px-4 text-sm border rounded-full font-medium',
        onDark
          ? 'border-sky-300 bg-sky-400/60 text-white'
          : 'border-sky-300 bg-sky-50 text-sky-500',
      )}
    >
      {language === 'en' ? 'teaching' : 'enseñanza'}
    </span>
  );
};

export default TeachingBadge;
