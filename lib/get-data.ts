import type {
  ApiMeetingAudio,
  ApiPost,
  ApiRSSFeed,
  ApiSeries,
  Language,
  MeetingAudio,
  Post,
  RSSFeed,
  Series,
} from "./types";
import { toMeetingAudio, toPost, toRSSFeed, toSeries } from "./data-conversion";

const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
const readKey = process.env.COSMIC_READ_KEY;

export async function getAllPosts(): Promise<Post[]> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets`;
  const query = encodeURIComponent(`{"type":"posts"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiPosts: Array<ApiPost> = objs.objects;
  return allApiPosts
    .map(toPost)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getPost(
  lang: Language,
  slug: string,
): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post[lang].slug === slug) ?? null;
}

export async function getAllSeries(): Promise<Series[]> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets`;
  const query = encodeURIComponent(`{"type":"series"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiSeries: Array<ApiSeries> = objs.objects;
  return allApiSeries.map(toSeries);
}

export async function getSeries(
  lang: Language,
  slug: string,
): Promise<Series | null> {
  const series = await getAllSeries();
  return series.find((s) => s[lang].slug === slug) ?? null;
}

export async function getAllMeetingAudios(): Promise<MeetingAudio[]> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets`;
  const query = encodeURIComponent(`{"type":"audio"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiAudios: Array<ApiMeetingAudio> = objs.objects;
  return allApiAudios
    .map(toMeetingAudio)
    .sort(
      (a, b) =>
        new Date(b.dateOfMeeting).getTime() -
        new Date(a.dateOfMeeting).getTime(),
    );
}

export async function getMeetingAudio(
  slug: string,
): Promise<MeetingAudio | null> {
  const audios = await getAllMeetingAudios();
  return audios.find((audio) => audio.slug === slug) ?? null;
}

export async function getRssFeed(slug: string): Promise<RSSFeed | null> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets`;
  const query = encodeURIComponent(`{"type":"rss-feeds"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiFeeds: Array<ApiRSSFeed> = objs.objects;
  return allApiFeeds.map(toRSSFeed).find((feed) => feed.slug === slug) ?? null;
}
