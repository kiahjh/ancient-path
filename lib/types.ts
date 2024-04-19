import type { ArrowRightIcon } from "lucide-react";

export type Language = "en" | "es";

export type LucideIcon = typeof ArrowRightIcon;

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

export interface ApiMeetingAudio {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  modified_at: string;
  published_at: string;
  metadata: {
    mp3_url: string;
    language: {
      key: Language;
      value: "English" | "Spanish";
    };
    transcription: Transcription | null;
    date_of_meeting: string;
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

export interface MeetingAudio {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  mp3Url: string;
  language: Language;
  transcription: Transcription | null;
  dateOfMeeting: string;
}

export interface Transcription {
  task: "transcribe";
  language: "english" | "spanish";
  duration: number;
  text: string;
  words: Array<{
    word: string;
    start: number;
    end: number;
  }>;
  segments: Array<{
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
  }>;
}
