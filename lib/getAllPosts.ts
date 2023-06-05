import type { ApiPost, DualPost } from './types';
import { toDual } from './data';

const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
const readKey = process.env.COSMIC_READ_KEY;

export async function getAllPosts(): Promise<DualPost[]> {
  const endpoint = `http://api.cosmicjs.com/v3/buckets`;
  const query = encodeURIComponent(`{"type":"posts"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiPosts: Array<ApiPost> = objs.objects;
  return allApiPosts.map(toDual).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
