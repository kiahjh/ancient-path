import type { ArrowRightIcon } from "@heroicons/react/24/solid";

export type Language = "en" | "es";

export type HeroIcon = typeof ArrowRightIcon;

export interface ApiPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  modified_at: string;
  published_at: string;
  metadata: {
    description: string;
    spanish_description: string;
    mp3_url: string;
    audio_size: number;
    audio_duration: number;
    spanish_title: string;
    spanish_slug: string;
    spanish_content: string;
    spanish_mp3_url: string;
    spanish_audio_size: number;
    spanish_audio_duration: number;
    category:
      | undefined
      | { key: "teaching"; value: "Teaching" }
      | { key: "post"; value: "Post" };
    series: string | null;
  };
}

export interface ApiSeries {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  modified_at: string;
  published_at: string;
  metadata: {
    spanish_title: string;
    spanish_slug: string;
    english_description: string;
    spanish_description: string;
  };
}

export interface Post {
  id: string;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  series: string | null;
  category: "teaching" | "post";
  en: {
    title: string;
    slug: string;
    content: string;
    description: string;
    mp3Url: string;
    audioSize: number;
    audioDuration: number;
  };
  es: {
    title: string;
    slug: string;
    content: string;
    description: string;
    mp3Url: string;
    audioSize: number;
    audioDuration: number;
  };
}

export interface Series {
  id: string;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  en: {
    title: string;
    slug: string;
    description: string;
  };
  es: {
    title: string;
    slug: string;
    description: string;
  };
}
