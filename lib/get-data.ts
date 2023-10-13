import type { ApiPost, ApiSeries, Post, Series } from "./types";
import { toPost, toSeries } from "./data-conversion";

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

export async function getAllSeries(): Promise<Series[]> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets`;
  const query = encodeURIComponent(`{"type":"series"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiSeries: Array<ApiSeries> = objs.objects;
  return allApiSeries.map(toSeries);
}
