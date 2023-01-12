import type { DualPost, ApiPost } from './types';

export function toDual(api: ApiPost): DualPost {
  return {
    en: {
      lang: `en`,
      id: `${api.id}-en`,
      slug: api.slug,
      title: api.title,
      content: api.content,
      soundcloudId: api.metadata.soundcloud_id,
      mp3Url: api.metadata.mp3_url,
      audioSize: api.metadata.audio_size,
      audioDuration: api.metadata.audio_duration,
      createdAt: new Date(api.created_at),
      modifiedAt: new Date(api.modified_at),
      publishedAt: new Date(api.published_at),
    },
    es: {
      lang: `es`,
      id: `${api.id}-es`,
      slug: api.metadata.spanish_slug,
      title: api.metadata.spanish_title,
      content: api.metadata.spanish_content,
      soundcloudId: api.metadata.spanish_soundcloud_id,
      mp3Url: api.metadata.spanish_mp3_url,
      audioSize: api.metadata.spanish_audio_size,
      audioDuration: api.metadata.spanish_audio_duration,
      createdAt: new Date(api.created_at),
      modifiedAt: new Date(api.modified_at),
      publishedAt: new Date(api.published_at),
    },
    createdAt: new Date(api.created_at),
    modifiedAt: new Date(api.modified_at),
    publishedAt: new Date(api.published_at),
  };
}
