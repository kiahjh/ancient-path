import React from "react";
import { PodcastIcon, RssIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import type { Language } from "@/lib/types";

import Spotify from "../../public/apps/spotify.png";
import ApplePodcasts from "../../public/apps/apple-podcasts.png";
import GooglePodcasts from "../../public/apps/google-podcasts.png";
import Overcast from "../../public/apps/overcast.jpg";

const PodcastPageTemplate: React.FC<{ language: Language }> = ({
  language,
}) => {
  const c = content[language];
  return (
    <div className="py-20 px-8 xs:px-12 sm:px-20 flex flex-col items-center justify-center min-h-full">
      <div className="w-16 md:w-20 h-16 md:h-20 bg-sky-200 rounded-full items-center justify-center flex text-sky-600">
        <PodcastIcon size={36} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mt-6 text-center">
        {c.title}
      </h1>
      <p className="mt-4 text-xl text-sky-900/60 max-w-2xl text-center">
        {c.description}
      </p>
      <div className="flex mt-12 gap-8 flex-wrap justify-center">
        <AppOption
          name={c.spotify.title}
          image={Spotify}
          href={c.spotify.link}
        />
        <AppOption
          name={c.applePodcasts.title}
          image={ApplePodcasts}
          href={c.applePodcasts.link}
        />
        <AppOption
          name={c.googlePodcasts.title}
          image={GooglePodcasts}
          href={c.googlePodcasts.link}
        />
        <AppOption
          name={c.overcast.title}
          image={Overcast}
          href={c.overcast.link}
        />
      </div>
      <Link
        href={c.rssFeed.link}
        className="mt-8 text-sky-600 hover:text-sky-800 flex items-center font-medium gap-2"
      >
        <RssIcon size={20} strokeWidth={3} />
        <span>{c.rssFeed.title}</span>
      </Link>
    </div>
  );
};

export default PodcastPageTemplate;

interface AppOptionProps {
  name: string;
  image: StaticImageData;
  href: string;
}

const AppOption: React.FC<AppOptionProps> = ({ name, image, href }) => (
  <Link
    href={href}
    className="flex flex-col items-center bg-sky-100 p-8 rounded-3xl w-52 hover:bg-sky-200/70 transition-colors duration-200"
  >
    <Image
      src={image}
      alt={name}
      className="w-24 h-24 rounded-3xl text-center shadow-md shadow-sky-800/10"
    />
    <span className="text-lg font-medium text-sky-950/80 mt-4">{name}</span>
  </Link>
);

const content = {
  en: {
    title: `Listen as a podcast`,
    description: `To subscribe to a podcast of the audio versions of posts from this blog, click one of the links below:`,
    spotify: {
      title: `Spotify`,
      link: `https://open.spotify.com/show/3JDQmzp0D4FNXeE7NC5D5S`,
    },
    applePodcasts: {
      title: `Apple Podcasts`,
      link: `https://podcasts.apple.com/us/podcast/the-ancient-path/id1645365966`,
    },
    googlePodcasts: {
      title: `Google Podcasts`,
      link: `https://podcasts.google.com/feed/aHR0cHM6Ly9oZW5kZXIuYmxvZy9wb2RjYXN0LmVuLnJzcw`,
    },
    overcast: {
      title: `Overcast`,
      link: `https://overcast.fm/itunes1645365966`,
    },
    rssFeed: {
      title: `RSS Feed`,
      link: `/podcast.en.rss`,
    },
  },
  es: {
    title: `Escucha como podcast`,
    description: `Para suscribirte a un podcast de los audios de las publicaciones de este blog, haz clic en uno de los enlaces siguientes:`,
    spotify: {
      title: `Spotify`,
      link: `https://open.spotify.com/show/3T32aJ757tMg2kyzG2kANh`,
    },
    applePodcasts: {
      title: `Apple Podcasts`,
      link: `https://podcasts.apple.com/us/podcast/la-senda-antigua/id1645366119`,
    },
    googlePodcasts: {
      title: `Google Podcasts`,
      link: `https://podcasts.google.com/feed/aHR0cHM6Ly9oZW5kZXIuYmxvZy9wb2RjYXN0LmVuLnJzcw`,
    },
    overcast: {
      title: `Overcast`,
      link: `https://overcast.fm/itunes1645366119`,
    },
    rssFeed: {
      title: `RSS Feed`,
      link: `/podcast.es.rss`,
    },
  },
};
