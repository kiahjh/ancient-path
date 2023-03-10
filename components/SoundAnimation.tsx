import React, { useEffect, useState } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  animate: boolean;
}

const SoundAnimation: React.FC<Props> = ({ className, animate }) => {
  const [heights, setHeights] = useState(new Array(70).fill(0));
  let fpsInterval = 0,
    then = 0,
    now = 0,
    elapsed = 0;

  useEffect(() => {
    startAnimating();
  }, []);

  const draw: FrameRequestCallback = (t: number) => {
    requestAnimationFrame(draw);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      setHeights((heights) =>
        heights.map((_, index) => Math.sin(t / 400 - index / 2) * 10 + 28),
      );
    }
  };

  function startAnimating(): void {
    fpsInterval = 1000 / 20;
    then = Date.now();
    requestAnimationFrame(draw);
  }

  return (
    <div className={cx('h-12 flex space-x-1 items-end', className)}>
      {heights.map((height, index) => (
        <div
          className="w-1.5 h-8 bg-sky-400/20 rounded-t-full [transition:100ms]"
          key={index}
          style={{ height: animate ? height : 0 }}
        />
      ))}
    </div>
  );
};

export default SoundAnimation;
