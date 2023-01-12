import React from 'react';
import { Lang } from '../lib/types';

interface Props {
  title: string;
  trackId: number;
  lang: Lang;
}

const EmbeddedAudio: React.FC<Props> = ({ title, trackId, lang }) => {
  return (
    <iframe
      className="bg-gray-100 rounded-sm mb-10"
      title={title}
      width="100%"
      scrolling="no"
      frame-border="no"
      src={src(trackId, lang)}
    ></iframe>
  );
};

export default EmbeddedAudio;

function src(trackId: number, lang: Lang): string {
  const params: Record<string, string> = {
    url: `https://api.soundcloud.com/tracks/${trackId}`,
    auto_play: `false`,
    hide_related: `true`,
    show_comments: `false`,
    show_user: `false`,
    show_reposts: `false`,
    show_artwork: `false`,
    show_teaser: `false`,
    locale: lang,
  };

  const query = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join(`&`);

  return `https://w.soundcloud.com/player/?${query}`;
}
