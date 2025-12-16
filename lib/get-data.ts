import { cache } from "react";
import type {
  ApiMeetingAudio,
  ApiPost,
  ApiPostListItem,
  ApiSeries,
  Language,
  MeetingAudio,
  Post,
  PostListItem,
  Series,
} from "./types";
import * as convert from "./data-conversion";

const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
const readKey = process.env.COSMIC_READ_KEY;

export const getPostsForList = cache(async (): Promise<PostListItem[]> => {
  const query = encodeURIComponent(`{"type":"posts"}`);
  const props = `id,title,slug,published_at,override_published_at,created_at,metadata.spanish_title,metadata.spanish_slug,metadata.category,metadata.series`;
  const [objects, size] = await cosmicFetch<ApiPostListItem>(
    `?&query=${query}&props=${props}`,
  );
  log(`getPostsForList`, objects.length, size);
  return objects
    .map(convert.toPostListItem)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

export const getPostsForRSS = cache(async (): Promise<Post[]> => {
  const query = encodeURIComponent(`{"type":"posts"}`);
  const props = `id,title,slug,published_at,override_published_at,created_at,metadata.spanish_title,metadata.spanish_slug,metadata.category,metadata.series,metadata.mp3_url,metadata.audio_size,metadata.audio_duration,metadata.spanish_mp3_url,metadata.spanish_audio_size,metadata.spanish_audio_duration`;
  const [objects, size] = await cosmicFetch<ApiPost>(
    `?&query=${query}&props=${props}&depth=0`,
  );
  log(`getPostsForRSS`, objects.length, size);
  return objects
    .map(convert.toPost)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
});

export const getTeachingsForList = cache(async (): Promise<PostListItem[]> => {
  const query = encodeURIComponent(`{"type":"posts"}`);
  const props = `id,title,slug,published_at,override_published_at,created_at,metadata.spanish_title,metadata.spanish_slug,metadata.category,metadata.series`;
  const [objects, size] = await cosmicFetch<ApiPostListItem>(
    `?&query=${query}&props=${props}&depth=0`,
  );
  log(`getTeachingsForList`, objects.length, size);
  return objects
    .map(convert.toPostListItem)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

export const getPostsBySeriesId = cache(
  async (seriesId: string): Promise<PostListItem[]> => {
    const query = encodeURIComponent(
      `{"type":"posts","metadata.series":"${seriesId}"}`,
    );
    const props = `id,title,slug,published_at,override_published_at,created_at,metadata.spanish_title,metadata.spanish_slug,metadata.category,metadata.series`;
    const [objects, size] = await cosmicFetch<ApiPostListItem>(
      `?&query=${query}&props=${props}&depth=0`,
    );
    log(`getPostsBySeriesId`, objects.length, size, `series: ${seriesId}`);
    return objects.map(convert.toPostListItem);
  },
);

export const getPostBySlug = cache(
  async (lang: Language, slug: string): Promise<Post | null> => {
    const contentField = lang === `en` ? `content` : `metadata.spanish_content`;
    const fullProps = `id,title,slug,${contentField},metadata.spanish_title,metadata.spanish_slug,metadata.category,metadata.series,metadata.mp3_url,metadata.audio_size,metadata.audio_duration,metadata.spanish_mp3_url,metadata.spanish_audio_size,metadata.spanish_audio_duration`;

    if (lang === `en`) {
      // for English, we can query directly by slug
      const query = encodeURIComponent(`{"type":"posts","slug":"${slug}"}`);
      const [objects, size] = await cosmicFetch<ApiPost>(
        `?&query=${query}&props=${fullProps}&depth=0&limit=1`,
      );
      log(`getPostBySlug`, objects.length, size, `${lang}: ${slug}`);
      return objects[0] ? convert.toPost(objects[0]) : null;
    } else {
      // for Spanish: Two-step process
      // 1/2: Fetch minimal data (just IDs and Spanish slugs) to find the matching post
      const query = encodeURIComponent(`{"type":"posts"}`);
      const minimalProps = `id,metadata.spanish_slug`;
      const [minimal] = await cosmicFetch<{
        id: string;
        metadata: { spanish_slug: string };
      }>(`?&query=${query}&props=${minimalProps}`);
      const matched = minimal.find((p) => p.metadata.spanish_slug === slug);

      if (!matched) {
        log(`getPostBySlug`, 0, 0, `${lang}: ${slug}`);
        return null;
      }

      // 2/2: fetch the full post by ID
      const queryById = encodeURIComponent(
        `{"type":"posts","id":"${matched.id}"}`,
      );
      const [objects, size] = await cosmicFetch<ApiPost>(
        `?&query=${queryById}&props=${fullProps}&depth=0&limit=1`,
      );
      log(`getPostBySlug`, objects.length, size, `${lang}: ${slug}`);
      return objects[0] ? convert.toPost(objects[0]) : null;
    }
  },
);

export const getAllSeries = cache(async (): Promise<Series[]> => {
  const query = encodeURIComponent(`{"type":"series"}`);
  const props = `id,title,slug,metadata.spanish_title,metadata.spanish_slug`;
  const [objects, size] = await cosmicFetch<ApiSeries>(
    `?&query=${query}&props=${props}`,
  );
  log(`getAllSeries`, objects.length, size);
  return objects.map(convert.toSeries);
});

export const getSeriesBySlug = cache(
  async (lang: Language, slug: string): Promise<Series | null> => {
    const fullProps = `id,title,slug,metadata.spanish_title,metadata.spanish_slug,metadata.english_description,metadata.spanish_description`;

    if (lang === `en`) {
      // for English, we can query directly by slug
      const query = encodeURIComponent(`{"type":"series","slug":"${slug}"}`);
      const [objects, size] = await cosmicFetch<ApiSeries>(
        `?&query=${query}&props=${fullProps}&limit=1`,
      );
      log(`getSeriesBySlug`, objects.length, size, `${lang}: ${slug}`);
      return objects[0] ? convert.toSeries(objects[0]) : null;
    } else {
      // for Spanish: Two-step process
      const query = encodeURIComponent(`{"type":"series"}`);
      const minimalProps = `id,metadata.spanish_slug`;
      const [minimal] = await cosmicFetch<{
        id: string;
        metadata: { spanish_slug: string };
      }>(`?&query=${query}&props=${minimalProps}`);
      const matched = minimal.find((s) => s.metadata.spanish_slug === slug);

      if (!matched) {
        log(`getSeriesBySlug`, 0, 0, `${lang}: ${slug}`);
        return null;
      }

      // 2/2: Fetch the full series by ID
      const queryById = encodeURIComponent(
        `{"type":"series","id":"${matched.id}"}`,
      );
      const [objects, size] = await cosmicFetch<ApiSeries>(
        `?&query=${queryById}&props=${fullProps}&limit=1`,
      );
      log(`getSeriesBySlug`, objects.length, size, `${lang}: ${slug}`);
      return objects[0] ? convert.toSeries(objects[0]) : null;
    }
  },
);

export const getAllMeetingAudios = cache(async (): Promise<MeetingAudio[]> => {
  const query = encodeURIComponent(`{"type":"audio"}`);
  const props = `id,title,slug,metadata.mp3_url,metadata.language,metadata.date_of_meeting`;
  const [objects, size] = await cosmicFetch<ApiMeetingAudio>(
    `?&query=${query}&props=${props}`,
  );
  log(`getAllMeetingAudios`, objects.length, size);
  return objects
    .map(convert.toMeetingAudio)
    .sort(
      (a, b) =>
        new Date(b.dateOfMeeting).getTime() -
        new Date(a.dateOfMeeting).getTime(),
    );
});

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function log(fnName: string, count: number, size: number, extra?: string) {
  const paddedName = fnName.padEnd(20);
  const useColors = !process.env.VERCEL;
  const gray = useColors ? `\x1b[90m` : ``;
  const cyan = useColors ? `\x1b[36m` : ``;
  const reset = useColors ? `\x1b[0m` : ``;
  const prefix = `   ${gray}Cosmic fetch: ${cyan}${paddedName}${reset}`;
  const sizeStr = formatBytes(size).padStart(8);
  const countStr = count.toString().padStart(2, ` `);
  const message = extra
    ? `${prefix} ${sizeStr} - ${countStr} records - ${extra}`
    : `${prefix} ${sizeStr} - ${countStr} records`;
  console.log(message);
}

async function cosmicFetch<T>(path: string): Promise<[T[], number]> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets/${bucketSlug}`;
  const url = `${endpoint}/objects${path}&read_key=${readKey}`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const text = await response.text();
  const data = JSON.parse(text);
  return [data.objects, Buffer.byteLength(text, `utf8`)];
}
