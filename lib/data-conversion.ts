import type {
  ApiMeetingAudio,
  ApiPost,
  ApiPostListItem,
  ApiSeries,
  MeetingAudio,
  Post,
  PostListItem,
  Series,
} from "./types";

export function toPostListItem(apiPost: ApiPostListItem): PostListItem {
  return {
    id: apiPost.id,
    publishedAt: apiPost.metadata.override_published_at || apiPost.published_at,
    createdAt: apiPost.created_at,
    category:
      apiPost.metadata.category?.key === `teaching` ? `teaching` : `post`,
    series: apiPost.metadata.series,
    en: {
      title: apiPost.title,
      slug: apiPost.slug,
    },
    es: {
      title: apiPost.metadata.spanish_title,
      slug: apiPost.metadata.spanish_slug,
    },
  };
}

export function toPost(apiPost: ApiPost): Post {
  return {
    id: apiPost.id,
    createdAt: apiPost.created_at,
    modifiedAt: apiPost.modified_at,
    publishedAt: apiPost.metadata.override_published_at || apiPost.published_at,
    series: apiPost.metadata.series,
    category:
      apiPost.metadata.category?.key === `teaching` ? `teaching` : `post`,
    en: {
      title: apiPost.title,
      slug: apiPost.slug,
      content: apiPost.content,
      mp3Url: apiPost.metadata.mp3_url,
      audioSize: apiPost.metadata.audio_size,
      audioDuration: apiPost.metadata.audio_duration,
    },
    es: {
      title: apiPost.metadata.spanish_title,
      slug: apiPost.metadata.spanish_slug,
      content: apiPost.metadata.spanish_content,
      mp3Url: apiPost.metadata.spanish_mp3_url,
      audioSize: apiPost.metadata.spanish_audio_size,
      audioDuration: apiPost.metadata.spanish_audio_duration,
    },
  };
}

export function toSeries(apiSeries: ApiSeries): Series {
  return {
    id: apiSeries.id,
    createdAt: apiSeries.created_at,
    modifiedAt: apiSeries.modified_at,
    publishedAt: apiSeries.published_at,
    en: {
      title: apiSeries.title,
      slug: apiSeries.slug,
      description: apiSeries.metadata.english_description,
    },
    es: {
      title: apiSeries.metadata.spanish_title,
      slug: apiSeries.metadata.spanish_slug,
      description: apiSeries.metadata.spanish_description,
    },
  };
}

export function toMeetingAudio(apiMeetingAudio: ApiMeetingAudio): MeetingAudio {
  return {
    id: apiMeetingAudio.id,
    title: apiMeetingAudio.title,
    slug: apiMeetingAudio.slug,
    mp3Url: apiMeetingAudio.metadata.mp3_url,
    language: apiMeetingAudio.metadata.language.key,
    dateOfMeeting: apiMeetingAudio.metadata.date_of_meeting,
  };
}
