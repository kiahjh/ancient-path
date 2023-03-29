import type { DualPost, ApiPost } from './types';

export function toDual(api: ApiPost): DualPost {
  const category =
    !api.metadata.category || api.metadata.category.key === `post` ? `post` : `teaching`;
  return {
    en: {
      lang: `en`,
      id: `${api.id}-en`,
      slug: api.slug,
      title: api.title,
      content: api.content,
      mp3Url: api.metadata.mp3_url,
      audioSize: api.metadata.audio_size,
      audioDuration: api.metadata.audio_duration,
      createdAt: api.created_at,
      modifiedAt: api.modified_at,
      publishedAt: api.published_at,
      category,
      description: api.metadata.description,
    },
    es: {
      lang: `es`,
      id: `${api.id}-es`,
      slug: api.metadata.spanish_slug,
      title: api.metadata.spanish_title,
      content: api.metadata.spanish_content,
      mp3Url: api.metadata.spanish_mp3_url,
      audioSize: api.metadata.spanish_audio_size,
      audioDuration: api.metadata.spanish_audio_duration,
      createdAt: api.created_at,
      modifiedAt: api.modified_at,
      publishedAt: api.published_at,
      category,
      description: api.metadata.spanish_description,
    },
    createdAt: api.created_at,
    modifiedAt: api.modified_at,
    publishedAt: api.published_at,
    category,
  };
}
