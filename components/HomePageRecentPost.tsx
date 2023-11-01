"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import type { Language, Post } from "@/lib/types";
import BlobNoise from "@/public/blob-noise.svg";
import { relativeTime } from "@/lib/dates";

interface Props {
  post: Post;
  language: Language;
}

const HomePageRecentPost: React.FC<Props> = ({ post, language }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });
  const [showBg, setShowBg] = useState(false);
  let fpsInterval = 0,
    then = 0,
    now = 0,
    elapsed = 0;

  useEffect(() => {
    startAnimating();
    setShowBg(true);
  }, []); // eslint-disable-line

  const draw: FrameRequestCallback = (t: number) => {
    requestAnimationFrame(draw);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      setPosition({
        x: position.x + Math.sin(t / 2000) * 100,
        y: position.y + Math.cos(t / 2000) * 100,
      });
    }
  };

  function startAnimating(): void {
    fpsInterval = 1000 / 20;
    then = Date.now();
    requestAnimationFrame(draw);
  }

  return (
    <div className="w-96 p-8 rounded-3xl relative overflow-hidden bg-white">
      <div
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(0,3,255,0.77), rgba(187,109,109,0)), url(${BlobNoise.src})`,
        }}
        className={cx(
          `absolute left-0 top-0 w-full h-full [filter:contrast(150%)_brightness(700%)] !bg-cover transition-opacity duration-1000 delay-100`,
          showBg ? `opacity-10` : `opacity-0`,
        )}
      />
      <div className="relative">
        <h4 className="text-sky-500/70">
          {relativeTime(post.createdAt, `en`)}
        </h4>
        <h3 className="text-xl font-bold text-slate-800">
          {post[language].title}
        </h3>
        <p className="text-slate-500 mt-2">
          {post[language].description.slice(0, 180).trim() + `...`}
        </p>
      </div>
    </div>
  );
};

export default HomePageRecentPost;
