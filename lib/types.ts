export type ApiPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  modified_at: string;
  published_at: string;
  metadata: {
    soundcloud_id: number;
    mp3_url: string;
    audio_size: number;
    audio_duration: number;
    spanish_title: string;
    spanish_slug: string;
    spanish_content: string;
    spanish_soundcloud_id: number;
    spanish_mp3_url: string;
    spanish_audio_size: number;
    spanish_audio_duration: number;
    category: undefined | { key: 'teaching'; value: 'Teaching' };
  };
};

export type Lang = 'en' | 'es';

export type Post<L extends Lang> = {
  id: string;
  slug: string;
  title: string;
  content: string;
  soundcloudId: number;
  mp3Url: string;
  audioSize: number;
  audioDuration: number;
  lang: L;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
};

export type DualPost = {
  en: Post<'en'>;
  es: Post<'es'>;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  category: 'teaching' | 'post';
};
