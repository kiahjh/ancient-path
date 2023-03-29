export type ApiPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  modified_at: string;
  published_at: string;
  metadata: {
    description?: string;
    spanish_description?: string;
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
      | { key: 'teaching'; value: 'Teaching' }
      | { key: 'post'; value: 'Post' };
  };
};

export type Lang = 'en' | 'es';
export type Theme = 'light' | 'dark' | 'system';

export type Post<L extends Lang> = {
  id: string;
  slug: string;
  title: string;
  content: string;
  mp3Url: string;
  audioSize: number;
  audioDuration: number;
  lang: L;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  category: 'teaching' | 'post';
  description?: string;
};

export type DualPost = {
  en: Post<'en'>;
  es: Post<'es'>;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  category: 'teaching' | 'post';
};
