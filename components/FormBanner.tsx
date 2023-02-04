import React from 'react';
import cx from 'classnames';

interface Props {
  message: string;
  type: 'missing_field' | 'api_error' | 'success' | 'idle';
  className?: string;
}

const FormBanner: React.FC<Props> = ({ message, type, className }) => {
  let colors = 'h-0 opacity-0 scale-75';
  let icon = '';

  switch (type) {
    case 'api_error':
      colors = 'bg-red-200/50 text-red-600';
      icon = 'exclamation-triangle';
      break;
    case 'missing_field':
      colors = 'bg-yellow-200/50 text-yellow-600';
      icon = 'exclamation';
      break;
    case 'success':
      colors = 'bg-green-200/50 text-green-600';
      icon = 'check';
      break;
  }

  return (
    <div
      className={cx(
        'rounded-xl p-4 flex items-center [transition:100ms]',
        colors,
        className,
      )}
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-white/30 flex justify-center items-center">
        <i className={`fa-solid text-xl fa-${icon}`} />
      </div>
      <p className="ml-4 font-medium">{message}</p>
    </div>
  );
};

export default FormBanner;
